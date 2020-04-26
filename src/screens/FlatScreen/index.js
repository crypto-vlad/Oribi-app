import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Platform,
  Linking,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';

import Lang from '../../constants/language';
import Color from '../../constants/Colors';

import { get_flat, reset_flat } from '../../actions/getFlatAction';

import styles from './styles';

import elecMarkImg from '../../assets/images/energopro.png';
import waterMarkImg from '../../assets/images/water.png';
import RArrowImg from '../../assets/images/arrow.png';
import KeyImg from '../../assets/images/key.png';

function FlatScreen(props) {
  const { getFlatResponse, getLangResponse } = props;
  const { getFlatRes, loading, error } = getFlatResponse;
  const { language } = getLangResponse;
  const [flatData, setFlatData] = React.useState({});
  const [powerAmount, setPowerAmount] = React.useState('0');
  const [waterAmount, setWaterAmount] = React.useState('0');
  const [name, setName] = React.useState('');
  const [bUnlock, setUnlock] = React.useState(true);
  const apartname = props.route.params.apartname;
  const blockName = props.route.params.blockName;
  const floor = props.route.params.floor;
  const flat = props.route.params.flat;
  const cadastre = props.route.params.cadastre;

  React.useEffect(() => props.navigation.addListener('blur', ()=>{
    props.reset_flat();
  }), []);

  React.useEffect(() => {
    const loadFlat = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let id = props.route.params.id + '/';
        props.get_flat(userToken, id);
    }
    loadFlat()
  }, [])

  React.useEffect(() => {
    const getFlatCalled = () => {
        if(getFlatRes === null) {
            return;
        }
        if(getFlatRes.msg !== undefined) {
            alert(getFlatRes.msg);
            props.reset_flat();
        } else {
            let agreeData = getFlatRes.flat[0].agreements;
            if( agreeData.length > 0)
            {
              let finacialStats = agreeData[agreeData.length - 1].financialStats;

              if( finacialStats.length > 0 )
              {
                setPowerAmount(finacialStats[finacialStats.length - 1].powerAmount.toString());
                setWaterAmount(finacialStats[finacialStats.length - 1].waterAmount.toString());
              }
              setFlatData(getFlatRes.flat[0]);
              setUnlock(getFlatRes.flat[0].canOpenDoor);
            }
        }
    }
    getFlatCalled()
}, [getFlatRes])

React.useEffect(() => {
  const getName = async () => {
      if(language === '2') {
          let fName = await AsyncStorage.getItem('fName');
          let lName = await AsyncStorage.getItem('lName');
          setName(fName + " " + lName);
      } else {
          let fName = await AsyncStorage.getItem('fNameEng');
          let lName = await AsyncStorage.getItem('lNameEng');
          setName(fName + " " + lName);
      }
  }
  getName();
}, [getLangResponse])

  let lang = parseInt(language);
  const _renderItem=(item)=>{
      return <TouchableOpacity style={styles.agreesection} onPress={()=>props.navigation.navigate('AgreementDetail', {objId:item.item.id, agreeId:props.route.params.id  })}>
          <View style={{justifyContent:'center'}}>
            <Text style={styles.label2}>{Lang.flat[lang].agreement}  # {item.item.id}</Text>
            <Text style = {styles.label2}>{Lang.flat[lang].date}  {item.item.accountDate}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style = {styles.label2}>{Lang.flat[lang].balance}</Text>
              <Text style = {styles.label3}>  {item.item.comBalance}</Text>
            </View>
          </View>
          <View style={styles.imgCon} >
            <Image style={{width:21, height:22}} source={RArrowImg}></Image>
          </View>
        </TouchableOpacity>
  }
  if( loading )
    return <View style={{justifyContent:'center', alignItems:'center', flex:1}} color={Color.greentext}>
      <ActivityIndicator size={"large"} />
    </View>;
  return (
    <View style={styles.container}>

      <View style = {styles.topItem} >
        {apartname && (<View >
          <Text style={styles.label1}>{apartname}</Text>
          <Text style = {styles.label2}>{blockName}/{floor}</Text>
          <Text style = {styles.label3}>{cadastre}</Text>
        </View>)}
        <Text style={styles.rightText}>{flat}</Text>
      </View>
      <View style = {styles.topItem2} >
        <View style = {styles.titleCon}>
          <Text style={[styles.label1, {color:Color.maintext}]}>{Lang.flat[lang].electricity}</Text>
          <Text style={styles.label1}>{powerAmount} ₾</Text>
        </View>
        <View style = {styles.bottomCon}>
          <View >
            <Text style = {styles.label2}>{Lang.flat[lang].electricityid}</Text>
            <Text style = {styles.label3}>{flatData.epCode}</Text>
          </View>
          <View  style={{justifyContent:'center'}}>
            <Image style={styles.elecImg} source={elecMarkImg}></Image>
          </View>
        </View>
      </View>
      <View style = {[styles.topItem2]} >
        <View style = {styles.titleCon}>
          <Text style={[styles.label1, {color:Color.maintext}]}>{Lang.flat[lang].water}</Text>
          <Text style={styles.label1}>{waterAmount} ₾</Text>
        </View>
        <View style = {styles.bottomCon}>
          <View >
            <Text style = {styles.label2}>{Lang.flat[lang].waterid}</Text>
            <Text style = {styles.label3}>{flatData.waterCode}</Text>
          </View>
          <View  style={{justifyContent:'center'}}>
            <Image style={styles.waterImg} source={waterMarkImg}></Image>
          </View>
        </View>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.label1}>{Lang.flat[lang].agreement}</Text>
      </View>
      {flatData.agreements && (<Text style={[styles.label1, {fontSize:16, marginLeft: 20, marginTop:10}]}>{name}</Text>)}
      {flatData.agreements && (<View style={{width: '100%', height: 80}}>
        <FlatList
          data = {flatData.agreements}
          keyExtractor = {(item, index)=>index.toString()}
          numColumns={1}
          ItemSeparatorComponent={() => (<View style={{height:1, backgroundColor:'#dbdbdbdb'}} />)}
          renderItem = {(item)=>_renderItem(item)}
        />
      </View>)}
      <TouchableOpacity style={[styles.btnHistory, {borderBottomColor:Color.sepline, borderBottomWidth:1}]}
        onPress={()=>gotoServiceHistory(props)}
      >
        <Text style={styles.label1}>{Lang.flat[lang].service}</Text>
        <View style={styles.imgCon} >
          <Image style={{width:21, height:22}} source={RArrowImg}></Image>
        </View>
      </TouchableOpacity>
      {bUnlock && (<TouchableOpacity style={styles.btnHistory} onPress={()=>gotoDoorOpen(props, apartname, blockName + ' / '+ floor + ' / '+flat)}>
        <Text style={styles.label1}>{Lang.flat[lang].doorOpen}</Text>
        <View style={styles.imgCon} >
          <Image style={{width:21, height:22}} source={RArrowImg}></Image>
        </View>
      </TouchableOpacity>)}
      {!flatData.agreements && (<View style={styles.sepLine}></View>)}
      {bUnlock && (<TouchableOpacity style={styles.btnUnlock} onPress={()=>assignLink(flatData)}>
        <Image style = {{width:35, height:37}} source={KeyImg} />
        <Text style={styles.unlocktxt}>{Lang.flat[lang].unlock}</Text>
      </TouchableOpacity>)}
    </View>
  );
}

const assignLink=(data)=>{
  let link = Platform.OS === "android" ? data.omniAppUrl : data.omniAppUrlIOS;
  if( link !== undefined )
    Linking.openURL(link);
  else
    ToastAndroid.show("There is no a link.", ToastAndroid.SHORT);
}

const gotoServiceHistory=(props)=>{
  props.navigation.navigate('ServiceHistory', {apartmentId: props.route.params.id})
}
const gotoDoorOpen=(props, name, roomNum )=>{
  props.navigation.navigate('LockHistory',
  {
    apartmentId: props.route.params.id,
    name: name,
    roomNum : roomNum
  })
}
const mapStateToProps = state => {
  return {
      getFlatResponse: state.getFlatReducer,
      getLangResponse: state.getLangReducer,
  }
}
const mapDispatchToProps = {
    get_flat,
    reset_flat,
}

export default connect(mapStateToProps, mapDispatchToProps)(FlatScreen);
