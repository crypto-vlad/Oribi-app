import * as React from 'react';
import { StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

export default function DemoScreen(props) {

  return (
    <View style={styles.container}>
        <Text style={styles.getStartedText}>
          This page is not available right now
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
