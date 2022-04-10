import React, { useState } from 'react';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import UserModel, { IUser } from '../../../model/UserModel';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useUserCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const updateUser = async (user: UserModel, newProps: Partial<IUser>) => {
    setIsLoading(true);
    await user.update(newProps);
    setIsLoading(false);
  };

  const registerUser = async (user: IUser) => {
    setIsLoading(true);
    await uploadPicture(user.picture);
    await registerUserData(user);
    setIsLoading(false);
    navigation.goBack();
  };

  const uploadPicture = async (picturePath: string) => {
    try {
      const filename = picturePath.substring(picturePath.lastIndexOf('/') + 1);
      const filePath = `userPicture/${filename}`;
      await storage().ref(filePath).putFile(picturePath);
    } catch (error) {
      console.error('CATCH > useCreateForm > uploadPicture', error);
      throw new Error('Error uploading picture');
    }
  };

  const registerUserData = async ({ name, birthday, picture }: IUser) => {
    try {
      const filename = picture.substring(picture.lastIndexOf('/') + 1);
      const filePath = `userPicture/${filename}`;
      console.log({ filePathUserData: filePath });

      await firestore()
        .collection('users')
        .add({ name, birthday, picture: filePath });
    } catch (error) {
      console.error('CATCH > useCreateForm > registerUserData', error);
      throw new Error('Error registering user data');
    }
  };

  const openGallery = async (): Promise<string | null> => {
    let selectedImage = null;
    await launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (!!response.assets) {
        selectedImage = response.assets[0].uri;
      }
    });

    return selectedImage;
  };

  return {
    registerUser,
    updateUser,
    isLoading,
    openGallery,
    showDatePicker,
    setShowDatePicker,
  };
};

export default useUserCreate;
