import { StyleSheet } from "react-native";
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    titleTextContainer: {
        height: 50,
        backgroundColor:'white',
        padding: 20,
        justifyContent:'center',
        shadowColor: 'rgba(0, 0, 0, 0.27)', 
        shadowOffset: {width: 3, height: 2},
        elevation:3, 
    },
    headerText: {
        fontSize: 22,
        color: Color.iconColor,
        fontWeight: '100',
        fontFamily: 'bpg-nino-mtavruli'
    },
    detailContainer : {
        flexDirection: 'row',
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom:10,
        alignItems : 'center',
        justifyContent:'space-between',
        flexDirection:'row',
        borderBottomColor:'#999',
        borderBottomWidth: 1,
    },
    btndetail:{
        width: 25,
        height: 25,
        justifyContent:'center',
        alignItems:'center'
    },
    label: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'bpg-nino-mtavruli'
    },
    value: {
        fontSize: 16,
        color: Color.detailtext,
        fontFamily:'bpg-nino-mtavruli'
    },
    value1: {
        marginTop: 2,
        marginBottom: 2,
        fontSize: 16,
        color: 'black',
        fontFamily:'bpg-nino-mtavruli'
    }
});