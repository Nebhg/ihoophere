"use client"; // Add this line to mark the component as a Client Component

import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const MapComponent = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setError('');
      }
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <div className="flex mb-4">
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter location"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </Autocomplete>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {location && (
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={location}
            zoom={14}
          >
            <Marker position={location} />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default MapComponent;