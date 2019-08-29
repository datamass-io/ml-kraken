// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpointsUrl: 'https://r2bp2xn5b2.execute-api.eu-west-1.amazonaws.com/dev/api/v1/',
  amplifyConfig: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_KpVmDAr6f',
    userPoolWebClientId: '60tjouc704tulfmrjroa5hfk97'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
