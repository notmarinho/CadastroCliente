import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, { useEffect, useRef } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme';
import useKeyboard from '../hooks/useKeyboard';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const FAB: React.FC<TouchableOpacityProps> = ({ ...rest }) => {
  const { isKeyboardVisible } = useKeyboard();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  useEffect(() => {
    isKeyboardVisible ? hideFab() : showFab();
  }, [isKeyboardVisible]);

  const hideFab = () =>
    Animated.spring(opacity, { toValue: 0, useNativeDriver: true }).start();

  const showFab = () =>
    Animated.spring(opacity, { toValue: 1, useNativeDriver: true }).start();

  return (
    <AnimatedButton
      {...rest}
      style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Icon name="plus" size={25} color="#fff" />
    </AnimatedButton>
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
