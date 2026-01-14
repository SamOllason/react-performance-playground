import React, { useState, useRef, useEffect } from 'react';
import { generateDog, Dog } from '../data/dogData';
import { DogTableOptimized } from '../components/DogTableOptimized';
import { InfoPanel } from '../components/InfoPanel';
import { ConsolePanel } from '../components/ConsolePanel';

export const OptimizedPage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([generateDog(), generateDog(), generateDog()]);
  const renderCount = useRef(0);
  const [, forceUpdate] = useState({});

  // Increment render count without causing re-render
  useEffect(() => {
    renderCount.current += 1;
  });

  const addDog = () => {
    setDogs([...dogs, generateDog()]);
  };

  const removeDog = (id: number) => {
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#27ae60' }}>✨ Optimized Component (React.memo + useMemo + useCallback)</h1>
      
      <InfoPanel 
        type="success"
        title="✅ Much Better Performance!"
        description="Check the console below! Now only the components that actually changed will re-render. When you add a dog, only the NEW row renders. When you sort, existing rows don't re-render at all! Compare this to the unoptimized page."
      />

      <ConsolePanel />

      <InfoPanel 
        type="info"
        title="🚀 Optimizations Applied"
        description={`1️⃣ React.memo: Wraps DogRow to prevent re-renders when props haven't changed
        2️⃣ useMemo: Memoizes the sorted dogs array so sorting only happens when needed
        3️⃣ useCallback: Memoizes callback functions to keep references stable
        
        Page has rendered ${renderCount.current} times, but individual rows render far less!`}
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
