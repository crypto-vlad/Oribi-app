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
import { get_servicehistory, reset_servicehistory } from '../../actions/getServiceHistoryAction';
import styles from './styles';

function ServiceHistoryScreen(props) {
  const { getServiceHistoryResponse, getLangResponse } = props;
  const { getServiceHistoryRes, loading, error } = getServiceHistoryResponse;
  const { language } = getLangResponse;
  const [serviceHistoryData, setServiceHistoryData] = React.useState([]);
  const apartmentId = props.route.params.apartmentId;

  React.useEffect(() => props.navigation.addListener('blur', ()=>{
    props.reset_servicehistory();
  }), []);
  
  React.useEffect(() => {
    const loadServiceHistory = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        props.get_servicehistory(userToken, apartmentId + '/');
    }
    loadServiceHistory()
  }, [])

  React.useEffect(() => {
    const getServiceHistoryCalled = () => {
        if(getServiceHistoryRes === null) {
            return;
        }
        if(getServiceHistoryRes.msg !== undefined ) {
            alert(getServiceHistoryRes.msg);
            props.reset_servicehistory();
        } else {
            setServiceHistoryData(getServiceHistoryRes.result);
        }
    }
    getServiceHistoryCalled()
    console.log(getServiceHistoryRes)
}, [getServiceHistoryRes])


  let lang = parseInt(language);
  if( loading )
    return <View style={{justifyContent:'center', alignItems:'center', flex:1}} color={Color.greentext}>
      <ActivityIndicator size={"large"} />
    </View>;
    
  return (
    <View style={styles.container}>
        <FlatList 
            data = {serviceHistoryData}
            keyExtractor = {(item, index)=>index.toString()}
            renderItem = {(item)=>_renderItem(item.item, lang, apartmentId)}
            initialNumToRender = {50}
            removeClippedSubviews = {true}
        />
    </View>
  );
}
const _renderItem=(item, lang, id)=>{
//    if( id !== item.apartment_id) return;

    let title = '';
    if( lang === 0) {title = item.service.En;}
    if( lang === 1) {title = item.service.Ge;}
    if( lang === 2) {title = item.service.Ru;}
    return (
        <View style={styles.itemCon}>
            <View style={styles.section1}>
                <Text style = {[styles.label1]}>{title}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.label2}>{Lang.ServiceHistory[lang].date}: </Text>
                <Text style={styles.label2}> {item.delivery_date}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.label2}>{Lang.ServiceHistory[lang].price}: </Text>
                <Text style={styles.label2}> {item.price} ₾</Text>
            </View>
        </View>
    )
}
const mapStateToProps = state => {
  return {
      getServiceHistoryResponse: state.getServiceHistoryReducer,
      getLangResponse: state.getLangReducer,
  }
}

const mapDispatchToProps = {
    get_servicehistory,
    reset_servicehistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceHistoryScreen);