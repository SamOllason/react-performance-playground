import React, { useState } from 'react';
import { generateDog, Dog } from '../data/dogData';
import { DogTableOptimized } from '../components/DogTableOptimized';
import { InfoPanel } from '../components/InfoPanel';
import { ConsolePanel } from '../components/ConsolePanel';

export const OptimizedPage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([generateDog(), generateDog(), generateDog()]);

  const addDog = () => {
    setDogs([...dogs, generateDog()]);
  };

  const removeDog = (id: number) => {
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#27ae60' }}>✨ Optimized Component (React.memo + useMemo + useCallback)</h1>
      <div style={{
        backgroundColor: '#d1ecf1',
        border: '1px solid #17a2b8',
        borderRadius: '4px',
        padding: '12px 16px',
        marginBottom: '16px',
        fontSize: '14px',
        color: '#0c5460'
      }}>
        📚 <strong>React 18 Manual Optimization:</strong> This uses React.memo, useMemo, and useCallback. React 19's compiler handles much of this automatically!
      </div>
      
      <InfoPanel 
        type="success"
        title="✅ Try Sorting to See the Magic!"
        description="Click the Name/Breed/Behavior sort buttons and watch the console. The rows DON'T re-render because their data hasn't changed! Adding dogs still causes re-renders (the array changes), but sorting is now free. Compare to the Unoptimized page where sorting re-renders everything."
      />

      <ConsolePanel />

      <InfoPanel 
        type="info"
        title="🚀 Optimizations Applied"
        description="1️⃣ React.memo: Wraps DogRow to skip re-renders when the dog object hasn't changed (helps with sorting!) 2️⃣ useMemo: Memoizes the sorted dogs array - sorting calculation only runs when dogs or sortKey changes 3️⃣ useCallback: Stabilizes function references to work with React.memo. Now try sorting - rows won't re-render!"
      />

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={addDog}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          🐶 Add Random Dog
        </button>
        <span style={{ color: '#666' }}>Total Dogs: {dogs.length}</span>
      </div>

      <DogTableOptimized dogs={dogs} onRemove={removeDog} />
    </div>
  );
};
