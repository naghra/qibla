import { useState, useEffect, useCallback } from 'react';
import { CompassStatus } from '../types';

export const useCompass = () => {
  const [heading, setHeading] = useState<number>(0);
  const [status, setStatus] = useState<CompassStatus>(CompassStatus.UNSUPPORTED);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let newHeading = 0;

    // iOS specific property
    if ((event as any).webkitCompassHeading) {
      newHeading = (event as any).webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Android / Standard
      // alpha is rotation around z-axis (0 is North... roughly, requires absolute)
      // For standard web, alpha=0 is usually where the device was initialized or North if 'absolute' is supported.
      // We perform a basic inversion for visual compass.
      // Note: 'absolute' property check is ideal but complex across browsers. 
      // We assume alpha maps roughly to compass for this demo or fallback to 0.
      newHeading = 360 - event.alpha;
    }

    setHeading(newHeading);
  }, []);

  const requestCompassPermission = async () => {
    // Check if iOS 13+ permission API exists
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setStatus(CompassStatus.ACTIVE);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          alert('Permission denied. Compass will not rotate.');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Non-iOS or older devices usually don't need explicit permission prompt logic
      // But we set active to start listening if not already
      setStatus(CompassStatus.ACTIVE);
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  useEffect(() => {
    // Initial check
    if (window.DeviceOrientationEvent) {
       // Check if we need permission (iOS 13+)
       if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
         setStatus(CompassStatus.WAITING_FOR_PERMISSION);
       } else {
         setStatus(CompassStatus.ACTIVE);
         window.addEventListener('deviceorientation', handleOrientation);
       }
    } else {
      setStatus(CompassStatus.UNSUPPORTED);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation]);

  return { heading, status, requestCompassPermission };
};