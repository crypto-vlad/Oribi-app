import { StyleSheet, Dimensions } from "react-native";
import Colors from '../../constants/Colors';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    getStartedText: {
        fontSize: 17,
        color: '#000',
        marginTop: 30,
        lineHeight: 24,
        textAlign: 'center',
    },
    loginBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        width: width - 60,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    logo: {
        height: 100,
        width: 70
    },
    loginOwnerText: {
        color: '#777',
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli'
    },
    userNameStyle: {
        borderColor: '#dfdddd',
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        height: 40,
        backgroundColor:'#ffffff',
        color: '#000000',
        fontFamily: 'bpg-nino-mtavruli'
    },
    passwordStyle: {
        borderColor: '#dfdddd',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        height: 40,
        backgroundColor:'#ffffff',
        color: '#000000',
        fontFamily: 'bpg-nino-mtavruli'
    },
    loginButtton: {
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: Colors.iconColor,
        borderWidth: 1,
        borderColor: '#358454',
        width: '100%',
        height: 40,
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli'
    },
    loginGuestText: {
        color: '#777',
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli'
    },
    fbLoginButtton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#26488e',
        borderWidth: 1,
        borderColor: '#3a4b77',
        width: '100%',
        height: 40,
    },
    fbLoginText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 20,
        fontFamily: 'bpg-nino-mtavruli'
    },
    langSelView: {
        flexDirection: 'row',
        marginTop: 40,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    langView: {
        backgroundColor: '#ffffff44',
        padding: 10,
        marginHorizontal: 10,
    },
    langText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli'
    }
});
  