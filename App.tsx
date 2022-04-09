import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import firestore from '@react-native-firebase/firestore';
import UserModel, { IUser } from './src/model/UserModel';

const Hello: React.FC = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

  useEffect(() => {
    hideSplashScreen();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const nextUsers: UserModel[] = [];

        querySnapshot.forEach(document => {
          nextUsers.push(
            new UserModel({ ...document.data(), codigo: document.id } as IUser),
          );
        });

        setUsers(nextUsers);
      });

    return () => subscriber();
  }, []);

  const hideSplashScreen = async () => {
    await RNBootSplash.hide({ fade: true });
  };

  return (
    <View style={styles.container}>
      <FlatList<UserModel>
        data={users}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 60,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text>{item?.nome}</Text>
            <Button onPress={() => item.delete()} title="Editar" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
});

export default Hello;
