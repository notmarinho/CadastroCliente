import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import firestore from '@react-native-firebase/firestore';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const Hello: React.FC<Props> = ({ name, baseEnthusiasmLevel = 0 }) => {
  const [users, setUsers] = React.useState<any[]>([]);

  useEffect(() => {
    hideSplashScreen();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const nextUsers: any[] = [];

        querySnapshot.forEach(document => {
          nextUsers.push({
            ...document.data(),
            key: document.id,
          });
        });

        setUsers(nextUsers);
      });

    return () => subscriber();
  }, []);

  console.log({ users });

  const hideSplashScreen = async () => {
    await RNBootSplash.hide({ fade: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Hello;
