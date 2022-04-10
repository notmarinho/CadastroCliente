import React, { useState } from 'react';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { IUser } from '../../../model/UserModel';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = (user: IUser) => {
    const isValid = validateFields(user);

    if (isValid) {
      registerUser(user).then(navigation.goBack);
    }
  };

  const registerUser = async (user: IUser) => {
    setIsLoading(true);
    await uploadPicture(user.picture);
    await registerUserData(user);
    setIsLoading(false);
  };

  const uploadPicture = async (picturePath: string) => {
    try {
      const filename = picturePath.substring(picturePath.lastIndexOf('/') + 1);
      const filePath = `userPicture/${filename}`;

      console.log({ filePathPicture: filePath });
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

  const validateFields = (user: IUser) => {
    let hasError = false;

    if (!!!user.name) {
      hasError = true;
      Alert.alert('Nome', 'O nome nao pode ser vazio.');
    } else if (!!!user.picture) {
      hasError = true;
      Alert.alert('Foto', 'Escolha uma foto para seu usuário.');
    }

    if (hasError) {
      return false;
    }

    return true;
  };

  return { onSubmit, isLoading, openGallery };
};

export default useCreateForm;
