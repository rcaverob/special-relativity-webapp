// import debounce from 'lodash.debounce';

// Returns true only if string consists of numbers and dots only
export function validateNumeric(s: string) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

export function calculateTimeDilation(time: number, lsPercentage: number) {
  console.log('CALCULATING!!!');
  const lsDecimal = lsPercentage / 100;
  return time * Math.sqrt(1 - lsDecimal ** 2);
}

// Returns the equivalent time duration as measured by an observer moving at the given percentage of light speed
// export const calculateTimeDilation = debounce(
//   (time: number, lsPercentage: number) => {
//     console.log('CALCULATING!!!');
//     const lsDecimal = lsPercentage / 100;
//     return time * Math.sqrt(1 - lsDecimal ** 2);
//   },
//   1000
// );

export function formatted(value: number | undefined): string {
  if (value === undefined) {
    return '';
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
