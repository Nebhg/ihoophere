"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!postcode) return;

    // Use the Google Maps Geocoding API to get the coordinates from the postcode
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      setLocation({ lat, lng });
      setError(''); // Clear any previous errors
    } else {
      setError('Location not found');
      setLocation(null); // Reset location if not found
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Add text-black here
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      {location ? ( // Only render the map if a location is found
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={location}
            zoom={10}
          >
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p className="text-gray-800">Please enter a postcode to see the location on the map.</p>
      )}
    </div>
  );
};

export default MapComponent;