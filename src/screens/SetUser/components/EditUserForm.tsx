import { Button, Image, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import UserModel from '../../../model/UserModel';
import { useNavigation } from '@react-navigation/native';

import { launchImageLibrary } from 'react-native-image-picker';

interface IEditForm {
  user: UserModel;
}

const EditForm: React.FC<IEditForm> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [birthday, setBirthday] = useState(user.birthday);
  const [picture, setPicture] = useState<string | undefined>(user.picture);

  const navigation = useNavigation();

  const deleteUser = async () => {
    await user.delete().finally(navigation.goBack);
  };

  const onGalleryPress = async () => {
    await launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (!!response.assets) {
        const picture = response.assets[0];
        const source = response.assets[0].uri;
        console.log({ picture });
        setPicture(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100, borderRadius: 50 }}
        resizeMode="contain"
        source={{ uri: picture }}
      />
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
      />
      <TextInput
        value={birthday}
        style={styles.input}
        placeholder="Aniversario"
        onChangeText={setBirthday}
      />

      <Button title="Open Gallery" onPress={onGalleryPress} />
      <Button
        title="Remove User"
        onPress={() => user.delete().finally(navigation.goBack)}
      />
    </View>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 60,
    fontSize: 18,
    backgroundColor: 'lightgrey',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
