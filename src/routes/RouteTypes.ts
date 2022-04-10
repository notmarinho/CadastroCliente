import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserModel from '../model/UserModel';

export type AppStackParamList = {
  Home: undefined;
  UserCreate: undefined;
  UserEdit: { user: UserModel };
};

export type UserCreateProps = NativeStackScreenProps<AppStackParamList, 'UserEdit'>;

export type UserEditProps = NativeStackScreenProps<AppStackParamList, 'UserEdit'>;

export type HomeProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
