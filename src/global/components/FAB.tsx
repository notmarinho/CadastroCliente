import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme';

const FAB: React.FC<TouchableOpacityProps> = ({ ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Icon name="plus" size={25} color="#fff" />
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    height: 65,
    width: 65,
    borderRadius: 35,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
