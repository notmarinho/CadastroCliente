import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export interface IUser {
  readonly codigo: string;
  name: string;
  picture: string;
  birthday: string;
}

export default class UserModel {
  private readonly codigo: string;
  public name: string;
  public picture: string;
  public birthday: string;

  constructor(props: IUser) {
    this.codigo = props.codigo;
    this.picture = props.picture;
    this.name = props.name;
    this.birthday = props.birthday;
    this.getPictureUrl();
  }

  async getPictureUrl() {
    const url = await storage().ref(this.picture).getDownloadURL();
    return url;
  }

  async delete() {
    await firestore()
      .collection('users')
      .doc(this.codigo)
      .delete()
      .then(async () => {
        console.log(`${this.name} Deleted`);
        await storage().ref(this.picture).delete();
      })
      .catch(error => console.log('Error ao deletar', error));
  }

  async update(nextUser: Partial<Omit<IUser, 'codigo'>>) {
    await firestore()
      .collection('users')
      .doc(this.codigo)
      .update(nextUser)
      .then(() => console.log(`Usuario editaro`))
      .catch(error => console.log('Error ao editar', error));
  }
}
