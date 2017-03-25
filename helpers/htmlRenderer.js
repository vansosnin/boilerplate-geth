import serialize from 'serialize-javascript';
import createDOMPurify from 'dompurify';
import jsdom from 'jsdom';

import { getCurrentLangCode } from './i18n';
import { REDUX_PRELOADED_STATE } from './constants';

class htmlRenderer {
    constructor({ application, initialState }) {
        this._application = application;
        this._initialState = initialState;
    }

    getHtml() {
        return `
        <!doctype html>
        <html lang='${getCurrentLangCode()}'>
            <head>
                <meta charset='utf-8'>
                <meta http-equiv='x-ua-compatible' content='ie=edge'>
                <meta name='viewport' content='width=device-width, initial-scale=1'>
                ${this.getTitle()}
                ${this.getMetaTags()}
                ${this.getStyles()}
            </head>
            <body>
                <div id='root'>${this._application}</div>
                ${this.getScripts()}
            </body>
        </html>
        `;
    }

    getTitle() {
        return `<title>Personal Funds</title>`;
    }

    getMetaTags() {
        return `
            <meta name='description' content='Personal finances management application'>
            <meta name='keywords' content='funds, finances, mobile, application'>
        `;
    }

    getStyles() {
        return `
            <link href="http://localhost:3001/client.css" media="all" rel="stylesheet" />
        `;
    }

    getScripts() {
        return `
            <script id='${REDUX_PRELOADED_STATE}'>
                window.${REDUX_PRELOADED_STATE} = ${this.getEscapedInitialState()}
            </script>
            <script src='http://localhost:3001/manifest.js'></script>
            <script src='http://localhost:3001/vendor.js'></script>
            <script src='http://localhost:3001/client.js'></script>
        `;
    }

    getEscapedInitialState() {
        const serializedState = serialize(this._initialState);
        const window = jsdom.jsdom('', {
            features: {
                FetchExternalResources: false, // disables resource loading over HTTP / filesystem
                ProcessExternalResources: false // do not execute JS within script blocks
            }
        }).defaultView;
        const DOMPurify = createDOMPurify(window);
        const purifiedState = DOMPurify.sanitize(serializedState);

        return purifiedState;
    }
};

export default htmlRenderer;
