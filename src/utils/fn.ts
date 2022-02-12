import {useEffect, useRef} from 'react';

export const useEffectUpdate = (
  fn: Function,
  dependencies?: React.DependencyList | undefined,
) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, dependencies);
};
