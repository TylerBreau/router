'use strict';

import RouterStrategy from './RouterStrategy';

class HashStrategy extends RouterStrategy {
    constructor(router) {
        super(router);
        this._base = '#';
        this._stack = [];
        this._position =  -1;

        window.addEventListener('popstate', (ev) => {
            console.log("popstate");
            this._fireURLChange(this.getLocation());
        });

        window.addEventListener('hashchange', (e) => {
            console.log("haschange");
            this._fireURLChange(this.getLocation())
        });

        this._init();
    }

    _init() {
        var loc = this.getLocation();
        this.pushState(loc);
    }

    getLocation() {
        return window.location.hash.replace('#', '');
    }

    getLocationAt(position) {
        return this._stack[this._position + position];
    }

    getHistoryLength() {
        return this._stack.length;
    }

    getScrollRestoration() {
        return window.history.scrollRestoration;
    }

    canGo(to) {
        return this._stack[this._position + to] !== undefined;
    }

    peek(to) {
        return this._stack[this._position + to];
    }

    peekForward() {
        return this.peek(1);
    }

    peekBack() {
        return this.peek(-1);
    }

    canForward() {
        return this.canGo(1);
    }

    canBack() {
        return this.canGo(-1);
    }

    /**
     * 
     * @param {number} url 
     */
    go(to) {
        if (!this.canGo(to)) {
            return;
        }

        this._position += to;
        var url = this._stack[this._position];

        this._navigate(url);
    }

    forward() {
        this.go(1);
    }

    back() {
        return this.go(-1);
    }

    /**
     * 
     * @param {url} url 
     * @param {object} state Note: Not implemented
     */
    pushState(url, state) {
        if (url === this.getLocation()) {
            //We are already here, so do nothing.
            return;
        }

        if (this._stack.length === 0) {
            this._stack[++this._position] = this.getLocation();
        }

        this._stack[++this._position] = url;

        //clear everything after position.
        this._stack = this._stack.slice(0, this._position + 1);

        this._navigate(url);
    }

    replaceState(url, state) {
        if (url === this.getLocation()) {
            //We are already here, so do nothing.
            return;
        }
        
        if (this._position === -1) {
            this.pushState(url, state);
        }
        else {
            this._stack[this._position] = url;
            this._navigate(url);
        }
    }

    clear() {
        this._stack = [];
        this._position = -1;
    }

    _navigate(url) {
        window.location.hash = this._base + url;
        this._fireURLChange(this.getLocation());
    }
}

export {
    HashStrategy
};

export default HashStrategy;
