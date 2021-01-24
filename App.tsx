/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {sendNotification, registerToken, readAllTokens} from './services/api';

declare const global: {HermesInternal: null | {}};

interface Itoken {
  token: string;
}

const App = () => {
  const [accountName] = useState('Alex');
  const [tokensArray, setTokensArray] = useState([]);

  const notificationMessage = `Notification from ${accountName}`;

  useEffect(() => {
    messaging()
      .getToken()
      .then((response) => registerToken(response));

    readAllTokens().then((response) => {
      const formattedArray = response.map(({token}: Itoken) => token);
      return setTokensArray(formattedArray);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(remoteMessage?.notification?.body ?? '');
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              This page is for {accountName}
            </Text>
          </View>
          <Button
            title="SEND NOTIFICATION"
            onPress={() =>
              sendNotification({message: notificationMessage}, tokensArray)
            }
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
