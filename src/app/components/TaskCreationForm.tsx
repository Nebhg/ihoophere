import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface TaskCreationFormProps {
  onSubmit: (task: any) => void;
  onClose: () => void;
}

export default function TaskCreationForm({ onSubmit, onClose }: TaskCreationFormProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [spacesLeft, setSpacesLeft] = useState(0);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      name,
      location,
      time,
      price,
      spaces_left: spacesLeft,
      description,
      public: isPublic,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder="Enter task name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="datetime-local"
            name="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="number"
            name="spacesLeft"
            placeholder="Enter spaces left"
            onChange={(e) => setSpacesLeft(Number(e.target.value))}
            value={spacesLeft}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <textarea
            name="description"
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="isPublic"
              onChange={(e) => setIsPublic(e.target.checked)}
              checked={isPublic}
              className="mr-2"
            />
            Public
          </label>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="link" className="text-blue-600" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}