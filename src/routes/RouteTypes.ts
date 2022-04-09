import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserModel from '../model/UserModel';

export type AppStackParamList = {
  Home: undefined;
  SetUser: { user: UserModel } | undefined;
};

export type SetUserProps = NativeStackScreenProps<AppStackParamList, 'SetUser'>;

export type HomeProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
