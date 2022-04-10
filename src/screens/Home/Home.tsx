import {
  Button,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  View,
  ListRenderItem,
} from 'react-native';
import React from 'react';

import UserModel from '../../model/UserModel';
import { HomeProps } from '../../routes/RouteTypes';
import CardUser from './components/CardUser';
import useHome from './hooks/useHome';
import { colors } from '../../global/theme';
import FAB from '../../global/components/FAB';

const Home = ({ navigation }: HomeProps) => {
  const { users } = useHome();

  const _flatlistSeparator = () => <View style={styles.flatlistSeparator} />;

  const _flatlistItem = (props: any) => <CardUser {...props} />;

  return (
    <>
      <StatusBar backgroundColor={colors.background} />
      <View style={styles.container}>
        <Image
          source={require('../../../assets/logo-color.png')}
          style={{ width: 70, height: 70 }}
        />
        <FlatList<UserModel>
          data={users}
          contentContainerStyle={styles.flatlist}
          renderItem={_flatlistItem}
          ItemSeparatorComponent={_flatlistSeparator}
        />
      </View>
      <FAB onPress={() => navigation.navigate('SetUser')} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  flatlist: {
    padding: 20,
  },
  flatlistSeparator: {
    margin: 5,
  },
});
