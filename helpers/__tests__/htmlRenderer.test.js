import { expect } from 'chai';
import jsdom from 'jsdom';
import htmlRenderer from '../htmlRenderer';
import { REDUX_PRELOADED_STATE } from '../constants';

describe('htmlRenderer', () => {
    const initialState = { some: 'thing', dangerous: '<script>alert(1)</script>' };
    const application = '<div class="test">test</div>';
    const renderer = new htmlRenderer({ application, initialState });

    it('should purify initial state', () => {
        expect(renderer.getEscapedInitialState())
            .to.equal('{"some":"thing","dangerous":"\\u003Cscript\\u003Ealert(1)\\u003C\\u002Fscript\\u003E"}');
    });

    it('should render script tag with state', done => {
        const html = renderer.getScripts();
        jsdom.env(html, (err, windowObject) => {
            if (err) {
                done(err);
            }

            const expectedScript = windowObject.document.getElementById(REDUX_PRELOADED_STATE);
            expect(expectedScript).to.exist;
            done();
        });
    });

    describe('getHtml()', () => {
        const html = renderer.getHtml();

        it('should have doctype', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                expect(windowObject.document.doctype.name).to.equal('html');
                done();
            });
        });

        it('should have lang on html tag', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                expect(windowObject.document.querySelector('html').lang).to.equal('en');
                done();
            });
        });

        it('should have title', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('title');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have meta charset', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('meta[charset]');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have meta http-equiv', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('meta[http-equiv]');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have meta viewport', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('meta[name=viewport]');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have meta keywords', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('meta[name=keywords]');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have meta description', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('meta[name=description]');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have stylesheet', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('link[rel=stylesheet]');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have root div', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('#root');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have content inside root div', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('.test');
                expect(expectedTag).to.exist;
                done();
            });
        });

        it('should have scripts', done => {
            jsdom.env(html, (err, windowObject) => {
                if (err) {
                    done(err);
                }

                const expectedTag = windowObject.document.querySelector('script');
                expect(expectedTag).to.exist;
                done();
            });
        });
    });
});
