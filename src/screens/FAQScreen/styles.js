import { StyleSheet } from "react-native";
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#e9e9e9",
        padding: 10,
    },
    headerText: {
        flex: 1,
        fontSize: 22,
        color: Color.iconColor,
        fontFamily: 'bpg-nino-mtavruli'
    },
    content: {
        padding: 20,
        backgroundColor: '#d7d7d7',
        fontFamily: 'bpg-nino-mtavruli'
    },
    contentText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'bpg-nino-mtavruli'
    }
});