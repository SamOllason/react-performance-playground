import React, { useState, useMemo, useCallback } from 'react';
import { Dog } from '../data/dogData';

interface DogTableOptimizedProps {
  dogs: Dog[];
  onRemove: (id: number) => void;
}

// ✅ OPTIMIZED: React.memo prevents this component from re-rendering 
// unless its props (dog, onRemove, index) actually change
const DogRow = React.memo<{ dog: Dog; onRemove: (id: number) => void; index: number }>(
  ({ dog, onRemove, index }) => {
    console.log(`✅ OPTIMIZED: DogRow ${dog.name} (ID: ${dog.id}) rendered`);
    
    return (
      <tr style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
          <span style={{ fontSize: '24px', marginRight: '8px' }}>{dog.emoji}</span>
          {dog.name}
        </td>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dog.breed}</td>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dog.color}</td>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dog.favoriteToy}</td>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dog.favoriteFood}</td>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
          {'🦴'.repeat(dog.behaviorRating)}
        </td>
        <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
          <button 
            onClick={() => onRemove(dog.id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
);

DogRow.displayName = 'DogRow';

export const DogTableOptimized: React.FC<DogTableOptimizedProps> = ({ dogs, onRemove }) => {
  const [sortKey, setSortKey] = useState<keyof Dog>('name');
  
  console.log('✅ OPTIMIZED: DogTable component rendered');

  // ✅ OPTIMIZED: useMemo ensures sorting only happens when dogs or sortKey changes
  // Not on every single render!
  const sortedDogs = useMemo(() => {
    console.log('📊 useMemo: Recalculating sorted dogs');
    return [...dogs].sort((a, b) => {
      if (sortKey === 'behaviorRating') {
        return b[sortKey] - a[sortKey];
      }
      return String(a[sortKey]).localeCompare(String(b[sortKey]));
    });
  }, [dogs, sortKey]);

  // ✅ OPTIMIZED: useCallback ensures this function reference stays stable
  // This prevents DogRow components from re-rendering unnecessarily
  const handleSort = useCallback((key: keyof Dog) => {
    setSortKey(key);
  }, []);

  // ✅ OPTIMIZED: useCallback for the remove handler too
  // This ensures DogRow components don't re-render when unrelated state changes
  const handleRemove = useCallback((id: number) => {
    onRemove(id);
  }, [onRemove]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Sort by: </strong>
        <button onClick={() => handleSort('name')} style={buttonStyle}>Name</button>
        <button onClick={() => handleSort('breed')} style={buttonStyle}>Breed</button>
        <button onClick={() => handleSort('behaviorRating')} style={buttonStyle}>Behavior</button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Breed</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Color</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Favorite Toy</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Favorite Food</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Behavior</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedDogs.map((dog, index) => (
            <DogRow key={dog.id} dog={dog} onRemove={handleRemove} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  margin: '0 4px',
  padding: '8px 16px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
