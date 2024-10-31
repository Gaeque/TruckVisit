import React from 'react';
import { Svg, Path } from 'react-native-svg';

export function IconReturn({ color = '#fff', width = 35, height = 35 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 35 35" fill="none">
      <Path
        d="M27.7096 17.5H7.29297"
        stroke={color}
        strokeWidth="3.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5013 27.7096L7.29297 17.5013L17.5013 7.29297"
        stroke={color}
        strokeWidth="3.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
