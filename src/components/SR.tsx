import React, { useState, useEffect, useRef } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  calculateTimeDilation,
  validateNumeric,
  formatted,
} from '../utils/numberUtils';
// import lottie from 'lottie-web';

import Lottie from 'react-lottie';
import animationData from '../lotties/rocket-1.json';
import Select from 'react-select';
import { handleInputChange } from 'react-select/src/utils';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const timeOptions = [
  { value: 1, label: 'Days' },
  { value: 365, label: 'Years' },
  // { value: 'vanilla', label: 'Vanilla' },
];

function scale(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const SR = () => {
  const [humanTime, setHumanTime] = useState('');
  const humanTimeNumeric = Number(humanTime);

  // Only Accept numbers and dot in input
  const handleInputChange = (text: string) => {
    if (validateNumeric(text)) {
      setHumanTime(text);
    }
  };
  // const [alienTime, setAlienTime] = useState(0);
  const [velocity, setVelocity] = useState(50);

  // const rocketContainer = useRef<HTMLDivElement>(null);

  const rocketAnimationSpeed = scale(velocity, 0, 100, 0.1, 3);

  const alienTime = formatted(
    calculateTimeDilation(humanTimeNumeric, velocity)
  );
  return (
    <div className="container">
      <h3>Human time is: </h3>{' '}
      <input
        value={humanTime}
        onChange={(e) => handleInputChange(e.target.value)}
      ></input>{' '}
      <Select
        className="select"
        // classNamePrefix="select"
        defaultValue={timeOptions[0]}
        // isDisabled={isDisabled}
        // isLoading={isLoading}
        // isClearable={isClearable}
        // isRtl={isRtl}
        // isSearchable={isSearchable}
        // name="color"
        options={timeOptions}
      />
      <h3>Alien time is: {alienTime}</h3>
      <h3>Spaceship Velocity: {velocity}% light speed</h3>
      <Slider
        min={0}
        step={0.01}
        max={99.99}
        onChange={(val) => setVelocity(val)}
      />
      {/* <div className="anim-container" ref={rocketContainer}></div> */}
      <div className="no-click">
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isPaused={false}
          speed={rocketAnimationSpeed}
        />
      </div>
      {/* <Range /> */}
    </div>
  );
};

export default SR;
