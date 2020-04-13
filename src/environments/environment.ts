// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyAYLPdOTjFBWlSkUsSd9eODxAYufLu2JVA",
      authDomain: "expense-tracker-pz.firebaseapp.com",
      databaseURL: "https://expense-tracker-pz.firebaseio.com",
      projectId: "expense-tracker-pz",
      storageBucket: "expense-tracker-pz.appspot.com",
      messagingSenderId: "331695494444",
      appId: "1:331695494444:web:109623716d74ea2f3fc889"
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
