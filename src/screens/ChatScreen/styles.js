import { StyleSheet } from 'react-native';
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9e9e9'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#d2d2d2'
    },
    initialText: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'bpg-nino-mtavruli'
    },
    initialTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactList: {
        width: '100%',
        paddingTop: 10,
    },
    divider: {
        backgroundColor: '#777'
    },
    chatMainContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    chatMeMainContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    chatContainer: {
        width: '65%',
    },
    userSection: {
        flex: -1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingLeft: 5,
        paddingBottom: 15,
        paddingRight: 5,
        paddingTop: 5,
        backgroundColor: 'white',
    },
    userMeSection: {
        flex: -1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingLeft: 5,
        paddingBottom: 15,
        paddingRight: 5,
        paddingTop: 5,
        backgroundColor:Color.iconColor
    },
    userNameSection: {
        justifyContent:'center',
        alignContent: 'center',
        marginLeft: 8,
        marginRight: 8,
    },
    myNameSection: {
        justifyContent:'center',
        alignContent: 'center',
        marginLeft: 8,
        marginRight: 8,
    },
    userNameText: {
        color: '#333',
        fontSize: 12,
        fontFamily: 'bpg-nino-mtavruli'
    },
    myNameText: {
        textAlign: 'left',
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'bpg-nino-mtavruli'
    },
    dateContainer: {
        position: 'absolute',
        right: 10,
        top: 40,
    },
    dateText: {
        color: '#999',
        fontSize: 12,
        marginLeft: 10,
        fontFamily: 'bpg-nino-mtavruli'
    },
    mydateText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'bpg-nino-mtavruli'
    },
    chatContent: {
        color: Color.iconColor,
        fontSize: 15,
        fontFamily: 'bpg-nino-mtavruli'
    },
    myChatContent: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'bpg-nino-mtavruli'
    },
    footer: {
        
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#e9e9e9',
        padding:10,
    },
    input: {
        flex: 1,
        color: '#333',
        fontSize: 20,
        textAlign: 'left',
        padding: 10,
        fontFamily: 'bpg-nino-mtavruli'
    },
    sendIcon: {
        marginLeft: 5,
        marginRight: 8,
        width: 40,
        height: 40,
        paddingRight: 2,
        borderRadius: 20,
        backgroundColor: Color.iconColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
});