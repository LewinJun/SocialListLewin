import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ISocialListItem,
  ISocialListItemType,
} from '../../../../redux/social/type';
import colors from '../../../../configs/colors';
import SocialVideoItem from './VideoItem';
import SocialImageItem from './ImageItem';
import SocialTextItem from './TextItem';

export interface ISocialItemProps {
  item: ISocialListItem;
  onPress?: () => void;
}

const ItemType = {
  video: SocialVideoItem,
  image: SocialImageItem,
  text: SocialTextItem,
};

const SocialItem = (props: ISocialItemProps) => {
  const Item = ItemType[props.item.type] || SocialTextItem;
  return (
    <View style={styles.item}>
      <View style={styles.contentView}>
        <Item item={props.item} />
      </View>
      <View style={styles.bottom}>
        <ItemBottomBtn source={require('../../icons/share_icon.png')} />
        <ItemBottomBtn source={require('../../icons/like_icon.png')} hideLine />
      </View>
    </View>
  );
};

const ItemBottomBtn = ({
  source,
  onPress,
  hideLine,
}: {
  source: ImageSourcePropType | undefined;
  onPress?: () => void;
  hideLine?: boolean;
}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.bottomBtn}
        onPress={onPress}>
        <Image style={styles.bottomBtnImg} source={source} />
      </TouchableOpacity>
      {!hideLine && <View style={styles.bottomCenterLine} />}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    marginBottom: 16,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  bottomBtn: {
    height: '100%',
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnImg: {
    width: 20,
    height: 20,
  },
  bottomCenterLine: {
    height: 25,
    width: 1,
    backgroundColor: colors.line,
  },
  contentView: {
    padding: 10,
  },
});

export default React.memo(SocialItem);
