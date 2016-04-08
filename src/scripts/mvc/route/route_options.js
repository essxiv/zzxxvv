module.exports = function (updateURL, triggerRoute) {
    if (triggerRoute !== false) {
        triggerRoute = true;
    }
    if (updateURL !== false) {
        updateURL = true;
    }

    this.triggerRoute = triggerRoute;
    this.updateURL = updateURL;
    this.pageOptions = null;
};


