import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace) { 
      setHistory([...history.slice(0, history.length-1), newMode]);
      return setMode(newMode);
    } 
    setHistory([...history, newMode]);
    setMode(newMode);
  }

  const back = () => {
    if (history.length === 1) return; 
    setHistory([...history.slice(0, history.length -1)]);
    return setMode(history[history.length -2])
  }

  return {mode, transition, back}
} 