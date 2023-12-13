import React, {useState} from 'react';
import {Image, ImageProps, StyleSheet, View} from 'react-native';

interface NImageProps extends ImageProps {}

const NImage = (props: NImageProps) => {
  const [load, setLoad] = useState({
    loadEnd: false,
    error: false,
  });

  return (
    <View style={styles.mImage}>
      <Image
        {...props}
        onLoadStart={() => {
          setLoad({loadEnd: false, error: false});
        }}
        onLoadEnd={() => {
          setLoad(l => {
            return {...l, loadEnd: true};
          });
        }}
        onError={() => {
          setLoad(l => {
            return {...l, error: true};
          });
        }}
      />
      {!load.loadEnd || load.error ? (
        <Image
          style={styles.defaultImg}
          resizeMode={'contain'}
          source={
            load.error
              ? require('./icons/load_fail_icon.png')
              : require('./icons/default_icon.png')
          }
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mImage: {
    position: 'relative',
  },
  defaultImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default NImage;
