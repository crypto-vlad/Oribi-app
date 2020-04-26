import { StyleSheet } from "react-native";
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    titleCon:
    {
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems : 'center',
    },
    topItem: {
        width:'100%'        ,
        height: 80,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight:20,
        borderBottomColor:Color.sepline,
        borderBottomWidth:1
    },
    topItem2:{
        width:'100%'        ,
        height: 80,
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight:20,
        borderBottomColor:Color.sepline,
        borderBottomWidth:1
    },
    secondSection:{
        backgroundColor:Color.back1,
        paddingTop:10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight:20,
        borderBottomColor:Color.sepline,
        borderBottomWidth:1
    },
    agreeHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight:20,
    },
    agreesection:{
        height:80,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight:20,
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
        borderBottomColor:Color.sepline,
        borderBottomWidth: 1,
    },
    btndetail:{
        width: 25,
        height: 25,
        justifyContent:'center',
        alignItems:'center'
    },
    label1: {
        fontSize: 22,
        fontWeight: '100',
        color: Color.greentext,
        fontFamily: 'bpg-nino-mtavruli'
    },
    label2: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: '100',
        fontFamily: 'bpg-nino-mtavruli'
    },
    label3: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: '100',
        color: Color.yellowtext,
        fontFamily: 'bpg-nino-mtavruli'
    },
    rightText:{
        fontSize: 32,
        fontWeight:'bold',
        color: Color.greentext,
        fontFamily:'bpg-nino-mtavruli'
    },

    bottomCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        width: '100%'
    },
    waterImg:{
        width:20,
        height: 20
    },
    elecImg:{
        width:80,
        height: 20
    },
    imgCon:{justifyContent:'center', alignItems:'center', width: 30,height:80},
    btnHistory:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height: 50,
        borderTopColor:Color.sepline,
        borderTopWidth:1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    btnUnlock:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height: 70,
        width:'100%',
        backgroundColor:Color.btnback
    },
    unlocktxt : {
        color:'white',
        marginLeft: 20,
        fontFamily:'bpg-nino-mtavruli',
        fontSize: 24,
        fontWeight:'bold'
    },
    sepLine:{
        width:'100%',
        height:2,
        backgroundColor:Color.sepline,
    }

});