'use strict';

import {EventEmitter} from 'events';

export const EVENT_URL_CHANGE = 'urlchange';

class RouterStrategy extends EventEmitter {

    constructor(router) {
        super();
        this._router = router;
    }

    getRouter() {
        return this._router;
    }

    /**
     * 
     * @param {string} url 
     */
    setTitle(title) {
        var head = document.head.getElementsByTagName('title')[0];

        if (!head) {
            head = document.createElement('title');
            document.head.appendChild(head);
        }

        if (title && title.toString()) {
            head.innerText = title.toString();
        }
    }

    /**
     * 
     * @param {Function} url 
     */
    addURLChangeCallback(callback) {
        this.on(EVENT_URL_CHANGE, callback);
    } 

    /**
     * 
     * @param {Function} url 
     */
    removeURLChangeCallback(callback) {
        this.removeListener(EVENT_URL_CHANGE, callback);
    }

    /**
     * 
     * @param {number} url 
     */
    getLocationAt(position) {
        throw new Error('getLocationAt is abstract.');
    }

    getLocation() {
        throw new Error('getLocation is abstract.');
    }

    getHistoryLength() {
        throw new Error('getHistoryLength is abstract.');
    }

    getScrollRestoration() {
        throw new Error('getScrollRestoration is abstract.');
    }

    go(to) {
        throw new Error('go is abstract.');
    }

    canGo(to) {
        throw new Error('canGo is abstract.');
    }

    canBack() {
        throw new Error('canBack is abstract.');
    }

    canForward() {
        throw new Error('canForward is abstract.');
    }

    peek(to) {
        throw new Error('peek is abstract.');   
    }

    peekForward() {
        throw new Error('peekForward is abstract.');
    }

    peekBack() {
        throw new Error('peekBack is abstract.');
    }

    /**
     * 
     * @param {string} url
     * @param {Object} state 
     */
    pushState(url, state) {
        throw new Error('pushState is abstract.');
    }

    /**
     * 
     * @param {string} url
     * @param {Object} state 
     */
    replaceState(url, state) {
        throw new Error('replaceState is abstract.');
    }

    clear() {
        throw new Error('clear is abstract.');
    }

    /**
     * 
     * @param {string} url 
     */
    _fireURLChange(url) {
        console.log("fire url");
        this.emit(EVENT_URL_CHANGE, url);
    }
}

export {RouterStrategy};
export default RouterStrategy;
