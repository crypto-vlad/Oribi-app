import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, SafeAreaView, KeyboardAvoidingView, ToastAndroid, Platform,AsyncStorage } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

import {create_chat_room, send_msg, receive_msg, reset_messge } from '../../actions/getChatAction';
import axios from 'axios';

import styles from './styles';
import Color from '../../constants/Colors';
import Lang from '../../constants/language';

import ChatBackground from '../../assets/images/chat_background.png';

import { connect } from 'react-redux';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 56;

import { SEND_MESSAGE_DATA, RECEIVE_MESSAGE_DATA } from '../../constants/index';

function ChatScreen(props) {
    const { getLangResponse, getUserResponse, getChatResponse } = props;
    const { getUserRes, user_loading, reset_user } = getUserResponse;
    const { language } = getLangResponse;
    const { createRoomRes, sendMsgRes, receiveMsgRes, loading, error} = getChatResponse;

    const [chatHistory, setChatHistory] = React.useState([]);
    const [newMsg, setNewMsg] = React.useState('');
    const [chatId, setChatId] = React.useState(0);
    const [chatToken, setChatToken] = React.useState('');
    const [supportName, setSupportName] = React.useState('');
    const [beditable, setEditable] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [cusFName, setFName] = React.useState('');
    const [cusLName, setLName] = React.useState('');
    const [cusId, setId] = React.useState(0);
    const platform = Platform.OS === "ios" ? 2 : 1;
    let timer = null;

    const lang = parseInt(language);
    let sendLang = 1;
    if( lang === 0 ) sendLang = 3;
    if( lang === 1 ) sendLang = 2;


    React.useEffect(() => props.navigation.addListener('blur', ()=>{
        props.reset_messge();
    }), []);
    React.useEffect(()=>{
        const getUser = async () =>{
            if( getUserRes === null )
            {
                let cusF = await AsyncStorage.getItem('FirstName');
                let cusL = await AsyncStorage.getItem('LastName');
                setUserName(cusF + " " + cusL);
                setFName(cusF);
                setLName(cusL)
            }
            else{
                let user = getUserRes.userInfo[0].username;
                let id = getUserRes.userInfo[0].id;
                let cusF = getUserRes.userInfo[0].fNameEng;
                let cusL = getUserRes.userInfo[0].lNameEng;
                setUserName(user);
                setFName(cusF);
                setLName(cusL);
                setId(id);
            }
        }
        getUser();            
    }, [])

    React.useEffect(()=>{
        const createChatRoom = async () => {
            props.create_chat_room(sendLang, cusId, cusFName, cusLName, platform);
        }
        createChatRoom();
    }, [])

    React.useEffect(() => {
        const getCreateRoomRes = () => {
            if( createRoomRes === null )
                return ;
            if( createRoomRes.code === 0 ){
                setChatId(createRoomRes.chatId);
                setChatToken(createRoomRes.chatToken);
                setEditable(true);
            }
        }
        getCreateRoomRes()
    }, [createRoomRes])

    React.useEffect(()=>{
        const receiveMsgCalled = async () => {
            await receiveMsg();
        }
        timer = setInterval(()=>{
            receiveMsgCalled();
        }, 10000);
        return () => {
            clearInterval(timer);
        };
    }, [chatHistory])

    const receiveMsg = async () => {
        axios.get(RECEIVE_MESSAGE_DATA + `${chatId}/?chatToken=${chatToken}`)
        .then(res => {
            let receiveRes = res.data;
            if( receiveRes === null ) {
                return;
            }
            if( receiveRes.code === -1 ){
                return;
            }
            if( receiveRes.supportSeen === 0 ){
                setSupportName('');
            }
            if( receiveRes.supportSeen === 1 )
                setSupportName(receiveRes.SupportName);
    
            let receive =  receiveRes.result.reverse();
            setChatHistory(receive);
        }).catch(err => console.log(err));
    }

    const sendMsg = async() => {
        if(newMsg.length !== 0) {
            var message = newMsg;
            setNewMsg('');
            axios.post(SEND_MESSAGE_DATA, {
                "chatId":chatId,
                "guestId":cusId,
                "message":message,
                "chatToken": chatToken,
            })
            .then(res => {
                let sendRes = res.data;
                if( sendRes === null )
                    return ;
                if (sendRes.code === 0 )     
                    receiveMsg();
                if( sendRes.code === -1 ){
                    return;
                }
            }).catch(err => console.log(err));
        }
    }

    const _renderChatItem = ({item}) =>{
        let year = item.created_at.split(' ')[0];
        let time = item.created_at.split(' ')[1];
        let d = new Date(parseInt(year.split('-')[0]), parseInt(year.split('-')[1])-1, parseInt(year.split('-')[2]),
                    parseInt(time.split(':')[0]), parseInt(time.split(':')[1]), parseInt(time.split(':')[2]));
        var date = new Date();
        var msDiff = date.getTime() - d.getTime();    //Future date - current date
        var dif = Math.floor(msDiff / (1000 ));

        if( dif < 60 )
            time = "1 minute ago"

        if(item.supportId) 
            return(
                <View style={styles.chatMainContainer}>
                    <View style={styles.chatContainer}>
                        <View style={styles.userSection}>
                            <View style={styles.userNameSection}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.userNameText}>{supportName}</Text>
                                    {item.created_at.length > 0 && (<Text style={styles.dateText}> ( {time} ) </Text>)}
                                </View>
                                <Text style={styles.chatContent}>{item.message}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
            else
            return(
                <View style={styles.chatMeMainContainer}>
                    <View style={styles.chatContainer}>
                        <View style={[styles.userMeSection]}>
                            <View style={styles.myNameSection}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.myNameText}>Me</Text>
                                    {item.created_at.length > 0 && (<Text style={styles.mydateText}> ( {time} ) </Text>)}
                                </View>
                                <Text style={styles.myChatContent}>{item.message}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )

    } 
    if( !beditable )
        return null;
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={ChatBackground} style={styles.mainContainer}>
                <FlatList
                    data={chatHistory}
                    renderItem={_renderChatItem}
                    contentContainerStyle={styles.contactList}
                    inverted
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={styles.footer }>
                        <TextInput
                            value={newMsg}
                            onChangeText={(text) => setNewMsg(text)}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder={Lang.chat[lang].inputText + '...'}
                            placeholderTextColor={'#999'}
                            multiline={true}
                            editable={beditable}
                        />
                        <TouchableOpacity style={styles.sendIcon} onPress={sendMsg}>
                            <Icon name={'send'} size={24} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
    return {
        getUserResponse : state.getUserReducer,
        getChatResponse: state.getChatReducer,
        getLangResponse: state.getLangReducer,
    }
}

const mapDispatchToProps = {
    create_chat_room,
    send_msg,
    receive_msg,
    reset_messge,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
