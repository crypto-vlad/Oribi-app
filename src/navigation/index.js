import * as React from 'react';
import { Platform, StatusBar, View, AsyncStorage, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import styles from './styles';

import Lang from '../constants/language';
import SignInNavigator from './signInNavigator';
import AppMainNavigator from './appMainNavigator';
import GuestMainNavigator from './guestMainNavigator';
import MyProfileScreen from '../screens/MyProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import FAQScreen from '../screens/FAQScreen';

import useLinking from './useLinking';

import { restoreToken } from '../actions/restoreAction';
import { refresh_token } from '../actions/refreshAction';
import { restoreFBName } from '../actions/restoreFBNameAction';
import { connect } from 'react-redux';

import HeaderBackground from '../assets/images/header.png';

const Stack = createStackNavigator();

function MainNavigator(props) {
    const { restoreTokenResponse, restoreFBNameResponse, getLangResponse,refreshResponse } = props;
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);
    const { userToken, isLoading } = restoreTokenResponse;
    const { firstName, isFBLoading} = restoreFBNameResponse;
    const { refreshRes, token_loading, refresh_error } = refreshResponse;
    const { language } = getLangResponse;
    const [fontLoading, setFontLoading] = React.useState(false);
    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();
                // Load our initial navigation state
                await setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    'bpg-nino-mtavruli': require('../assets/fonts/bpg_nino_mtavruli_normal.ttf'),
                });
                setTimeout(()=>{
                    setFontLoading(true);
                }, 80)
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                // console.warn(e);
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    React.useEffect(() => {
        async function getFBName() {
            var firstName = await AsyncStorage.getItem('FirstName');
            var lastName = await AsyncStorage.getItem('LastName');
            props.restoreFBName(firstName, lastName);
        }
        getFBName();
    }, [firstName]);

    React.useEffect(() => {
        async function getToken() {
            let token = await AsyncStorage.getItem('userToken');
            props.restoreToken(token);
        }
        getToken();
    }, [userToken]);

    if ((isLoading || isFBLoading || !fontLoading ) && !props.skipLoadingScreen) {
        return null;
    } else 
    {
        SplashScreen.hide();
        let lang = parseInt(language);
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                    {
                        userToken !== null ?
                            <Stack.Navigator initialRouteName="Home">
                                <Stack.Screen name="Home" component={AppMainNavigator} options={{headerShown: false}}/>
                                <Stack.Screen
                                    name="myProfile"
                                    component={MyProfileScreen}
                                    options={{
                                        headerBackground: props => <ImageHeader {...props} />,
                                        headerTitle: Lang.menu[lang].myProfile,
                                        headerTintColor: 'white',
                                        headerTitleStyle: {
                                            fontFamily: 'bpg-nino-mtavruli',
                                            fontSize: 22,
                                        }
                                    }}/>
                                <Stack.Screen
                                    name="chat"
                                    component={ChatScreen}
                                    options={{
                                        headerBackground: props => <ImageHeader {...props} />,
                                        headerTitle: Lang.chat[lang].chat,
                                        headerTintColor: 'white',
                                        headerTitleStyle: {
                                            fontFamily: 'bpg-nino-mtavruli',
                                            fontSize: 22,
                                        }
                                    }}/>
                                <Stack.Screen
                                    name="faq"
                                    component={FAQScreen}
                                    options={{
                                        headerBackground: props => <ImageHeader {...props} />,
                                        headerTitle: Lang.faq[lang].faq,
                                        headerTintColor: 'white',
                                        headerTitleStyle: {
                                            fontFamily: 'bpg-nino-mtavruli',
                                            fontSize: 22,
                                        }
                                    }}/>
                            </Stack.Navigator> :
                            firstName !== null ?
                                <Stack.Navigator initialRouteName="Home">
                                    <Stack.Screen name="Home" component={GuestMainNavigator} options={{headerShown: false}}/>
                                    <Stack.Screen
                                        name="myProfile"
                                        component={MyProfileScreen}
                                        options={{
                                            headerBackground: props => <ImageHeader {...props} />,
                                            headerTitle: Lang.menu[lang].myProfile,
                                            headerTintColor: 'white',
                                            headerTitleStyle: {
                                                fontFamily: 'bpg-nino-mtavruli',
                                                fontSize: 22,
                                            }
                                        }}/>
                                    <Stack.Screen
                                        name="chat"
                                        component={ChatScreen}
                                        options={{
                                            headerBackground: props => <ImageHeader {...props} />,
                                            headerTitle: Lang.chat[lang].chat,
                                            headerTintColor: 'white',
                                            headerTitleStyle: {
                                                fontFamily: 'bpg-nino-mtavruli',
                                                fontSize: 22,
                                            }
                                        }}/>
                                    <Stack.Screen
                                        name="faq"
                                        component={FAQScreen}
                                        options={{
                                            headerBackground: props => <ImageHeader {...props} />,
                                            headerTitle: Lang.faq[lang].faq,
                                            headerTintColor: 'white',
                                            headerTitleStyle: {
                                                fontFamily: 'bpg-nino-mtavruli',
                                                fontSize: 22,
                                            }
                                        }}/>
                                </Stack.Navigator> :
                                <SignInNavigator />
                    }
                </NavigationContainer>
            </View>
        );
    }
}

const ImageHeader = props => {
    return(
        <Image
            style={{ width: '100%', height: '100%' }}
            source={HeaderBackground}
        />
    );
}

const mapStateToProps = state => {
    return {
        restoreTokenResponse: state.restoreTokenReducer,
        restoreFBNameResponse: state.restoreFBNameReducer,
        refreshResponse: state.refreshReducer,
        getLangResponse: state.getLangReducer,
    }
}

const mapDispatchToProps = {
    restoreToken,
    restoreFBName,
    refresh_token,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);