import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../global/theme';

const HeaderList = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/logo-color.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Usuários cadastrados</Text>
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
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
});
