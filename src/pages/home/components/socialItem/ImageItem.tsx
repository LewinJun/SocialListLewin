import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ISocialListItem} from '../../../../redux/social/type';
import SocialTextItem from './TextItem';
import NImage from '../../../../components/image';

const SocialImageItem = ({item}: {item: ISocialListItem}) => {
  return (
    <View style={styles.item}>
      <NImage
        source={{uri: item.image, cache: 'only-if-cached'}}
        style={styles.img}
      />
      {item.content && item.content.length > 0 && (
        <SocialTextItem item={item} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    flex: 1,
    height: 200,
  },
});

export default SocialImageItem;
