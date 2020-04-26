import * as React from 'react';
import { Text, View, Image, ImageBackground, FlatList, SafeAreaView, AsyncStorage } from 'react-native';
import Lang from '../../constants/language';
import styles from './styles';
import axios from 'axios';

import { get_bal, reset_bal, refresh_token } from '../../actions/getBalAction';
import {signOut} from '../../actions/restoreAction';
import { get_user, reset_user } from '../../actions/getUserAction';
import { BASE_URL, GET_REFRESH_TOKEN } from '../../constants/index';
import { connect } from 'react-redux';

import Background from '../../assets/images/apartment_background.png';
import BonusBackground from '../../assets/images/bonus_back.png';
import BonusIcon from '../../assets/images/orbibonus.png';
import coin from '../../assets/images/coin.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

function MyApartmentsScreen(props) {
    
    const { getBalResponse, getLangResponse, getUserResponse, restoreTokenResponse } = props;
    const { getUserRes, user_loading } = getUserResponse;
    const { getBalRes, loading, error } = getBalResponse;
    const { signOut } = restoreTokenResponse;
    const { language } = getLangResponse;
    const [apartments, setApartments] = React.useState([]);
    const [accrual, setAccrual] = React.useState('0');
    const [payments, setPayments] = React.useState('0');
    const [income, setIncome] = React.useState('0');
    const [bonus, setBonus] = React.useState(0);
    const [refreshToken, setRefreshToken] = React.useState('');
    const [brefresh, setRefresh] = React.useState(false);
    
    React.useEffect(()=>{
        const getUser = async () =>{
            let userToken = await AsyncStorage.getItem('userToken');
                props.get_user(userToken);
        }
        getUser();
    }, [])

    React.useEffect(() => {
        const loadBal = async () => {
            let userToken = '';
            if( !brefresh )
                userToken = await AsyncStorage.getItem('userToken');
            else
                userToken = refreshToken;

            props.get_bal(userToken);
        }
        loadBal()
    }, [])

    React.useEffect(()=>{
        const getRefresh = async () => {
            let userToken = await AsyncStorage.getItem('userToken');
            if( userToken == null )
            {
                props.signOut();
                return;
            }
            const instance = axios.create({
                baseURL: `${BASE_URL}`,
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });
            instance.post(GET_REFRESH_TOKEN)
            .then(res => {
                setRefreshToken(res.data.token);
                if( res.status === 403 ){
                    AsyncStorage.removeItem('userToken');
                    props.reset_bal();
                    props.signOut();
                    return;
                }
            }).catch(err => {
                console.log(err);
            });
        }
        getRefresh();
    }, [])

    React.useEffect(() => {
        let unmounted = false;
        const getBalCalled = async () => {
            if(getBalRes === null) {
                setRefresh(true);
                if( unmounted )
                {
                    console.log(refreshToken)
                    await AsyncStorage.setItem('userToken', refreshToken);
                }
                return;
            }
            if(getBalRes.msg !== undefined) {
                alert(getBalRes.msg);
                props.reset_bal();
            } else {
                setAccrual(getBalRes.balance.Accruals);
                setPayments(getBalRes.balance.Payments);
                setIncome(getBalRes.balance.Income);
                setBonus(getBalRes.balance.Points);
                setApartments(getBalRes.flats);
            }
        }
        getBalCalled()
        return () => { unmounted = true };
    }, [getBalRes])

    let lang = parseInt(language);
    const renderApartment = ({ item }) => (
        <TouchableOpacity style={styles.apartmentContainer} onPress={()=>gotoFlat(item)}>
            <View style={styles.data1Container}>
                <Text style={styles.firstLineText}>{item.objectName}</Text>
                <Text style={styles.secondLineText}>{item.square + " " + Lang.welcome[lang].square}</Text>
            </View>
            <View style={styles.data2Container}>
                <Text style={styles.firstLineText}>{item.blockName + " / " + item.floor + " / " + item.flat}</Text>
                <Text style={styles.secondLineText}>{item.cadastre}</Text>
            </View>
        </TouchableOpacity>
    )
    
    const gotoFlat = (item) => {
        props.navigation.navigate('Flat', {id: item.id, apartname:item.objectName, blockName:item.blockName, floor:item.floor, flat: item.flat, cadastre:item.cadastre});
    }
    if(loading) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <View  style={styles.balanceBackground}>
                    <View style={styles.incomeContainer}>
                        <View style={styles.balanceTextContainer}>
                            <Text style={styles.balanceNameText}>{Lang.welcome[2].income}</Text>
                            <Text style={styles.incomeText}>{income + " ₾"}</Text>
                        </View>
                    </View>
                    <View style={styles.accrualpaymentContainer}>
                        <View style={styles.balanceTextContainer1}>
                            <Text style={styles.balanceNameText}>{Lang.welcome[2].accrual}</Text>
                            <Text style={styles.accrualText}>{accrual + " ₾"}</Text>
                        </View>
                        <View style={styles.balanceTextContainer}>
                            <Text style={styles.balanceNameText}>{Lang.welcome[2].payments}</Text>
                            <Text style={styles.paymentsText}>{payments + " ₾"}</Text>
                        </View>
                    </View>
                    <ImageBackground source={BonusBackground} style={styles.bonusContainer} resizeMode={'cover'}>
                        <Image source={BonusIcon} style={styles.bonusIcon}/>
                        <Text style={styles.bonusNameText}>{Lang.welcome[2].bonus}</Text>
                        <View style = {styles.bonusCon} >
                            <Image source={coin} style={styles.coin}></Image>
                            <Text style={styles.bonusText}>{bonus}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.divider}/>
                <View style={styles.myApartmentTextContainer}>
                    <Text style={styles.myApartmentText}>{Lang.welcome[lang].myapartments}</Text>
                </View>
                <View style={styles.divider}/>
                <SafeAreaView style={{flex:1}}>
                    <FlatList
                        data={apartments}
                        renderItem={renderApartment}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => (<View style={styles.divider} />)}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        getBalResponse: state.getBalReducer,
        getLangResponse: state.getLangReducer,
        getUserResponse: state.getUserReducer,
        restoreTokenResponse: state.restoreTokenReducer,
    }
}

const mapDispatchToProps = {
    get_bal,
    reset_bal,
    get_user,
    reset_user,
    signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(MyApartmentsScreen);