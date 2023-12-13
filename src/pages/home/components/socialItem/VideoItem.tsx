import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MVideo from '../../../../components/video/index';
import {ISocialListItem} from '../../../../redux/social/type';
import SocialTextItem from './TextItem';

const SocialVideoItem = ({item}: {item: ISocialListItem}) => {
  return (
    <View style={styles.item}>
      <MVideo
        paused={true}
        id={item.id}
        source={{uri: item.video}}
        style={styles.video}
        poster="https://img0.baidu.com/it/u=1794805460,3988539434&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=320"
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
  video: {
    flex: 1,
    height: 150,
  },
});

export default SocialVideoItem;
