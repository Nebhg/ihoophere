import MapComponent from './MapComponent';
import TaskManager from './TaskManager';
import { Protect } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <>
    
    <Protect>
        <div className="p-8 rounded-lg shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter your postcode</h2>
          <MapComponent />
          <TaskManager />
        </div>
    </Protect>
    </>
  );
}