import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../../global/theme';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="rocket"
        size={48}
        color={colors.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>Nenhum usuário cadastrado</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 24,
    color: colors.text,
  },
  icon: { marginBottom: 30 },
});
