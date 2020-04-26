import * as React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/DrawerComponent/GuestCustomDrawer';
import DrawerButton from '../components/DrawerComponent/DrawerButton';

import BookingScreen from '../screens/BookingScreen';

import Colors from '../constants/Colors';
import Lang from '../constants/language';

import { getLang } from '../actions/getLangAction';
import { fbSignOut } from '../actions/restoreFBNameAction';
import { connect } from 'react-redux';

import BookingIcon from '../assets/images/booking.png';
import HeaderBackground from '../assets/images/header.png';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function appMainNavigator(props) {
    const { getLangResponse } = props;
    const { language, isLoading } = getLangResponse;

    React.useEffect(() => {
        const loadLanguage = async () => {
            let lang;
            lang = await AsyncStorage.getItem('Language');
            if(lang === null) {
                lang = '0';
                await AsyncStorage.setItem('Language', lang);
            }
            props.getLang(lang);
        }

        loadLanguage()
    }, []);
    
    if(isLoading) {
        return null;
    } else {
        let lang = parseInt(language);
        return (
            <Drawer.Navigator
                drawerContent={ myProps => <CustomDrawerContent {...myProps} childProps={props} /> }
                drawerStyle={{ backgroundColor: '#2f2e2e' }}
                overlayColor={'#000000aa'}
                initialRouteName="BookingStack"
                drawerContentOptions={{
                    activeTintColor: '#ffffff',
                    activeBackgroundColor: '#403f3f',
                    inactiveTintColor: '#ffffff',
                    labelStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                    }
                }}>
                <Drawer.Screen
                    name="BookingStack"
                    component={Booking}
                    options={{
                        drawerLabel: Lang.menu[lang].booking,
                        drawerIcon: ({ focused, color, size }) => <Image source={BookingIcon} style={{ width: 24, height: 24, tintColor: Colors.iconColor }} />
                    }}/>
            </Drawer.Navigator>
        );
    }
}

const mapStateToProps = state => {
    return {
        getLangResponse: state.getLangReducer,
        restoreFBNameResponse: state.restoreFBNameReducer,
    }
}

const mapDispatchToProps = {
    getLang,
    fbSignOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(appMainNavigator);

function BookingStack({ navigation, route, getLangResponse }) {
    const { language } = getLangResponse;
    let lang = parseInt(language);
    return (
        <Stack.Navigator initialRouteName="Booking">
            <Stack.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerLeft: () => {
                        return (
                            <DrawerButton navigationProps={navigation}/>
                        )
                    },
                    headerTitle: Lang.menu[lang].booking,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
        </Stack.Navigator>
    )
}
const Booking = connect(mapStateToProps, mapDispatchToProps)(BookingStack);
  
const ImageHeader = props => {
    return(
        <Image
            style={{ width: '100%', height: '100%' }}
            source={HeaderBackground}
        />
    );
}