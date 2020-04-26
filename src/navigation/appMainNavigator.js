import * as React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/DrawerComponent/CustomDrawer';
import DrawerButton from '../components/DrawerComponent/DrawerButton';

import DemoScreen from '../screens/DemoScreen';
import MyApartmentsScreen from '../screens/MyApartmentsScreen';
import FinanceScreen from '../screens/FinanceScreen';
import BookingScreen from '../screens/BookingScreen';
import FlatScreen from '../screens/FlatScreen';

import Colors from '../constants/Colors';
import Lang from '../constants/language';

import { getLang } from '../actions/getLangAction';
import { signOut } from '../actions/restoreAction';
import { connect } from 'react-redux';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MyAccountIcon from '../assets/images/myaccount.png';
import VisitorsIcon from '../assets/images/visitors.png';
import ServicesIcon from '../assets/images/services.png';
import BookingIcon from '../assets/images/booking.png';
import HeaderBackground from '../assets/images/header.png';
import AgreementDetailScreen from '../screens/AgreementDetail';
import ServiceHistoryScreen from '../screens/ServiceHistory';
import LockHistoryScreen from '../screens/UnlockHistory';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function appMainNavigator(props) {
    const { getLangResponse } = props;
    const { language, isLoading } = getLangResponse;
    const [bload, setLoad] = React.useState(false);

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
                drawerContent={ (myProps) => <CustomDrawerContent {...myProps} childProps={props} /> }
                drawerStyle={{ backgroundColor: '#2f2e2e' }}
                overlayColor={'#000000aa'}
                initialRouteName="MyApartmentsStack"
                drawerContentOptions={{
                    activeTintColor: '#ffffff',
                    activeBackgroundColor: '#403f3f',
                    inactiveTintColor: '#ffffff',
                    labelStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                    }
                }}>
                <Drawer.Screen
                    name="MyApartmentsStack"
                    component={MyAppartments}
                    options={{
                        drawerLabel: Lang.menu[lang].myApartments,
                        drawerIcon: ({ focused, color, size }) => <Image source={MyAccountIcon} style={{ width: 24, height: 24, tintColor: Colors.iconColor }} />
                    }}/>
                <Drawer.Screen
                    name="FinancesStack"
                    component={Finances}
                    options={{
                        drawerLabel: Lang.menu[lang].finances,
                        drawerIcon: ({ focused, color, size }) => <Icon color={Colors.iconColor} size={size} name={'finance'} />
                    }}/>
                <Drawer.Screen
                    name="VistorsStack"
                    component={Vistors}
                    options={{
                        drawerLabel: Lang.menu[lang].visitors,
                        drawerIcon: ({ focused, color, size }) => <Image source={VisitorsIcon} style={{ width: 24, height: 24, tintColor: Colors.iconColor }} />
                    }}/>
                <Drawer.Screen
                    name="ServicesStack"
                    component={Services}
                    options={{
                        drawerLabel: Lang.menu[lang].services,
                        drawerIcon: ({ focused, color, size }) => <Image source={ServicesIcon} style={{ width: 24, height: 24, tintColor: Colors.iconColor }} />
                    }}/>
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
        restoreTokenResponse: state.restoreTokenReducer,
    }
}

const mapDispatchToProps = {
    getLang,
    signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(appMainNavigator);

function MyAppartmentsStack({ navigation, route, getLangResponse }) {
    const { language } = getLangResponse;
    let lang = parseInt(language);
    return (
        <Stack.Navigator initialRouteName="MyAppartments">
            <Stack.Screen
                name="MyAppartments"
                component={MyApartmentsScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerLeft: () => {
                        return (
                            <DrawerButton navigationProps={navigation}/>
                        )
                    },
                    headerTitle: Lang.welcome[lang].welcome,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
            <Stack.Screen
                name="Flat"
                component={FlatScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerTitle: Lang.flat[lang].flat,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
            <Stack.Screen
                name="AgreementDetail"
                component={AgreementDetailScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerTitle: Lang.AgreementDetail[lang].title,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
            <Stack.Screen
                name="ServiceHistory"
                component={ServiceHistoryScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerTitle: Lang.ServiceHistory[lang].title,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
            <Stack.Screen
                name="LockHistory"
                component={LockHistoryScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerTitle: Lang.LockHistory[lang].title,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>

        </Stack.Navigator>
    )
}
const MyAppartments = connect(mapStateToProps, mapDispatchToProps)(MyAppartmentsStack);

function FinancesStack({ navigation, route, getLangResponse }) {
    
    const { language } = getLangResponse;
    let lang = parseInt(language);
    return (
        <Stack.Navigator initialRouteName="Finances">
            <Stack.Screen
                name="Finances"
                component={FinanceScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerLeft: () => {
                        return (
                            <DrawerButton navigationProps={navigation}/>
                        )
                    },
                    headerTitle: Lang.menu[lang].finances,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
            <Stack.Screen
                name="AgreementDetail"
                component={AgreementDetailScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerTitle: Lang.AgreementDetail[lang].title,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
        </Stack.Navigator>
    )
}
const Finances = connect(mapStateToProps, mapDispatchToProps)(FinancesStack);

function VistorsStack({ navigation, route, getLangResponse }) {
    const { language } = getLangResponse;
    let lang = parseInt(language);
    return (
        <Stack.Navigator initialRouteName="Vistors">
            <Stack.Screen
                name="Vistors"
                component={DemoScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerLeft: () => {
                        return (
                            <DrawerButton navigationProps={navigation}/>
                        )
                    },
                    headerTitle: Lang.menu[lang].visitors,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
        </Stack.Navigator>
    )
}
const Vistors = connect(mapStateToProps, mapDispatchToProps)(VistorsStack);

function ServicesStack({ navigation, route, getLangResponse }) {
    const { language } = getLangResponse;
    let lang = parseInt(language);
    return (
        <Stack.Navigator initialRouteName="Services">
            <Stack.Screen
                name="Services"
                component={DemoScreen}
                options={{
                    headerBackground: props => <ImageHeader {...props} />,
                    headerLeft: () => {
                        return (
                            <DrawerButton navigationProps={navigation}/>
                        )
                    },
                    headerTitle: Lang.menu[lang].services,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'bpg-nino-mtavruli',
                        fontSize: 22,
                    }
                }}/>
        </Stack.Navigator>
    )
}
const Services = connect(mapStateToProps, mapDispatchToProps)(ServicesStack);

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