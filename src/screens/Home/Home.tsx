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
import EmptyList from './components/EmptyUserList';
import HeaderList from './components/HeaderUserList';

const Home = ({ navigation }: HomeProps) => {
  const { users } = useHome();

  const _flatlistSeparator = () => <View style={styles.flatlistSeparator} />;

  const _flatlistItem = (props: any) => <CardUser {...props} />;

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <View style={styles.container}>
        <FlatList<UserModel>
          data={users}
          contentContainerStyle={styles.flatlist}
          renderItem={_flatlistItem}
          ItemSeparatorComponent={_flatlistSeparator}
          ListEmptyComponent={EmptyList}
          ListHeaderComponent={HeaderList}
        />
      </View>
      <FAB onPress={() => navigation.navigate('UserCreate')} />
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
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 120,
  },
  flatlistSeparator: {
    margin: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
