import * as React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles';

import { BOOKING_BASE_URL } from '../../constants';

import { connect } from 'react-redux';

function BookingScreen(props) {
    const { restoreTokenResponse, getLangResponse } = props;
    const { userToken } = restoreTokenResponse;
    const { language } = getLangResponse;

    const [webUrl, setWebUrl] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadWebUrl = async () => {
            let lang = language === '0' ? 'en' : language === '1' ? 'ru' : 'ka';
            if(userToken !== null) {
                setWebUrl(BOOKING_BASE_URL + "owner/?" + lang + "-" + userToken);
            } else {
                setWebUrl(BOOKING_BASE_URL + "guest/?" + lang);
            }
            setLoading(false);
        }

        loadWebUrl()
    }, [language])

    if(loading) {
        return null;
    } else {
        return (
            <WebView source={{ uri: webUrl }} style={styles.webview} useWebKit={true}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        getLangResponse: state.getLangReducer,
        restoreTokenResponse: state.restoreTokenReducer,
    }
}

export default connect(mapStateToProps)(BookingScreen);