import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace) { 
      setHistory(prev => ([...prev.slice(0, prev.length-1), newMode]));
      // console.log("current mode: ", newMode);
      // console.log("history w replace : ", history);
      return setMode(newMode);
    } 
    setHistory(prev => ([...prev, newMode]));
    // console.log("current mode: ", newMode);
    // console.log("history no replace: ", history);
    setMode(newMode);
  }

  const back = () => {
    if (history.length === 1) return; 
    setHistory(prev => ([...prev.slice(0, prev.length -1)]));
    // console.log("mode coming from after pressing back() ", mode);
    // console.log("history from back() : ", history);
    return setMode(history[history.length -2])
  }

  return {mode, transition, back}
} 