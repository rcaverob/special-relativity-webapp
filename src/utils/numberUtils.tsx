// import debounce from 'lodash.debounce';

// Returns true only if string consists of numbers and dots only
export function validateNumeric(s: string) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

// Calculates the time dilation of an observer moving at a given percentage of light speed
export function calculateTimeDilation(time: number, lsPercentage: number) {
  const lsDecimal = lsPercentage / 100;
  return time * Math.sqrt(1 - lsDecimal ** 2);
}

export function formatted(value: number | undefined): string {
  if (value === undefined) {
    return '';
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
