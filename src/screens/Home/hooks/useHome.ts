import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import UserModel, { IUser } from '../../../model/UserModel';

const useHome = () => {
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const nextUsers: UserModel[] = [];

        querySnapshot.forEach(document => {
          nextUsers.push(
            new UserModel({ ...document.data(), code: document.id } as IUser),
          );
        });

        setAllUsers(nextUsers);
        setFilteredUsers(nextUsers);
      });

    return () => subscriber();
  }, []);

  const onSearch = (searchValue: string) => {
    const cleanSearchString = searchValue.toLowerCase().trim();

    const filterUsers = allUsers.filter(
      value => value.name.toLowerCase().search(cleanSearchString) != -1,
    );

    setFilteredUsers(filterUsers);
  };

  return { users: filteredUsers, onSearch };
};

export default useHome;
