// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendURL: 'https://webtech.danidipp.com',
  overviewImages: [
    { src: 'assets/img/handshake.jpg', title: 'Trusted by 1.000.000+ customers' },
    { src: 'https://wallpapercrafter.com/desktop/292420-dog-friendship-nature-trust-labrador-snout.jpg', title: 'We like dogs.' },
    { src: 'https://pixelz.cc/wp-content/uploads/2018/09/digital-security-lock-uhd-4k-wallpaper.jpg', title: 'Your data is highly secured.' },
    { src: 'https://www.itl.cat/pngfile/big/303-3032161_donald-trump-wallpaper-background-kim-jong-un-ok.jpg', title: 'Recommended by celebrities.' }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
