import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, fonts } from '../../../global/theme';

interface IHeaderList {
  onSearch(searchQuery: string): void;
}

const HeaderList: React.FC<IHeaderList> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/logo-color.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Usuários cadastrados</Text>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={25} color={colors.primary} />
        <TextInput
          value={search}
          style={styles.input}
          placeholder="Nome do usuário"
          onChangeText={searchQuery => {
            onSearch(searchQuery);
            setSearch(searchQuery);
          }}
        />
      </View>
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 28,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,

    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: colors.card,
  },
  input: {
    height: 50,
    borderRadius: 10,
    fontFamily: fonts.regular,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
});
