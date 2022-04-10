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
import React, { useEffect, useState } from 'react';

import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { UserEditProps } from '../../routes/RouteTypes';
import useUserEdit from './hooks/useUserEdit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../global/theme';
import RowInput from '../../global/components/RowInput';

const UserEdit = ({ route, navigation }: UserEditProps) => {
  const currentUser = route.params.user;

  const [pictureUrl, setPictureUrl] = useState(currentUser.picture);
  const [picturePath, setPicturePath] = useState<string | null>('');

  const [name, setName] = useState(currentUser.name);
  const [birthday, setBirthday] = useState(currentUser.birthday);

  useEffect(() => {
    currentUser.getPictureUrl().then(setPictureUrl);
  }, [currentUser]);

  const {
    isLoading,
    openGallery,
    setShowDatePicker,
    showDatePicker,
    updateUser,
    updateUserPicture,
  } = useUserEdit(currentUser);

  const onImagePress = () => openGallery().then(setPicturePath);

  const onSubmit = () => {
    if (picturePath) {
      updateUserPicture(picturePath);
    }
    updateUser({ birthday, name });
  };

  const hasError = () => {
    return birthday === null || name === '';
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setBirthday(currentDate.getTime());
  };

  return (
    <>
      <ScrollView style={styles.container}>
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
            onPress={onSubmit}>
            {isLoading ? (
              <ActivityIndicator animating={isLoading} color="#fff" />
            ) : (
              <Icon size={25} color="#fff" name="check" />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Editar Usuário</Text>
        <RowInput title="Foto">
          <TouchableOpacity activeOpacity={0.7} onPress={onImagePress}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 20 }}
              resizeMode="contain"
              source={{
                uri: picturePath || pictureUrl,
              }}
            />
          </TouchableOpacity>
        </RowInput>

        <RowInput title="Nome" alignTitle="center">
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Nome e Sobrenome"
            onChangeText={setName}
            autoCapitalize="words"
          />
        </RowInput>

        <RowInput title="Data de Nascimento" alignTitle="center">
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>
              {birthday
                ? new Date(birthday).toLocaleDateString('pt-BR')
                : 'Selecionar data'}
            </Text>
          </TouchableOpacity>
        </RowInput>
      </ScrollView>
      {showDatePicker && (
        <RNDateTimePicker
          value={new Date(birthday)}
          locale="pt-BR"
          maximumDate={new Date()}
          onChange={onDateChange}
        />
      )}
    </>
  );
};

export default UserEdit;

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
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.bold,
    color: colors.text,
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
