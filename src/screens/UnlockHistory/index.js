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
import { get_lockhistory, reset_lockhistory } from '../../actions/getUnlockHistoryAction';
import styles from './styles';

function UnlockHistoryScreen(props) {
    const { getLockHistoryResponse, getLangResponse, getFlatResponse } = props;
    const { getLockHistoryRes, loading, error } = getLockHistoryResponse;
    const { language } = getLangResponse;
    const [unlockHistoryData, setUnlockHistoryData] = React.useState([]);
    const apartmentId = props.route.params.apartmentId;
    const apartName = props.route.params.name;
    const roomNum = props.route.params.roomNum

    React.useEffect(() => props.navigation.addListener('blur', ()=>{
        props.reset_lockhistory();
      }), []);

    React.useEffect(() => {
    const loadUnlockHistory = async () => {
       let userToken = await AsyncStorage.getItem('userToken');
       props.get_lockhistory(userToken, apartmentId);
    }
    loadUnlockHistory()
  }, [])

  React.useEffect(() => {
    const getUnlockHistoryCalled = () => {
        if(getLockHistoryRes === null) {
            return;
        }
        if(getLockHistoryRes.msg !== undefined) {
            props.reset_lockhistory();
        } else {
            setUnlockHistoryData(getLockHistoryRes.result);
        }
    }
    getUnlockHistoryCalled()
}, [getLockHistoryRes])

let lang = parseInt(language);
const _renderItem=(item)=>{
    return (
        <View style={styles.itemCon}>
            <Text style = {[styles.label1]}>{apartName.toUpperCase()}</Text>
            <Text style={styles.label2}>{roomNum}</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.label2}>{Lang.LockHistory[lang].date}: </Text>
                <Text style={styles.label2}>{item.lockDate}</Text>
            </View>
        </View>
    )
}
  if( loading )
    return <View style={{justifyContent:'center', alignItems:'center', flex:1}} color={Color.greentext}>
            <ActivityIndicator size={"large"} />
        </View>;
    return (
    <View style={styles.container}>
        <FlatList 
            data = {unlockHistoryData}
            keyExtractor = {(item, index)=>index.toString()}
            renderItem = {(item)=>_renderItem(item.item)}
            numColumns = {1}
            initialNumToRender = {50}
            removeClippedSubviews = {true}
        />
    </View>
  );
}

const mapStateToProps = state => {
  return {
      getFlatResponse: state.getFlatReducer,
      getLockHistoryResponse: state.getLockHistoryReducer,
      getLangResponse: state.getLangReducer,
  }
}

const mapDispatchToProps = {
    get_lockhistory,
    reset_lockhistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockHistoryScreen);