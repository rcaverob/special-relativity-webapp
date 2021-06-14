import { useState, useEffect, useCallback } from 'react';
import Slider from 'rc-slider';
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
import earthImg from '../assets/earth-small.png';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const timeOptions = [
  { value: 'Days', label: 'Days' },
  { value: 'Months', label: 'Months' },
  { value: 'Years', label: 'Years' },
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
  // Time as measured by observer on Earth
  const [humanTime, setHumanTime] = useState('');
  const humanTimeNumeric = Number(humanTime);
  const [timeUnit, setTimeUnit] = useState('Days');

  // Time as measured by observer moving relative to static observer
  const [spaceshipTime, setSpaceshipTime] = useState('');

  // Only Accept numbers and dot in input
  const handleInputChange = (text: string) => {
    if (validateNumeric(text)) {
      setHumanTime(text);
    }
  };

  const [velocity, setVelocity] = useState(0);
  const rocketAnimationSpeed = scale(velocity, 0, 100, 0.1, 3);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setATDebounced = useCallback(
    debounce((timeNum, v) => {
      setSpaceshipTime(formatted(calculateTimeDilation(timeNum, v)));
    }, 200),
    []
  );

  useEffect(() => {
    setSpaceshipTime('Calculating...');
    setATDebounced(humanTimeNumeric, velocity);
  }, [humanTimeNumeric, setATDebounced, velocity]);

  return (
    <div className="outer">
      <div className="container">
        <div className="sub-container">
          <div className="top" style={{ width: '100%' }}>
            <h3>Earth clock measures: </h3>{' '}
            <div className="form-container">
              <input
                value={humanTime}
                placeholder={'0'}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }}
                type="number"
              ></input>{' '}
              <Select
                onChange={(e) => setTimeUnit(e!.value)}
                className="select"
                defaultValue={timeOptions[0]}
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
            <h3 style={{ lineHeight: 0 }}>Spaceship velocity is: </h3>
            <h3>{velocity}% light speed</h3>
            <Slider
              min={0}
              step={0.01}
              max={99.99}
              trackStyle={{
                background: '#1e90ff',
              }}
              handleStyle={{
                background: 'white',
                color: '#1e90ff',
                borderColor: '#1e90ff',
              }}
              onChange={(val) => setVelocity(val)}
            />
          </div>
          <div className="lottie-container">
            <div className="lottie">
              <Lottie
                options={defaultOptions}
                width={230}
                isPaused={false}
                speed={rocketAnimationSpeed}
              />
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <h3>Spaceship clock measures: </h3>
            <h3 style={{ lineHeight: 0 }}>
              {spaceshipTime} {spaceshipTime !== 'Calculating...' && timeUnit}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SR;
