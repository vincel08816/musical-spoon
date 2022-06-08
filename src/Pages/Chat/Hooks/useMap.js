import { useState } from "react";

export default function useMap() {
  const [state, setState] = useState(new Map());

  return {
    state,
    setMap: (newMap) => setState(newMap),
    get: (key) => state.get(key),
    has: (key) => state.has(key),
    set: (key, value) =>
      setState((prev) => {
        if (!state.has[key]) return new Map([...prev, [key, value]]);
        const newState = new Map(prev);
        newState.set(key, value);
        return newState;
      }),
    add: (key, value) => setState((prev) => new Map([...prev, [key, value]])),
    delete: (key) =>
      setState((prev) => {
        const newState = new Map(prev);
        newState.delete(key);
        return newState;
      }),
    clear: () => setState((prev) => new Map(prev.clear())),
    toArray: () => {
      const arr = [];
      state.forEach((value, key) => arr.push({ key, ...value }));
      return arr;
    },
  };
}
