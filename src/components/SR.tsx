import { useState, useEffect, useCallback } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  calculateTimeDilation,
  validateNumeric,
  timeUnitMultiplier,
  converted,
} from '../utils/numberUtils';
import animationData from '../lotties/rocket.json';
import Select from 'react-select';
import debounce from 'lodash.debounce';
import Lottie from 'react-lottie';
import earthImg from '../assets/earth-small.png';
import { TimeUnit } from '../modules/Time';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const timeOptions = [
  { value: 1, label: TimeUnit.Seconds },
  { value: 60, label: TimeUnit.Minutes },
  { value: 60 * 60, label: TimeUnit.Hours },
  { value: 60 * 60 * 24, label: TimeUnit.Days },
  // { value: 60 * 60 * 24 * 30, label: TimeUnit.Months },
  // { value: 60 * 60 * 24 * 365, label: TimeUnit.Years },
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
  const [timeUnit, setTimeUnit] = useState(TimeUnit.Seconds);

  const [spaceshipTimeUnit, setSpaceshipTimeUnit] = useState(TimeUnit.Seconds);

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
      setSpaceshipTime(
        converted(calculateTimeDilation(timeNum, v), spaceshipTimeUnit)
      );
    }, 200),
    [spaceshipTimeUnit]
  );

  useEffect(() => {
    const multiplier = timeUnitMultiplier(timeUnit);
    setSpaceshipTime('Calculating...');
    setATDebounced(humanTimeNumeric * multiplier, velocity);
  }, [humanTimeNumeric, setATDebounced, velocity, timeUnit]);

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
                className={'input-num'}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }}
                type="number"
              ></input>
              <Select
                onChange={(e) => setTimeUnit(e!.label)}
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
            <div className="form-container">
              <h3 style={{ lineHeight: 0, minWidth: '10ch' }}>
                {spaceshipTime}{' '}
              </h3>
              <Select
                onChange={(e) => setSpaceshipTimeUnit(e!.label)}
                className="select"
                defaultValue={timeOptions[0]}
                name="time-unit"
                options={timeOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SR;
