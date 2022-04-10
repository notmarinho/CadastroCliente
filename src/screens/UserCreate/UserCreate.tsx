import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, fonts } from '../../global/theme';
import RowInput from '../../global/components/RowInput';
import useUserCreate from './hooks/useUserCreate';
import { UserCreateProps } from '../../routes/RouteTypes';

const UserCreate = ({ navigation }: UserCreateProps) => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [dateBirthday, setDateBirthday] = useState<null | Date>(null);

  const {
    openGallery,
    isLoading,
    registerUser,
    showDatePicker,
    setShowDatePicker,
  } = useUserCreate();

  const onImagePress = async () => {
    await openGallery().then(selectedPicture => {
      if (selectedPicture) {
        setPicture(selectedPicture);
      }
    });
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDateBirthday(currentDate);
  };

  const hasError = () => {
    return dateBirthday === null || name === '' || picture === '';
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={navigation.goBack}>
            <Icon size={25} color={colors.text} name="arrow-left" />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              hasError()
                ? { ...styles.checkButton, backgroundColor: colors.text }
                : styles.checkButton
            }
            disabled={hasError()}
            onPress={() =>
              registerUser({
                birthday: dateBirthday!.getTime(),
                name,
                picture,
              })
            }>
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

        <RowInput title="Nome" alignTitle="center">
          <TextInput
            style={styles.input}
            placeholder="Nome e Sobrenome"
            onChangeText={setName}
            autoCapitalize="words"
          />
        </RowInput>

        <RowInput title="Data de Nascimento" alignTitle="center">
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>
              {dateBirthday
                ? dateBirthday.toLocaleDateString('pt-BR')
                : 'Selecionar data'}
            </Text>
          </TouchableOpacity>
        </RowInput>
      </ScrollView>
      {showDatePicker && (
        <RNDateTimePicker
          value={dateBirthday || new Date()}
          locale="pt-BR"
          maximumDate={new Date()}
          onChange={onDateChange}
        />
      )}
    </>
  );
};

export default UserCreate;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 30,
  },
  input: {
    fontSize: 18,
    borderRadius: 6,
    padding: 5,
    marginBottom: 15,
    transform: [{ translateY: 5 }],
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 40,
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
