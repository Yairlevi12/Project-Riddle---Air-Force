import React from 'react';
import NearestPlaneFinder from './components/NearestPlaneFinder';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Real-Time Nearest Plane Tracker</h1>
      <NearestPlaneFinder />
    </div>
  );
}

export default App;
