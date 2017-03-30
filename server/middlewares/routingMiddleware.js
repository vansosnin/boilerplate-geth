import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import htmlRenderer from '../../helpers/htmlRenderer';
import createStore from '../../ui/init/createStore';
import routes from '../../ui/init/routes';

const handleRouter = (res, props) => {
    // todo: build here initial state

    const store = createStore(props);
    const initialState = store.getState();
    const application = renderToString(
        <Provider store={store}>
            <RouterContext {...props} />
        </Provider>
    );
    const htmlRendererIntance = new htmlRenderer({ application, initialState });

    res
        .status(200)
        .send(htmlRendererIntance.getHtml());
}

const handleRedirect = (res, redirect) => {
    res
        .redirect(302, redirect.pathname + redirect.search);
}

const handleNotFound = res => {
    res
        .status(404)
        .send('Not Found');
}

const handleError = (res, err) => {
    res
        .status(500)
        .send(err.message);
}

export default (req, res) => {
    match(
        { routes, location: req.url },
        (err, redirect, props) => {
            if (err) {
                handleError(res, err);
            } else if (redirect) {
                handleRedirect(res, redirect);
            } else if (props) {
                handleRouter(res, props);
            } else {
                handleNotFound(res);
            }
       }
   );
}
