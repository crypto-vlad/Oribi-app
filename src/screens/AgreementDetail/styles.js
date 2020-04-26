import { StyleSheet } from "react-native";
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    itemCon:{
        padding: 20,
        borderBottomColor:Color.sepline,
        borderBottomWidth:1
    },
    section1:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    label1: {
        fontSize: 22,
        fontWeight: '100',
        fontFamily: 'bpg-nino-mtavruli'
    },
    label2: {
        marginTop: 5,
        color:Color.maintext,
        fontSize: 18,
        fontWeight: '100',
        fontFamily: 'bpg-nino-mtavruli'
    },
    balancetxt:{
        fontSize:40,
        fontWeight:'500',
        fontFamily:'bpg-nino-mtavruli'
    }
});