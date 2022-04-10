import {
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useCreateForm from '../hooks/useCreateForm';
import RowInput from '../../../global/components/RowInput';
import { colors, fonts } from '../../../global/theme';
import { useNavigation } from '@react-navigation/native';

const CreateForm = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [picture, setPicture] = useState('');
  const [codigo, setCodigo] = useState('0');

  const { openGallery, isLoading, onSubmit } = useCreateForm();
  const navigation = useNavigation();

  const onImagePress = async () => {
    await openGallery().then(selectedPicture => {
      if (selectedPicture) {
        console.log(selectedPicture);
        setPicture(selectedPicture);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Icon size={25} color={colors.text} name="arrow-left" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => onSubmit({ birthday, codigo, name, picture })}>
          {isLoading ? (
            <ActivityIndicator animating={isLoading} color="#fff" />
          ) : (
            <Icon size={25} color="#fff" name="check" />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Novo Usuário</Text>
      <RowInput title="Foto">
        <TouchableOpacity activeOpacity={0.7} onPress={onImagePress}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 20 }}
            resizeMode="contain"
            source={{
              uri:
                picture ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
            }}
          />
        </TouchableOpacity>
      </RowInput>

      <RowInput title="Código" alignTitle="center">
        <TextInput
          style={styles.input}
          placeholder="Apenas numeros"
          onChangeText={setCodigo}
          keyboardType="number-pad"
          maxLength={6}
        />
      </RowInput>

      <RowInput title="Nome" alignTitle="center">
        <TextInput
          style={styles.input}
          placeholder="Nome e Sobrenome"
          onChangeText={setName}
          autoCapitalize="words"
        />
      </RowInput>

      <RowInput title="Data de Nascimento" alignTitle="center">
        <TextInput
          style={styles.input}
          placeholder="Nome e Sobrenome"
          onChangeText={setBirthday}
          autoCapitalize="words"
        />
      </RowInput>
    </ScrollView>
  );
};

export default CreateForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
  },
  input: {
    fontSize: 18,
    borderRadius: 6,
    padding: 5,
    marginBottom: 15,
    transform: [{ translateY: 5 }],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 36,
    fontFamily: 'SourceSansPro-Bold',
    color: '#08040f',
    marginBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
