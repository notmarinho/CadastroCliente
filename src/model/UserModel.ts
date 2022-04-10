import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export interface IUser {
  code?: string;
  name: string;
  picture: string;
  birthday: number;
}

export default class UserModel {
  readonly code?: string;
  readonly birthdayString: string;
  public name: string;
  public picture: string;
  public birthday: number;

  constructor(props: IUser) {
    this.code = props.code;
    this.picture = props.picture;
    this.name = props.name;
    this.birthday = props.birthday;
    this.birthdayString = new Date(props.birthday).toLocaleDateString('pt-BR');
    this.getPictureUrl();
  }

  async getPictureUrl() {
    const url = await storage().ref(this.picture).getDownloadURL();
    return url;
  }

  async delete() {
    await firestore()
      .collection('users')
      .doc(this.code)
      .delete()
      .then(async () => {
        console.log(`${this.name} Deleted`);
        await storage().ref(this.picture).delete();
      })
      .catch(error => console.log('Error ao deletar', error));
  }

  async updatePicture(picturePath: string) {
    try {
      const newFileName = picturePath.substring(
        picturePath.lastIndexOf('/') + 1,
      );
      const newPicturePath = `userPicture/${newFileName}`;

      await storage().ref(newPicturePath).putFile(picturePath);
      await storage().ref(this.picture).delete();
      await firestore()
        .collection('users')
        .doc(this.code)
        .update({ picture: newPicturePath });

      this.picture = newPicturePath;
    } catch (error) {
      console.error('CATCH > useCreateForm > uploadPicture', error);
      throw new Error('Error uploading picture');
    }
  }

  async update(nextUser: Partial<Omit<IUser, 'picture' | 'code'>>) {
    await firestore()
      .collection('users')
      .doc(this.code)
      .update(nextUser)
      .then(() => console.log(`Usuario editaro`))
      .catch(error => console.log('Error ao editar', error));
  }
}
