import React, { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: 'log' | 'info' | 'warn' | 'error';
}

interface ConsolePanelProps {
  maxLogs?: number;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({ maxLogs = 50 }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(0);

  useEffect(() => {
    // Store original console methods
    const originalLog = console.log;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Override console methods to capture logs
    const addLog = (message: string, type: 'log' | 'info' | 'warn' | 'error') => {
      const timestamp = new Date().toLocaleTimeString();
      // Use setTimeout to defer state update until after render completes
      setTimeout(() => {
        setLogs(prev => {
          const newLogs = [...prev, { 
            id: logIdCounter.current++, 
            message, 
            timestamp, 
            type 
          }];
          return newLogs.slice(-maxLogs); // Keep only last maxLogs entries
        });
      }, 0);
    };

    // Monkey-patch console methods to intercept and capture logs for the UI
    console.log = (...args: any[]) => {
      originalLog(...args);
      addLog(args.map(arg => String(arg)).join(' '), 'log');
    };

    console.info = (...args: any[]) => {
      originalInfo(...args);
      addLog(args.map(arg => String(arg)).join(' '), 'info');
    };

    console.warn = (...args: any[]) => {
      originalWarn(...args);
      addLog(args.map(arg => String(arg)).join(' '), 'warn');
    };

    console.error = (...args: any[]) => {
      originalError(...args);
      addLog(args.map(arg => String(arg)).join(' '), 'error');
    };

    // Cleanup: restore original console methods
    return () => {
      console.log = originalLog;
      console.info = originalInfo;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, [maxLogs]);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (isExpanded) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isExpanded]);

  const clearLogs = () => {
    setLogs([]);
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error': return '#ff6b6b';
      case 'warn': return '#ffa726';
      case 'info': return '#42a5f5';
      default: return '#e0e0e0';
    }
  };

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '2px solid #333',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '10px 16px',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🔧</span>
          <span style={{ 
            color: '#9cdcfe', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            DevTools Console (Simulated)
          </span>
          <span style={{
            backgroundColor: '#333',
            color: '#888',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px'
          }}>
            {logs.length} logs
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={clearLogs}
            style={{
              backgroundColor: '#333',
              color: '#e0e0e0',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            title="Clear console"
          >
            🗑️ Clear
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              backgroundColor: '#333',
              color: '#e0e0e0',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Console Output */}
      {isExpanded && (
        <div style={{
          padding: '12px',
          maxHeight: '300px',
          overflowY: 'auto',
          backgroundColor: '#1e1e1e',
          fontSize: '13px'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Console is empty. Interact with the page to see render logs...
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '4px 0',
                  borderBottom: '1px solid #2d2d2d',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start'
                }}
              >
                <span style={{
                  color: '#666',
                  fontSize: '11px',
                  minWidth: '70px',
                  flexShrink: 0
                }}>
                  {log.timestamp}
                </span>
                <span style={{
                  color: getLogColor(log.type),
                  wordBreak: 'break-word',
                  flex: 1
                }}>
                  {log.message}
                </span>
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>
      )}
    </div>
  );
};
