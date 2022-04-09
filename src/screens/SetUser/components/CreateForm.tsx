import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CreateForm = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [picture, setPicture] = useState('');

  const navigation = useNavigation();

  const registerUser = async () => {
    await firestore()
      .collection('users')
      .add({ name, birthday, picture })
      .then(() => {
        console.log('Usuário adicionador');
        navigation.goBack();
      })
      .catch(error => console.log('Erro ao adicionar usuário', error));
  };

  const validation = () => {
    let isValid = true;
    if (name === '') {
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = () => {
    const isValid = validation();
    if (isValid) {
      registerUser();
    } else {
      Alert.alert('Error', 'Preencha todos os campos para registrar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Aniversario"
        onChangeText={setBirthday}
      />
      <TextInput
        style={styles.input}
        placeholder="Foto"
        onChangeText={setPicture}
      />
      <Button title="Cadastrar" onPress={onSubmit} />
    </View>
  );
};

export default CreateForm;

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
