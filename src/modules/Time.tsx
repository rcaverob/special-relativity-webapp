// const Time {
enum TimeUnit {
  Seconds = 'Seconds',
  Minutes = 'Minutes',
  Hours = 'Hours',
  Days = 'Days',
  Months = 'Months',
  Years = 'Years',
}

const timeValues = {
  Seconds: 1,
  Minutes: 60,
};

export { TimeUnit, timeValues };

//   export { TimeUnit };

//   export { TimeUnit };

//   export interface ProvisionSettingsService {
//     setGlobalProvisionMode(
//       arg0: ProvisionMode,
//       arg1: string,
//       back: Http.HttpDefaultCallback
//     ): void;
//     getGlobalProvisionMode(arg0: string, back: Http.HttpDefaultCallback): void;
//     setPathProvision(
//       arg0: string,
//       arg1: ProvisionMode,
//       back: Http.HttpDefaultCallback
//     ): void;
//     getPathProvision(arg0: string, back: Http.HttpDefaultCallback): void;
//   }
// }
