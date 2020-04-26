import * as React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import Lang from '../../constants/language';
import { get_finance, reset_finance } from '../../actions/getFinanceAction';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RArrowImg from '../../assets/images/arrow.png';

function FinanceScreen(props) {
  const { getFinanceResponse, getLangResponse } = props;
  const { getFinanceRes, loading, error } = getFinanceResponse;
  const { language } = getLangResponse;
  const [agreeData, setAgreeData] = React.useState([]);

  React.useEffect(() => {
    const loadFinance = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        props.get_finance(userToken);
    }
    loadFinance()
  }, [])

  React.useEffect(() => {
    const getFinanceCalled = () => {
        if(getFinanceRes === null) {
            return;
        }

        if(getFinanceRes.msg !== undefined) {
            alert(getFinanceRes.msg);
            props.reset_finance();
        } else {
          setAgreeData(getFinanceRes.agreements);
        }
    }
    getFinanceCalled()
}, [getFinanceRes])

  const gotoDetail=(item)=>{
    props.navigation.navigate('AgreementDetail', {objId:item.id, agreeId:item.details.agreement_id});
  }

  let lang = parseInt(language);

  if( loading )
    return null;
  return (
    <View style={styles.container}>
      <View style={styles.titleTextContainer }>
        <Text style={styles.headerText}>{Lang.finance[lang].agreements}</Text>
      </View>
      <FlatList
        data = {agreeData}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {({item}) => {
          return <TouchableOpacity style = {styles.content} onPress = {()=>gotoDetail(item)}>
            <View >
              <View style = {styles.detailContainer}>
                <Text style = {styles.label}>{Lang.finance[lang].agreement}</Text>
                <Text style = {styles.value1}>{item.id}</Text>
              </View>
              <View style = {styles.detailContainer}>
                <Text style = {[styles.label, {marginTop:2}]}>{Lang.finance[lang].date}</Text>
                <Text style = {styles.value1}>{item.signDate}</Text>
              </View>
              <View style = {styles.detailContainer}>
                <Text style = {[styles.label, {marginTop:2}]}>{Lang.finance[lang].balance}</Text>
                <Text style = {[styles.value,  {marginTop:3}]}>{item.comBalance}</Text>
              </View>
            </View>
            <View style={styles.btndetail} >
              <Image source={RArrowImg} style={{width:21, height:22}}></Image>
            </View>
          </TouchableOpacity>
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
      getFinanceResponse: state.getFinanceReducer,
      getLangResponse: state.getLangReducer,
  }
}

const mapDispatchToProps = {
    get_finance,
    reset_finance,
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceScreen);
