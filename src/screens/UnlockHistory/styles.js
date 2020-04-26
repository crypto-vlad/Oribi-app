import { StyleSheet } from "react-native";
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    itemCon:{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor:Color.sepline,
        borderBottomWidth:1
    },
    label1: {
        fontSize: 20,
        color: Color.greentext,
        fontWeight: '500',
        fontFamily: 'bpg-nino-mtavruli'
    },
    label2: {
        marginTop: 3,
        fontSize: 18,
        color:Color.maintext,
        fontWeight: '100',
        fontFamily: 'bpg-nino-mtavruli'
    },
});