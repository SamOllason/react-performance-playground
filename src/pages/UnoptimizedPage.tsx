import React, { useState, useRef, useEffect } from 'react';
import { generateDog, Dog } from '../data/dogData';
import { DogTableUnoptimized } from '../components/DogTableUnoptimized';
import { InfoPanel } from '../components/InfoPanel';
import { ConsolePanel } from '../components/ConsolePanel';

export const UnoptimizedPage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([generateDog(), generateDog(), generateDog()]);

  const addDog = () => {
    setDogs([...dogs, generateDog()]);
  };

  const removeDog = (id: number) => {
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#e74c3c' }}>🐕 Unoptimized Component (No Performance Optimization)</h1>
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        padding: '12px 16px',
        marginBottom: '16px',
        fontSize: '14px',
        color: '#856404'
      }}>
        📚 <strong>React 18 Learning Project:</strong> This demonstrates manual optimization techniques. React 19's compiler can automate many of these patterns!
      </div>
      
      <InfoPanel 
        type="warning"
        title="⚠️ Watch the Console Below!"
        description="The simulated DevTools console below shows what's happening behind the scenes. Notice that EVERY row re-renders when you add or remove a dog, even the ones that didn't change. This is inefficient! (Also check your real browser console with F12 for the actual logs)"
      />

      <ConsolePanel />

      <InfoPanel 
        type="info"
        title="📊 What's Happening Here?"
        description="This page has NO performance optimizations. Every time state changes (adding/removing dogs, sorting), ALL components re-render. The sorting calculation runs on every render, and each row component re-renders even if its data hasn't changed."
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

      <DogTableUnoptimized dogs={dogs} onRemove={removeDog} />
    </div>
  );
};
