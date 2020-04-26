import * as React from 'react';
import { Text, View, ImageBackground, SafeAreaView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,TouchableWithoutFeedback,
    AsyncStorage, ActivityIndicator, Keyboard, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import * as Facebook from 'expo-facebook';
import styles from './styles';
import Colors from '../../constants/Colors';
import Lang from '../../constants/language';
import { FacebookID } from '../../constants';
import BackgroundImage from '../../assets/images/background.png';
import Logo from '../../assets/images/logo.png';

import { login, reset } from '../../actions/loginAction';
import { restoreToken, signIn } from '../../actions/restoreAction';
import { restoreFBName, fbSignIn } from '../../actions/restoreFBNameAction';
import { get_user, reset_user } from '../../actions/getUserAction';
import { getLang } from '../../actions/getLangAction';
import { connect } from 'react-redux';

const height = Dimensions.get('window').height
const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 56;

let sec = 0;

function SignInScreen(props) {
    const { loginResponse, getLangResponse, getUserResponse } = props;
    const { language } = getLangResponse;
    const { loginRes, loading, error } = loginResponse;
    const { getUserRes, user_loading } = getUserResponse;

    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isFirstLoading, setIsFirstLoading] = React.useState(true);
    const controller = new AbortController();
    
    React.useEffect(() => {
        const loadLanguage = async () => {
            let lang;
            try {
                lang = await AsyncStorage.getItem('Language');
            } catch(e) {
                console.log(e);
            }
            if(lang === null) {
                try {
                    lang = '0';
                    await AsyncStorage.setItem('Language', lang);
                } catch(e) {
                    console.log(e);
                }
            }
            props.getLang(lang);
            setIsFirstLoading(false);
        }

        loadLanguage()
    }, [])

    React.useEffect(() => {
        const loginCalled = async () => {
            if(loginRes === null) {
                return;
            }
            if(loginRes.msg !== undefined) {
                props.reset();
            } 
            else {
                await AsyncStorage.setItem('userToken', loginRes.token);
                props.get_user(loginRes.token);
            }
        }
        if( error != null ){
            setTimeout(()=>{
                loginCalled();
                sec++;
            }, 8000);
            if( sec === 8 )
            {
                alert("Server error");
                props.reset();
                sec = 0;
                return;
            }
        }
        else
            loginCalled();
    }, [loginRes])

    React.useEffect(() => {
        const getUserCalled = async () => {
            if(getUserRes === null ) {
                return;
            }
            if(getUserRes.msg !== undefined) {
                alert(getUserRes.msg);
                await AsyncStorage.removeItem('userToken');
                props.reset();
                props.reset_user();
            } else {
                if( getUserRes.userInfo[0].username !== null )
                    await AsyncStorage.setItem('userName', getUserRes.userInfo[0].username);
                if( getUserRes.userInfo[0].mail !== null )
                    await AsyncStorage.setItem('mail', getUserRes.userInfo[0].mail);
                if( getUserRes.userInfo[0].fName !== null )
                    await AsyncStorage.setItem('fName', getUserRes.userInfo[0].fName);
                if( getUserRes.userInfo[0].lName !== null )
                    await AsyncStorage.setItem('lName', getUserRes.userInfo[0].lName);
                if( getUserRes.userInfo[0].fNameEng !== null )
                    await AsyncStorage.setItem('fNameEng', getUserRes.userInfo[0].fNameEng);
                if( getUserRes.userInfo[0].lNameEng !== null )
                    await AsyncStorage.setItem('lNameEng', getUserRes.userInfo[0].lNameEng);
                if( getUserRes.userInfo[0].phone !== null )
                    await AsyncStorage.setItem('phone', getUserRes.userInfo[0].phone);
                
                let userToken = await AsyncStorage.getItem('userToken');
                props.signIn(userToken);
                props.reset();
                props.reset_user();
            }
        }
        getUserCalled()
    }, [getUserRes])

    async function langSelect(lang) {
        try {
            await AsyncStorage.setItem('Language', lang);
            props.getLang(lang);
        } catch(e) {
            console.log(e);
        }
    }

    const onLogin = async () => {
        Keyboard.dismiss();
        if(userName.length === 0) {
            alert('Please enter Username');
        } else if(password.length === 0) {
            alert('Please enter Password');
        } else {
           await props.login(userName, password);
        }
    }

    const onFBLogin = async () => {
        try {
            await Facebook.initializeAsync(FacebookID);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=name,first_name,last_name&access_token=${token}`);
                const jsonRes = await response.json();
                const FirstName = jsonRes.first_name;
                const LastName = jsonRes.last_name;
                await AsyncStorage.setItem('FirstName', FirstName);
                await AsyncStorage.setItem('LastName', LastName);
                props.fbSignIn(FirstName, LastName);
            } else {
              // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    if(isFirstLoading && language !== null) {
        return null;
    } else {
        let lang = parseInt(language);
        return (
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
                    <KeyboardAvoidingView 
                      behavior={"padding"} ena keyboardVerticalOffset={keyboardVerticalOffset}>
                    <SafeAreaView >
                        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <View style={[styles.loginBox]}>
                                    <Image source={Logo} style={styles.logo}/>
                                    <Text style={styles.loginOwnerText}>{Lang.login[lang].login}</Text>
                                    <TextInput
                                        style={styles.userNameStyle}
                                        placeholder={Lang.login[lang].username}
                                        onChangeText={(text) => setUserName(text)}
                                        autoCapitalize='none'
                                        blurOnSubmit={true}
                                        value={userName}/>
                                    <TextInput
                                        style={styles.passwordStyle}
                                        placeholder={Lang.login[lang].password}
                                        onChangeText={(text) => setPassword(text)}
                                        value={password}
                                        blurOnSubmit={true}
                                        secureTextEntry/>
                                    <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:20, height: 40}}>
                                        {
                                        loading || user_loading?
                                        <ActivityIndicator color={Colors.iconColor} size = "small"/> :
                                        <TouchableOpacity style={styles.loginButtton} onPress={onLogin}>
                                            <Text style={styles.loginText}>{Lang.login[lang].login}</Text>
                                        </TouchableOpacity>
                                        }
                                    </View>

                                    <Text style={styles.loginGuestText}>{Lang.login[lang].loginGuest}</Text>
                                    <TouchableOpacity style={styles.fbLoginButtton} onPress={onFBLogin}>
                                        <Icon name={'facebook'} size={20} color={'white'} />
                                        <Text style={styles.fbLoginText}>{Lang.login[lang].loginFB}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.langSelView}>
                                    <TouchableOpacity style={styles.langView} onPress={() => langSelect('0')}>
                                        <Text style={styles.langText}>EN</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.langView} onPress={() => langSelect('1')}>
                                        <Text style={styles.langText}>RU</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.langView} onPress={() => langSelect('2')}>
                                        <Text style={styles.langText}>KA</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginResponse: state.loginReducer,
        restoreTokenResponse: state.restoreTokenReducer,
        getLangResponse: state.getLangReducer,
        getUserResponse: state.getUserReducer,
        restoreFBNameResponse: state.restoreFBNameReducer
    }
}

const mapDispatchToProps = {
    login,
    reset,
    restoreToken,
    signIn,
    restoreFBName,
    fbSignIn,
    getLang,
    get_user,
    reset_user
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
