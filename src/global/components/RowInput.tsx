import { FlexStyle, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { colors } from '../theme';

interface IRowInput {
  title: string;
  children: ReactNode;
  alignTitle?: FlexStyle['justifyContent'];
}

const RowInput: React.FC<IRowInput> = ({
  children,
  title,
  alignTitle = 'flex-start',
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { justifyContent: alignTitle }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

export default RowInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',

    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 40,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: colors.text,
  },
  contentContainer: {
    flex: 2,
  },
});
