import React, { useState, useEffect, useCallback } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  calculateTimeDilation,
  validateNumeric,
  formatted,
} from '../utils/numberUtils';
import animationData from '../lotties/rocket-3.json';
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

  // const rocketContainer = useRef<HTMLDivElement>(null);

  const rocketAnimationSpeed = scale(velocity, 0, 100, 0.1, 6);

  // const updateTime = debounce((humanTimeNumeric: number, velocity: number) => {
  //   const ATNum = calculateTimeDilation(humanTimeNumeric, velocity);
  //   setAlienTime(formatted(ATNum));
  // }, 1000);
  // useCallback(
  //   () => {
  //     callback
  //   },
  //   [],
  // )
  const setATDebounced = useCallback(
    // setAlienTime("loading");
    debounce((timeNum, v) => {
      setAlienTime(formatted(calculateTimeDilation(timeNum, v)));
      // setAlienTime(val);
    }, 200),
    []
  );

  useEffect(() => {
    // const AT = debouncedTimeDilation(humanTimeNumeric, velocity);
    setAlienTime('Loading');
    setATDebounced(humanTimeNumeric, velocity);
    // if (AT) {
    //   setAlienTime(AT);
    // }
    // return () => {
    //   cleanup
    // }
  }, [humanTimeNumeric, setATDebounced, velocity]);
  // const AT = calculateTimeDilation(humanTimeNumeric, velocity);
  // console.log(AT);

  // const alienTime = formatted(AT);
  // const alienTime: string = formatted(
  //   calculateTimeDilation(humanTimeNumeric, velocity)
  // );

  console.log('hello');
  return (
    <div className="container">
      <div className="sub-container">
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
        <img src={earthImg} alt="Earth" className="earth" />
      </div>

      <div className="sub-container">
        <h3>Alien time is: {alienTime}</h3>
        <h3>Spaceship Velocity is: </h3>
        <h3>{velocity}% light speed</h3>
        <Slider
          min={0}
          step={0.01}
          max={99.99}
          onChange={(val) => setVelocity(val)}
        />
        {/* <div className="anim-container" ref={rocketContainer}></div> */}
        <div className="lottie-container">
          <div className="lottie">
            <Lottie
              options={defaultOptions}
              // height={'100%'}
              // width={'100%'}
              isPaused={false}
              speed={rocketAnimationSpeed}
            />
          </div>
        </div>
      </div>
      {/* <Range /> */}
    </div>
  );
};

export default SR;
