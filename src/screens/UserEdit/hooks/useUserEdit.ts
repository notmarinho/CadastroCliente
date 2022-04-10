import { useState } from 'react';

import UserModel, { IUser } from '../../../model/UserModel';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const useUserEdit = (currentUser: UserModel) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

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

  const updateUser = async (newProps: Partial<IUser>) => {
    setIsLoading(true);
    try {
      await currentUser.update(newProps).then(navigation.goBack);
    } catch (error) {
      console.error('CATCH > useUserEdit > updateUser', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserPicture = async (newPath: string) => {
    try {
      await currentUser.updatePicture(newPath);
    } catch (error) {
      console.error('CATCH > useUserEdit > updateUserPicture', error);
    }
  };

  return {
    updateUser,
    updateUserPicture,
    isLoading,
    openGallery,
    showDatePicker,
    setShowDatePicker,
  };
};

export default useUserEdit;
