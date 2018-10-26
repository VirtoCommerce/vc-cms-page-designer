// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    storeBaseUrl: 'http://localhost:2082',
    storePreviewPath: '/designer-preview',
    baseUrl: '/',
    platformUrl: 'http://localhost/admin',
    apiBaseUrl: '/api/content',
    themeUrl: '/themes/',
    apiKey: '4f35d297210e4bfbb827ea33089a59f4',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
