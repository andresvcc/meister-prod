import { useState, useEffect } from 'react';
import { useWindowWidth, useWindowHeight } from 'react-window-size-hooks';

import {
  mobileModel, mobileVendor, deviceDetect, deviceType, browserName
} from 'react-device-detect';

const deviceGenerator = (mobileVendor, mobileModel) => `${mobileVendor} ${mobileModel}`;

const calcul = (width, height) => {
  const a = width;
  const b = height;
  const c = Math.hypot(a, b);
  // const hypt = c;
  // const angle = (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
  const type = width === 0 || width > 414 ? (deviceType || 'browser') : 'mobile';
  const direction = a < b ? 'side' : 'aside';
  return {
    type, direction, device: deviceGenerator(mobileVendor, mobileModel) // angle, hypt,
  };
};

export default function useWindowSize() {
  const hookWidth = useWindowWidth();
  const hookHeight = useWindowHeight();
  const device = deviceDetect();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [math, setMath] = useState(calcul(width, height));

  useEffect(() => {
    if (width !== hookWidth) {
      const hh = calcul(hookWidth, hookHeight);
      setMath(hh);
      setWidth(hookWidth);
      setHeight(hookHeight);
    }
  }, [hookWidth, hookHeight]);

  return {
    width,
    height,
    os: device.os,
    ...math,
    hookWidth,
    hookHeight,
    browserName
  };
}
