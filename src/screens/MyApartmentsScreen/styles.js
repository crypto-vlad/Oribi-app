import { StyleSheet, Dimensions } from "react-native";
import Colors from '../../constants/Colors';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    balanceBackground: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    accrualpaymentContainer: {
        width:'100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    incomeContainer: {
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.sepline,
        borderBottomWidth: 1,
        marginTop: 5
    },
    balanceTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'50%',
        paddingTop:10,
        paddingBottom:10
    },
    balanceTextContainer1: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'50%',
        borderRightColor: Colors.sepline,
        borderRightWidth:1,
        paddingTop:10,
        paddingBottom:10
    },
    balanceNameText: {
        fontSize: 20,
        color: '#737473',
        fontFamily: 'bpg-nino-mtavruli'
    },
    accrualText: {
        color: Colors.color1,
        fontSize: 30,
        fontWeight: '900',
        marginTop: 5,
        fontFamily: 'bpg-nino-mtavruli'
    },
    paymentsText: {
        color: Colors.color2,
        fontSize: 30,
        fontWeight: '900',
        marginTop: 5,
        fontFamily: 'bpg-nino-mtavruli'
    },
    incomeText: {
        color: Colors.iconColor,
        fontSize: 40,
        fontWeight: '900',
        marginTop: 5,
        fontFamily: 'bpg-nino-mtavruli',
    },
    bonusContainer:  {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 85,
        width: '100%',
    },
    bonusNameText: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'bpg-nino-mtavruli'
    },
    bonusText: {
        color: "#e5ca75",
        fontSize: 75,
        marginTop:17,
        marginLeft: 10,
        marginRight:20,
        fontFamily: 'bpg-nino-mtavruli'
    },
    bonusCon:{
        height:85,
        flexDirection:'row',
        alignItems:'center'
    },
    coin:{
        marginTop:3,
        width: 40,
        height:40,
    },
    bonusIcon: {
        width: 75,
        height: 75,
        marginLeft:5
    },
    divider: {
        width: width,
        height: 1,
        backgroundColor: '#dbdbdb',
    },
    myApartmentTextContainer: {
        padding: 20,
        width: width,
        backgroundColor: '#f5f3f3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    myApartmentText: {
        color: '#333',
        fontSize: 24,
        fontFamily: 'bpg-nino-mtavruli'
    },
    apartmentContainer: {
        flex: 1,
        width: width,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    data1Container: {
        flex: 1,
        alignItems: 'flex-start'
    },
    data2Container: {
        flex: 1,
        alignItems: 'flex-end',
    },
    firstLineText: {
        color: '#757775',
        fontSize: 18,
        fontFamily: 'bpg-nino-mtavruli'
    },
    secondLineText: {
        color: '#757775',
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'bpg-nino-mtavruli'
    }
});