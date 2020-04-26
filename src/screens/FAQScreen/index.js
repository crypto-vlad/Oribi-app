import * as React from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from '@expo/vector-icons/AntDesign';
import styles from './styles';

import Color from '../../constants/Colors';

import { get_faq, reset_faq } from '../../actions/getFaqAction';
import { connect } from 'react-redux';

function FAQScreen(props) {
    const { getLangResponse, getFaqResponse } = props;
    const { language } = getLangResponse;
    const { getFaqRes, loading } = getFaqResponse;

    const [faqData, setFaqData] = React.useState([]);
    const [activeSections, setActiveSections] = React.useState([]);

    React.useEffect(() => {
        const loadFaq = async () => {
            props.get_faq();
        }

        loadFaq()
    }, [])

    React.useEffect(() => {
        const getFAQCalled = () => {
            if(getFaqRes === null) {
                return;
            }
            
            if(getFaqRes.code === 0) {
                if(language === '0') {
                    setFaqData(getFaqRes.result.en);
                } else if(language === '1') {
                    setFaqData(getFaqRes.result.ru);
                } else {
                    setFaqData(getFaqRes.result.ka);
                }
                props.reset_faq();
            } else {
                alert('error');
                props.reset_faq();
            }
        }

        getFAQCalled()
    }, [getFaqRes])

    
    const _renderHeader = (section, _, isActive) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.question}</Text>
                {
                    !isActive ?
                        <Icon name={"plus"} size={24} color={Color.iconColor} /> :
                        <Icon name={"minus"} size={24} color={Color.iconColor} />
                }
            </View>
        )
    }
    
    const _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text style={styles.contentText}>{section.answer}</Text>
            </View>
        )
    }

    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    }

    if(loading) {
        return null;
    } else {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <Accordion
                            sections={faqData}
                            activeSections={activeSections}
                            touchableComponent={TouchableOpacity}
                            renderHeader={_renderHeader}
                            renderContent={_renderContent}
                            onChange={_updateSections}
                            expandMultiple={false}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        getLangResponse: state.getLangReducer,
        getFaqResponse: state.getFaqReducer,
    }
}

const mapDispatchToProps = {
    get_faq,
    reset_faq,
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQScreen);