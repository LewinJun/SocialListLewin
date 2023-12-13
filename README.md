### 项目说明

* 包含视频滚动的过程中自动播放，不可见的时候自动停止
* 可见自动播放的不包含用户手动暂停的视频
* 随机增加三个社区类型(text,image,video) 10条
* 基于react-native-video封装业务Video组件，自定义control
* 基于Image封装业务加载网络图片的Image组件，默认图和加载失败图

## 设计思路

> FlatList的item有个统一的Item,所有item寻找共性写在统一的item，不同的根据type来取子item，可以随时扩展其他类型，需要修改单个类型的组件不同组件文件，解耦
  
  ```javascript
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
```



> 用户滚动的过程中寻找video类型自动播放


```javascript
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
```

## 状态共享使用redux

> App.tsx

```javascript
  import React from 'react';
  import {Provider} from 'react-redux';
  import Home from './src/pages/home';
  import configStore from './src/store';
  
  function App(): React.JSX.Element {
    return (
      <Provider store={configStore({})}>
        <Home />
      </Provider>
    );
  }

  export default App;

```

* 主入口在src/store，状态在src/redux里面

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Folder




