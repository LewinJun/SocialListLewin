import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNVideo, {VideoProperties} from 'react-native-video';
import {formatMint} from '../../utils/time';
import SingleManagerVideo from './MangerPlay';

interface MVideoProps extends VideoProperties {
  id: string;
}

const MVideo = (props: MVideoProps) => {
  const [playing, setPlaying] = useState(false);
  const [timeInfo, setTimeInfo] = useState({
    progress: 0,
    total: 0,
    loading: true,
  });

  const video = useRef<RNVideo>();

  useEffect(() => {
    if (playing) {
      SingleManagerVideo().play({
        key: props.id,
        onStop: () => {
          setPlaying(false);
        },
      });
    }
    SingleManagerVideo().setPlay(playing);
  }, [playing, props.id]);

  useEffect(() => {
    SingleManagerVideo().setVideoPlay(props.id, () => {
      setPlaying(() => true);
    });
    return () => {
      SingleManagerVideo().setVideoPlay(props.id);
    };
  }, [props.id]);

  return (
    <View style={styles.mVideo}>
      <RNVideo
        {...props}
        ref={video}
        paused={!playing}
        onProgress={data => {
          setTimeInfo({...timeInfo, progress: Math.floor(data.currentTime)});
        }}
        onEnd={() => {
          setPlaying(false);
        }}
        playWhenInactive
        repeat
        onReadyForDisplay={() => {
          setTimeInfo({...timeInfo, loading: false});
        }}
        onLoadStart={() => {
          setTimeInfo({...timeInfo, loading: true});
        }}
        onLoad={data => {
          setTimeInfo({
            progress: 0,
            total: Math.floor(data.duration),
            loading: true,
          });
        }}
      />
      <TouchableOpacity
        style={styles.playBtn}
        onPress={() => {
          if (timeInfo.loading) {
            return;
          }
          if (playing) {
            const index = SingleManagerVideo().clickStopIds.indexOf(props.id);
            if (index < 0) {
              SingleManagerVideo().clickStopIds.push(props.id);
            }
          } else {
            const index = SingleManagerVideo().clickStopIds.indexOf(props.id);
            if (index >= 0) {
              SingleManagerVideo().clickStopIds.splice(index, 1);
            }
          }
          setPlaying(!playing);
        }}>
        {!playing ? (
          <Image
            source={require('./icons/play_icon.png')}
            style={styles.playIcon}
          />
        ) : null}
        {timeInfo.loading ? <ActivityIndicator size={'small'} /> : null}
      </TouchableOpacity>

      <View style={styles.bottomControl}>
        <Text style={styles.time}>
          {formatMint(timeInfo.progress)}/{formatMint(timeInfo.total)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mVideo: {
    position: 'relative',
  },
  bottomControl: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    bottom: 0,
  },
  playBtn: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 30,
    height: 30,
  },
  time: {
    color: 'white',
    fontSize: 12,
  },
});

export default React.memo(MVideo);
