import * as React from 'react';
import { Text, View, TextInput, ActivityIndicator, TouchableOpacity, Keyboard } from 'react-native';
import Lang from '../../constants/language';
import styles from './styles';

import { change_pass, reset } from '../../actions/changePassAction';
import { connect } from 'react-redux';

function MyProfileScreen(props) {
    const { getLangResponse, changePassResponse, restoreTokenResponse, change_pass, reset } = props;
    const { language } = getLangResponse;
    const { changePassRes, loading } = changePassResponse;
    const { userToken } = restoreTokenResponse;

    const [currentPass, setCurrentPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [repeatedPass, setRepeatedPass] = React.useState('');

    React.useEffect(() => {
        const changePassCalled = async () => {
            if(changePassRes === null) {
                return;
            }

            if(changePassRes.code === 0) {
                alert(changePassRes.message);
                reset();
                setCurrentPass('');
                setNewPass('');
                setRepeatedPass('');
            } else {
                alert(changePassRes.message);
                reset();
            }
        }

        changePassCalled()
    }, [changePassRes])

    const onChangePass = () => {
        Keyboard.dismiss();
        if(currentPass.length === 0) {
            alert('Please enter your current password');
        } else if(newPass.length === 0) {
            alert('Please enter your new password');
        } else if(repeatedPass.length === 0) {
            alert('Please enter your password again')
        } else if(newPass !== repeatedPass) {
            alert('Password does not match')
        } else {
            change_pass(currentPass, newPass, repeatedPass, userToken);
        }
    }

    let lang = parseInt(language);
    return (
        <View style={styles.container}>
            <Text style={styles.accountText}>{Lang.profile[lang].account}</Text>
            <TextInput
                style={styles.passwordStyle}
                placeholder={Lang.profile[lang].currentPass}
                onChangeText={(text) => setCurrentPass(text)}
                value={currentPass}
                secureTextEntry/>
            <TextInput
                style={styles.passwordStyle}
                placeholder={Lang.profile[lang].newPass}
                onChangeText={(text) => setNewPass(text)}
                value={newPass}
                secureTextEntry/>
            <TextInput
                style={styles.passwordStyle}
                placeholder={Lang.profile[lang].repeatPass}
                onChangeText={(text) => setRepeatedPass(text)}
                value={repeatedPass}
                secureTextEntry/>
            <TouchableOpacity style={styles.changeButtton} onPress={onChangePass}>
                {
                    loading?
                        <ActivityIndicator color={'#fff'} /> :
                        <Text style={styles.submitText}>{Lang.profile[lang].changePass}</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        getLangResponse: state.getLangReducer,
        changePassResponse: state.changePassReducer,
        restoreTokenResponse: state.restoreTokenReducer,
    }
}

const mapDispatchToProps = {
    change_pass,
    reset
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);