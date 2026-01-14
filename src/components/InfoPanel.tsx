import React from 'react';

interface InfoPanelProps {
  title: string;
  description: string;
  type: 'warning' | 'success' | 'info';
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ title, description, type }) => {
  const colors = {
    warning: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
    success: { bg: '#d4edda', border: '#28a745', text: '#155724' },
    info: { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460' }
  };

  const color = colors[type];

  return (
    <div style={{
      backgroundColor: color.bg,
      border: `2px solid ${color.border}`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      color: color.text
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: '1.5' }}>{description}</p>
    </div>
  );
};
