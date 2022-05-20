import {React, useState} from 'react';

export function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  return {mode}
} 