import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import UserModel, { IUser } from '../../model/UserModel';
import { HomeProps } from '../../routes/RouteTypes';

const Home = ({ navigation }: HomeProps) => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

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

  return (
    <View style={styles.container}>
      <FlatList<UserModel>
        data={users}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
        renderItem={({ item: user }) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 60,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text>{user?.name}</Text>
            <Button
              onPress={() => navigation.navigate('SetUser', { user })}
              title="Editar"
            />
          </View>
        )}
      />

      <Button
        onPress={() => navigation.navigate('SetUser')}
        title="Criar Usuario"
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
