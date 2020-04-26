import { StyleSheet, Dimensions } from "react-native";
import Colors from '../../constants/Colors';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    accountText: {
        marginTop: 20,
        marginLeft: 30,
        marginBottom: 10,
        fontSize: 20,
        color: 'black',
        alignSelf: 'flex-start',
        fontFamily: 'bpg-nino-mtavruli'
    },
    passwordStyle: {
        borderColor: '#dfdddd',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: width - 60,
        height: 40,
        backgroundColor:'#ffffff',
        color: '#000000',
        fontFamily: 'bpg-nino-mtavruli'
    },
    changeButtton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: Colors.iconColor,
        borderWidth: 1,
        borderColor: '#358454',
        width: width - 60,
        height: 40,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli'
    },
});