import MapComponent from './MapComponent';
import TaskManager from './TaskManager';
import { Protect } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <>
    
    <Protect>
        <div className="rounded-lg shadow-lg backdrop-blur-sm">
          
          <TaskManager />
        </div>
    </Protect>
    </>
  );
}