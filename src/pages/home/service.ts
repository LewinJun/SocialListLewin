import {ISocialListItem, ISocialListItemType} from '../../redux/social/type';
import {dispatch} from '../../store/helper';
import {getUuid} from '../../utils/uuid';

const mockTxt =
  'For example, redux-thunk lets the action creators invert control by dispatching functions. They would receive dispatch as an argument and may call it asynchronously. Such functions are called thunks. Another example of middleware is redux-promise. It lets you dispatch a Promise async action, and dispatches a normal action when the Promise resolves.';

const mockImgs = [
  'https://img.36krcdn.com/20220302/v2_7492f66832c74f6799f82b23bbdb07da_img_000',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2F2d6f4f1f-934b-4726-a303-7cc8826a6511%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1705028883&t=9e1b914adb273b53d8ccea133bd7a12b',
  'https://t7.baidu.com/it/u=230781360,2157340353&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1930909882,3407137651&fm=193&f=GIF',
];

const mockVideos = [
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
  'https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4',
];

export const getSocialList = (params: {size?: number; page?: number}) => {
  dispatch({
    type: params.page === 1 ? 'social/setRefresh' : 'social/setLoad',
    payload: params.page === 1 ? {refresh: true} : {loading: true},
  });
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const list: Array<ISocialListItem> = [];
      const size = params.size || 10;
      const types: Array<ISocialListItemType> = ['text', 'image', 'video'];
      // types[randomNumType]

      for (let i = 0; i < size; i++) {
        const mediaI = Math.floor(Math.random() * 4);
        const typeId = Math.floor(Math.random() * 3);
        const type = types[typeId];

        const id = getUuid(10);
        const item: ISocialListItem = {
          type: type,
          id: id,
          content: id + '-' + mockTxt,
        };
        if (i % 2 === 0 && type === 'image') {
          item.content = undefined;
        }
        if (type === 'image') {
          item.image = mockImgs[mediaI];
        } else if (type === 'video') {
          item.video = mockVideos[mediaI];
        }
        list.push(item);
      }
      await dispatch({
        type: params.page === 1 ? 'social/initList' : 'social/loadMore',
        payload: {list},
      });
      resolve(list);
    }, 2000);
  });
};
