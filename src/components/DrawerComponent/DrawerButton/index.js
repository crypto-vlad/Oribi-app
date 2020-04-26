import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Entypo';
import styles from '../styles';

export default class DrawerButton extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity 
          style={styles.drawerbtn}
          onPress={this.toggleDrawer.bind(this)}>
          <Icon name="menu" size={30} color={'white'}  />
        </TouchableOpacity>
      </View>
    );
  }
}