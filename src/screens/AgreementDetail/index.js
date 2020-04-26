import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import Lang from '../../constants/language';
import Color from '../../constants/Colors';
import { get_agreedetail, reset_agreedetail } from '../../actions/getAgreementDetailAction';
import styles from './styles';

function AgreementDetailScreen(props) {
    const { getAgreeDetailResponse, getLangResponse } = props;
    const { getAgreeDetailRes, loading, error } = getAgreeDetailResponse;
    const { language } = getLangResponse;
    const [agreeDetailData, setAgreeDetailData] = React.useState([]);
    const agreeId = props.route.params.agreeId;
    const objid = props.route.params.objId;

    React.useEffect(() => props.navigation.addListener('blur', ()=>{
        props.reset_agreedetail();
    }), []);

    React.useEffect(() => {
        const loadAgreeDetail = async () => {
            if(getAgreeDetailRes === null) {
                let userToken = await AsyncStorage.getItem('userToken');
                props.get_agreedetail(userToken, objid + '/');
            }
        }
        loadAgreeDetail()
    }, [])

    React.useEffect(() => {
        const getAgreeDetailCalled = () => {
                if(getAgreeDetailRes === null) {
                    return;
                }
                if(getAgreeDetailRes.message !== undefined) {
                    alert(getAgreeDetailRes.message);
                    props.reset_agreedetail();
                } else {
                    console.log(getAgreeDetailRes)
                    let agreeData = getAgreeDetailRes.agreement[0].financialStats;
                    setAgreeDetailData(agreeData);
            }
        }
        getAgreeDetailCalled()
    }, [getAgreeDetailRes]);

    let lang = parseInt(language);
    if( loading )
    return <View style={{justifyContent:'center', alignItems:'center', flex:1}} color={Color.greentext}>
        <ActivityIndicator size={"large"} />
        </View>;
    return (
        <View style={styles.container}>
            <FlatList
                data = {agreeDetailData}
                initialNumToRender = {50}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {(item) => _renderItem(item.item, lang)}
                removeClippedSubviews = {true}
            />
        </View>
    );
}

const _renderItem=(item, lang)=>{
    let eventId = item.eventId;
    let title = '';
    let color = Color.greentext;
    if( eventId === 1) {title = Lang.AgreementDetail[lang].accrual; color = Color.redtext;}
    if( eventId === 2) {title = Lang.AgreementDetail[lang].payment;}
    if( eventId === 5) {title = Lang.AgreementDetail[lang].accrualcorrection; color = Color.redtext;}
    if( eventId === 6) {title = Lang.AgreementDetail[lang].paymentcorrection;}
    if( eventId === 9) {title = Lang.AgreementDetail[lang].discount;}
    let date = item.eventDate.split('T');
    return (
        <View style={styles.itemCon}>
            <View style={styles.section1}>
                <Text style = {[styles.label1, {color:color}]}>{title}</Text>
                <Text style = {[styles.label1, {color:color}]}>{Lang.AgreementDetail[lang].balance}</Text>
            </View>
            <View style={styles.section1}>
                <View >
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.label2}>{Lang.AgreementDetail[lang].date}: </Text>
                        <Text style={styles.label2}>{date[0]}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.label2}>{Lang.AgreementDetail[lang].amount}: </Text>
                        <Text style={styles.label2}>{item.amount}</Text>
                    </View>
                </View>
                <Text style={[styles.balancetxt, {color:color}]}>{item.balance}</Text>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
  return {
      getAgreeDetailResponse: state.getAgreeDetailReducer,
      getLangResponse: state.getLangReducer,
  }
}

const mapDispatchToProps = {
    get_agreedetail,
    reset_agreedetail

}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementDetailScreen)
