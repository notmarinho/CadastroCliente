import firestore from '@react-native-firebase/firestore';

export interface IUser {
  readonly codigo: string;
  nome: string;
  foto: string;
  birthday: string;
}

export default class UserModel {
  private readonly codigo: string;
  public nome: string;
  public foto: string;
  public birthday: string;

  constructor(props: IUser) {
    this.codigo = props.codigo;
    this.foto = props.foto;
    this.nome = props.nome;
    this.birthday = props.birthday;
  }

  async delete() {
    await firestore()
      .collection('users')
      .doc(this.codigo)
      .delete()
      .then(() => console.log('User Deleted'))
      .catch(e => console.log('Error ao deletar', e));
  }
}
