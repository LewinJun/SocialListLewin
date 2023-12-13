import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SocialItem from './components/socialItem';
import {ISocialListItem} from '../../redux/social/type';
import {connect} from 'react-redux';
import {IConnectionState} from '../../redux';
import {getSocialList} from './service';
import {ISocialState} from '../../redux/social';
import SingleManagerVideo from '../../components/video/MangerPlay';
interface State {
  refresh: boolean;
  loading: boolean;
}
class SocialHome extends React.Component<ISocialState, State> {
  state: Readonly<State> = {
    refresh: true,
    loading: false,
  };
  page = 1;
  componentDidMount(): void {
    this.loadData(true);
  }

  loadData(refresh: boolean) {
    if (refresh) {
      this.page = 1;
    }
    getSocialList({page: this.page, size: 5}).then(() => {
      this.page += 1;
    });
  }

  render(): React.ReactNode {
    const {list, refresh, loading} = this.props;
    console.log('refresh:', refresh);
    return (
      <View style={styles.main}>
        <SafeAreaView style={styles.main}>
          <FlatList<ISocialListItem>
            style={styles.list}
            data={list}
            refreshing={refresh || false}
            onRefresh={() => {
              if (refresh) {
                return;
              }
              this.loadData(true);
            }}
            onEndReached={() => {
              if (refresh || loading) {
                return;
              }
              this.loadData(false);
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && !refresh ? (
                <View style={styles.footer}>
                  <ActivityIndicator size={'small'} />
                </View>
              ) : null
            }
            windowSize={20}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View style={styles.footer}>
                {refresh ? (
                  <ActivityIndicator size={'small'} />
                ) : (
                  <Text>暂无数据</Text>
                )}
              </View>
            }
            onViewableItemsChanged={info => {
              let findVideo = false;
              // 刷新不显示的video停止播放
              SingleManagerVideo().refreshVisibleItem(
                info.viewableItems?.map(ci => {
                  if (
                    ci.item.type === 'video' &&
                    !findVideo &&
                    !SingleManagerVideo().clickStopIds.includes(ci.item.id)
                  ) {
                    // 找到可见的并且不包含用户手动点击停止播放的视频，开始自动播放
                    findVideo = true;
                    SingleManagerVideo().exeVideoPlay(ci.item.id);
                  }
                  return ci.item.id;
                }),
              );
            }}
            renderItem={({item}) => {
              return (
                <SocialItem
                  item={item}
                  onPress={() => {
                    console.log('点击了', item);
                  }}
                />
              );
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(({social}: IConnectionState) => {
  return {
    list: social?.list || [],
    loading: social?.loading,
    refresh: social?.refresh,
  };
})(SocialHome);

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
