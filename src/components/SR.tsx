import React, { useState, useEffect, useCallback } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  calculateTimeDilation,
  validateNumeric,
  formatted,
} from '../utils/numberUtils';
import animationData from '../lotties/rocket.json';
import Select from 'react-select';
import debounce from 'lodash.debounce';
import Lottie from 'react-lottie';
import earthImg from '../assets/earth-small.png'; // gives image path

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

// const debouncedTimeDilation = throttle(
//   (humanTimeNumeric: number, velocity: number) => {
//     const ATNum = calculateTimeDilation(humanTimeNumeric, velocity);
//     return formatted(ATNum);
//   },
//   1000,
//   { leading: true, trailing: false }
// );

const SR = () => {
  // Time as measured by observer on Earth
  const [humanTime, setHumanTime] = useState('');
  const humanTimeNumeric = Number(humanTime);

  // Time as measured by observer moving relative to static observer
  const [alienTime, setAlienTime] = useState('');

  // Only Accept numbers and dot in input
  const handleInputChange = (text: string) => {
    if (validateNumeric(text)) {
      setHumanTime(text);
    }
  };

  const [velocity, setVelocity] = useState(0);
  const rocketAnimationSpeed = scale(velocity, 0, 100, 0.1, 3);

  const setATDebounced = useCallback(
    // setAlienTime("loading");
    debounce((timeNum, v) => {
      setAlienTime(formatted(calculateTimeDilation(timeNum, v)));
      // setAlienTime(val);
    }, 200),
    []
  );

  useEffect(() => {
    setAlienTime('Loading');
    setATDebounced(humanTimeNumeric, velocity);
    // return () => {
    //   cleanup
    // }
  }, [humanTimeNumeric, setATDebounced, velocity]);

  return (
    <div className="outer">
      <div className="container">
        <div className="sub-container">
          <div className="top">
            <h3>Human time is: </h3>{' '}
            <div className="form-container">
              <input
                value={humanTime}
                onChange={(e) => handleInputChange(e.target.value)}
                type="number"
              ></input>{' '}
              <Select
                className="select"
                defaultValue={timeOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isSearchable={isSearchable}
                name="time-unit"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="earth-container">
            <img
              src={earthImg}
              alt="Earth"
              width={260}
              height={260}
              className="earth"
            />
          </div>
        </div>
        <div className="sub-container">
          <div className="spaceship-form">
            <h3>Spaceship Velocity is: </h3>
            <h3>{velocity}% light speed</h3>
            <Slider
              min={0}
              step={0.01}
              max={99.99}
              onChange={(val) => setVelocity(val)}
            />
          </div>
          <div className="lottie-container">
            <div className="lottie">
              <Lottie
                options={defaultOptions}
                // height={260}
                width={230}
                isPaused={false}
                speed={rocketAnimationSpeed}
              />
            </div>
          </div>
          <h3>Alien time is: {alienTime}</h3>
        </div>
      </div>
    </div>
  );
};

export default SR;
