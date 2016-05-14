module.exports = {

    CDN: 'CDN_PATH',

    MOBILE : window.device.mobile(),
    TABLET : window.device.tablet(),
    IOS    : window.device.ios(),
    ANDROID: window.device.android(),

    DESKTOP: !window.device.mobile() && !window.device.tablet(),

    IDOL_ELEMENT_OFFSET: 150

};
