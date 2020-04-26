import * as React from 'react';
import { 
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Platform,
} from 'react-native';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import Animated from 'react-native-reanimated';
import { DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import styles from '../styles';

import Colors from '../../../constants/Colors';
import Lang from '../../../constants/language';

import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import userImage from '../../../assets/images/placeholder.jpg';
import MyProfileIcon from '../../../assets/images/myprofile.png';
import LogOutIcon from '../../../assets/images/logout.png';
import HelpIcon from '../../../assets/images/help.png';


const{ width, height } = Dimensions.get('window');

export default function CustomDrawerContent(props) {
    const { progress, ...rest } = props;
    const { getLangResponse, getLang, signOut } = props.childProps;
    const { language, isLoading } = getLangResponse;
    const [name, setName] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        const updateName = async () => {
            if(language === '2') {
                let fName = await AsyncStorage.getItem('fName');
                let lName = await AsyncStorage.getItem('lName');
                if( fName !== null && lName !== null )
                    setName(fName + " " + lName);
                else
                    setName('fName' + " " + "lName");
            } else {
                let fName = await AsyncStorage.getItem('fNameEng');
                let lName = await AsyncStorage.getItem('lNameEng');
                if( fName !== null && lName !== null )
                    setName(fName + " " + lName);
                else
                    setName('fName' + " " + "lName");
            }
        }
        updateName();
    }, [getLangResponse])

    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    async function langSelect(lang) {
        try {
            await AsyncStorage.setItem('Language', lang);
            getLang(lang);
        } catch(e) {
            console.log(e);
        }
    }

    async function logOut() {
        props.navigation.closeDrawer();
        setTimeout(async function() {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userName');
            await AsyncStorage.removeItem('mail');
            await AsyncStorage.removeItem('fName');
            await AsyncStorage.removeItem('lName');
            await AsyncStorage.removeItem('fNameEng');
            await AsyncStorage.removeItem('lNameEng');
            await AsyncStorage.removeItem('phone');
            await AsyncStorage.removeItem('FirstName');
            await AsyncStorage.removeItem('LastName');
            signOut();
        }, 500)
    }

    const gotoMyProfile = () => {
        props.navigation.closeDrawer();
        const { navigate } = props.navigation;
        setTimeout(function() {
            navigate('myProfile');
        }, 500)
    }

    const gotoChat = () => {
        setModalVisible(false);
        props.navigation.closeDrawer();
        const { navigate } = props.navigation;
        setTimeout(function() {
            navigate('chat');
        }, 500)
    }

    const gotoFAQ = () => {
        setModalVisible(false);
        props.navigation.closeDrawer();
        const { navigate } = props.navigation;
        setTimeout(function() {
            navigate('faq');
        }, 500)
    }
  
    if(isLoading) {
        return null;
    } else {
        let lang = parseInt(language);
        return (
            <ScrollView contentContainerStyle={ styles.contentContainer }>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never', backgroundColor: '#2f2e2e' }}>
                    <View style={ styles.imageContainer }>
                        <Image source={ userImage } style={ styles.image } />
                        <Text style={ styles.nameText }>{name}</Text>
                        <TouchableOpacity style={styles.closeIconContainer} onPress={() => props.navigation.closeDrawer()}>
                            <FontAwesomeIcon name="close" size={32} color={'#959090'} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ backgroundColor: '#2f2e2e', height: Platform.OS === 'ios' ? height - 295 : height - 310  }} >
                        <Animated.View style={{ transform: [{ translateX }] }}>
                            <DrawerItemList {...rest } />
                        </Animated.View>
                        <Animated.View style={[{marginTop: 50, transform: [{ translateX }] }]}>
                            <DrawerItem 
                                label={Lang.menu[lang].myProfile}
                                activeTintColor={"#ffffff"}
                                activeBackgroundColor={'#403f3f'}
                                inactiveTintColor={'#ffffff'}
                                labelStyle={{ fontFamily: 'bpg-nino-mtavruli' }}
                                onPress={gotoMyProfile}
                                icon={({ focused, color, size }) => <Image source={MyProfileIcon} style={{ width: 22, height: 24, tintColor: Colors.iconColor }} />}/>
                            <DrawerItem
                                label={Lang.menu[lang].logout}
                                activeTintColor={"#ffffff"}
                                activeBackgroundColor={'#403f3f'}
                                inactiveTintColor={'#ffffff'}
                                labelStyle={{ fontFamily: 'bpg-nino-mtavruli' }}
                                onPress={() => logOut()}
                                icon={({ focused, color, size }) => <Image source={LogOutIcon} style={{ width: 22, height: 24, tintColor: Colors.iconColor }} />}/>
                        </Animated.View>
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={{backgroundColor: '#212020'}}>
                    <View style={{ backgroundColor: '#2f2e2e' }}>
                        <TouchableOpacity style={styles.extraMenuContainer} onPress={() => setModalVisible(true)}>
                            <Image source={HelpIcon} style={{ width: 30, height: 30, tintColor: Colors.color2 }} />
                            <Text style={styles.extraMenuText}>{Lang.menu[lang].help}</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={ [styles.languageContainer, { transform: [{ translateX }] }] }>
                        <TouchableOpacity style={ styles.langTextContainer } onPress={() => langSelect('0')}>
                            <Text style={styles.langText}>EN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.langTextContainer } onPress={() => langSelect('1')}>
                            <Text style={styles.langText}>RU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.langTextContainer } onPress={() => langSelect('2')}>
                            <Text style={styles.langText}>KA</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </SafeAreaView>
                <Modal
                    onTouchOutside={() => setModalVisible(false)}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    swipeDirection={['up', 'down']}
                    swipeThreshold={200}
                    visible={modalVisible}>
                    <ModalContent>
                        <TouchableOpacity style={styles.modalButtonStyle} onPress={gotoChat}>
                            <Text style={styles.modalButtonText}>{Lang.menu[lang].chat}</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.modalButtonStyle} onPress={gotoFAQ}>
                            <Text style={styles.modalButtonText}>{Lang.menu[lang].faq}</Text>
                        </TouchableOpacity>
                    </ModalContent>
                </Modal>
            </ScrollView>
        );
    }
}