import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
    imageContainer: {
        marginTop: Platform.OS === 'ios' ? 0 : 25,
        height: 150,
        backgroundColor: '#3e3d3d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: Platform.OS === 'ios' ? 30 : 240,
        borderColor: Platform.OS === 'ios' ? '#82828244' : '#ffffff00',
        borderWidth: Platform.OS === 'ios' ? 2 : 0,
        resizeMode: 'contain'
    },
    nameText: {
        color: '#55a564',
        marginTop: 30,
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    langTextContainer: {
        padding: 10,
        marginHorizontal: 20,
    },
    langText: {
        color: Colors.iconColor,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'bpg-nino-mtavruli',
    },
    extraMenuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 20,
        borderColor: Colors.color2,
        borderWidth: 2,
        borderRadius: 30,
    },
    extraMenuText: {
        color: Colors.color2,
        fontSize: 16,
        marginLeft: 28,
        fontFamily: 'bpg-nino-mtavruli',
    },
    drawerbtn: {
        marginLeft: 16,
    },
    modalButtonStyle: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        backgroundColor: 'gray',
        width: '100%',
        height: 1
    },
    modalButtonText: {
        fontSize: 14,
        fontFamily: 'bpg-nino-mtavruli',
    }
});

