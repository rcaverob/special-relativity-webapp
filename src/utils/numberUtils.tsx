import { TimeUnit } from '../modules/Time';

// Returns true only if string consists of numbers and dots only
export function validateNumeric(s: string) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

// Calculates the time dilation of an observer moving at a given percentage of light speed
export function calculateTimeDilation(
  time: number,
  lsPercentage: number
): number {
  const lsDecimal = lsPercentage / 100;
  return time * Math.sqrt(1 - lsDecimal ** 2);
}

// Returns number formatted to a maximum of 2 decimals
export function formatted(value: number | undefined): string {
  if (value === undefined) {
    return '';
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Returns number converted given the time unit
export function converted(value: number, unit: TimeUnit): string {
  let res = '';
  switch (unit) {
    case TimeUnit.Seconds:
      res = formatted(value);
      break;
    case TimeUnit.Minutes:
      res = formatted(value / 60);
      break;
    case TimeUnit.Hours:
      res = formatted(value / 3600);
      break;
    case TimeUnit.Days:
      res = formatted(value / 3600 / 24);
      break;
  }
  return res;
}

export function timeUnitMultiplier(unit: TimeUnit): number {
  let res = 1;
  switch (unit) {
    case TimeUnit.Seconds:
      res = 1;
      break;
    case TimeUnit.Minutes:
      res = 60;
      break;
    case TimeUnit.Hours:
      res = 3600;
      break;
    case TimeUnit.Days:
      res = 3600 * 24;
      break;
  }
  return res;
}
