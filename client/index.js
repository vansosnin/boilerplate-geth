import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import InitialComponent from '../ui/init/InitialComponent';

render(
    <AppContainer>
        <InitialComponent />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('../ui/init/InitialComponent', () => {
        render(
            <AppContainer>
                <InitialComponent />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
