import React, { useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import UserModel, { IUser } from '../../../model/UserModel';

const useHome = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const nextUsers: UserModel[] = [];

        querySnapshot.forEach(document => {
          nextUsers.push(
            new UserModel({ ...document.data(), codigo: document.id } as IUser),
          );
        });

        setUsers(nextUsers);
      });

    return () => subscriber();
  }, []);

  return { users };
};

export default useHome;
