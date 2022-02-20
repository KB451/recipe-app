import React, { useState, useEffect } from 'react';

// FUNCTION TAKES IN KEY NAME AND AN INITIAL VALUE
function useLocalStorage(key, defaultVal) {
  // FUNCTION THAT EITHER GETS DATA FROM LOCAL STORAGE OR RETURNS THE INITIAL VALUE
  const [state, setState] = useState(() => {
      let value;
      try {
        value = JSON.parse(window.localStorage.getItem(key) || String(defaultVal))
      } catch(e) {
        value = defaultVal
      }
      return value
  })

  // FUNCTION THAT STORES DATA INTO LOCAL STORAGE
  useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  // RETURNS VALUE AND FUNCTION TO UPDATE VALUE
  return [state, setState]
}
export default useLocalStorage;