import {Component} from 'react';

import {Page} from '@breautek/router';

export class Page2 extends Page {
    constructor(props) {
        super(props);
    }

    _render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'green'
            }} onClick={() => {
                this.props.router.replaceState('/test3');
            }}>
                Component 2
            </div>
        );
    }
}