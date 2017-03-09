import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MainPage from '../components/MainPage';

render(
    <AppContainer>
        <MainPage />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('../components/MainPage', () => {
        render(
            <AppContainer>
                <MainPage />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
