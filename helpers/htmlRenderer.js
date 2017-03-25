import { getCurrentLangCode } from './i18n';

class htmlRenderer {
    constructor({ application }) {
        this._application = application;
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
            <script src='http://localhost:3001/manifest.js'></script>
            <script src='http://localhost:3001/vendor.js'></script>
            <script src='http://localhost:3001/client.js'></script>
        `;
    }
};

export default htmlRenderer;
