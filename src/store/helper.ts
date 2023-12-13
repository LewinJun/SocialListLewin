import {IConnectionState, IModelPayload, IModelType} from '../redux/index';

export interface IDispatch {
  type: IModelType;
  payload?: IModelPayload;
}

export const storeHelper = (store: any) => {
  storeManagerSingle(store);
  return store;
};

export const getState = (): IConnectionState => {
  return storeManagerSingle().getState();
};

export const dispatch = (props: IDispatch) => {
  return storeManagerSingle().dispatch?.(props);
};

const storeManagerSingle = (function () {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  let getState: () => IConnectionState = () => ({notInit: true});
  // eslint-disable-next-line @typescript-eslint/no-shadow
  let dispatch: ({type, payload}: IDispatch) => Promise<any> = () => {
    return new Promise((_resolve, reject) => {
      reject('未初始化');
    });
  };
  return function (store?: any) {
    if (store?.getState && getState().notInit) {
      getState = store.getState;
      dispatch = store.dispatch;
    }
    return {
      getState,
      dispatch,
    };
  };
})();
