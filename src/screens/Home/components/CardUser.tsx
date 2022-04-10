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
  }, [user.picture]);

  const enteringAnimation = () => {
    Animated.sequence([
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
        <View style={styles.birthdayContainer}>
          <Icon name="cake-variant" color={colors.primary} size={16} />
          <Text style={styles.userAge}>{user.birthdayString}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editContainer}
        onPress={() => navigation.navigate('UserEdit', { user })}>
        <Icon name="circle-edit-outline" color={colors.primary} size={20} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 8,
    paddingVertical: 10,
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
    marginLeft: 5,
    fontSize: 14,
    color: colors.text,
  },
  birthdayContainer: {
    flexDirection: 'row',
  },
  editContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
});
