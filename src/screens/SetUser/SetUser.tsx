import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SetUserProps } from '../../routes/RouteTypes';
import EditForm from './components/EditForm';
import CreateForm from './components/CreateForm';

const SetUser = ({ route }: SetUserProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    !!route.params?.user ? setIsEditMode(true) : setIsEditMode(false);
  }, [route.params]);

  if (!isEditMode) {
    return <CreateForm />;
  }
  
  return <EditForm user={route.params!.user} />;
};

export default SetUser;
