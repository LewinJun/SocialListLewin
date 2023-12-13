import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {ISocialListItem} from '../../../../redux/social/type';

const SocialTextItem = ({item}: {item: ISocialListItem}) => {
  return (
    <Text numberOfLines={4} style={styles.txt}>
      {item.content}
    </Text>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
});

export default SocialTextItem;
