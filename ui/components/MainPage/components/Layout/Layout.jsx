import { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTest } from '../../selectors';
import styles from './Layout.scss';

class Layout extends PureComponent {
    render() {
        const { test } = this.props;

        return (
            <div className={styles.wrapper}>
                <div>
                    Hello from React!
                </div>
                <div>
                    {test}
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    test: PropTypes.string
};

export default connect(getTest)(Layout);
