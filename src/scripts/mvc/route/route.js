var _ = require('underscore');

module.exports = function (fragments, id, toURL, fromURL) {

    if (!_.isArray(fragments)) {
        fragments = [fragments];
    }

    this.fragments = fragments;
    this.id = id;
    this.toURL = toURL || function (pageOptions) {
            //# create a url from the pageOptions
            return;
        };
    this.fromURL = fromURL || function (params) {
            //# create an object from the url params
            return;
        };

    this.getFragment = function () {

        return fragments[0];

    };

};
