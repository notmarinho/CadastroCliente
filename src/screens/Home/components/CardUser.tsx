import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import UserModel from '../../../model/UserModel';
import { colors } from '../../../global/theme';

interface ICardUser {
  item: UserModel;
  index: number;
}

const CardUser: React.FC<ICardUser> = ({ item: user, index }) => {
  const navigation = useNavigation();

  const [pictureUrl, setPictureUrl] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-25, 0],
  });

  useEffect(() => {
    user.getPictureUrl().then(setPictureUrl);
    enteringAnimation();
  }, []);

  const enteringAnimation = () => {
    Animated.sequence([
      Animated.delay(250 * index),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateX }] }]}>
      <View style={styles.imageContainer}>
        {!!pictureUrl && (
          <Image
            style={styles.userImage}
            source={{
              uri: pictureUrl,
            }}
          />
        )}
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userAge}>{user.birthday}</Text>
      </View>
      <TouchableOpacity
        style={styles.editContainer}
        onPress={() => navigation.navigate('SetUser', { user })}>
        <Icon name="circle-edit-outline" color={colors.background} size={20} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.card,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    overflow: 'hidden',
  },
  userInfoContainer: {
    flex: 6,
    height: '100%',
    justifyContent: 'space-evenly',
  },
  userImage: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  userAge: {
    fontSize: 14,
    color: colors.text,
  },
  editContainer: {
    height: 30,
    width: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.notification,
  },
});
