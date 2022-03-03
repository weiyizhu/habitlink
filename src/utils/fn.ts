import React, {createContext, useContext, useEffect, useRef} from 'react';
import {UserContext} from './types';

export const useEffectUpdate = (
  fn: Function,
  dependencies?: React.DependencyList | undefined,
) => {
  const didMountRef = useRef(false);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, dependencies ?? []);
};

export const DefUserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  uid: null,
  setUid: () => {},
});

export const useUserContext = () => useContext(DefUserContext);
