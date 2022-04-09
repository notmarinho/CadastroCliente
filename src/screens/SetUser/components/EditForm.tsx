import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import UserModel from '../../../model/UserModel';
import { useNavigation } from '@react-navigation/native';

interface IEditForm {
  user: UserModel;
}

const EditForm: React.FC<IEditForm> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [birthday, setBirthday] = useState(user.birthday);
  const [picture, setPicture] = useState(user.picture);

  const navigation = useNavigation();

  const deleteUser = async () => {
    await user.delete().finally(navigation.goBack);
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        value={picture}
        style={styles.input}
        placeholder="Foto"
        onChangeText={setPicture}
      />
      <Button title="Excluir" onPress={deleteUser} />
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
