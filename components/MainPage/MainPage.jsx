import { PureComponent, PropTypes } from 'react';

import styles from './MainPage.scss';

class MainPage extends PureComponent {
    render() {
        return (
            <div className={styles.wrapper}>
                Hello from React!
            </div>
        );
    }
}

export default MainPage;
