import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer, {
  IAction,
  IConnectionState,
  IModelPayload,
  IModelType,
} from '../redux/index';
import {storeHelper} from './helper';

// const enhancer = compose(
//   applyMiddleware(thunkMiddleware),
//   // other store enhancers if any
// );

function logger({getState}) {
  return next => action => {
    console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log('state after dispatch', getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

const localPer = (
  baseReducer: (
    state: IConnectionState,
    action: IAction<IModelType, IModelPayload>,
  ) => any,
  local?: any,
) => {
  return (state, action) => {
    // if (action.type?.indexOf('redux/INIT') >= 0) {
    //   if (process.env.TARO_ENV !== 'rn') {
    //     try {
    //       newState = JSON.parse(Taro.getStorageSync(CACHE_KEY));
    //     } catch (e) {}
    //   } else {
    //     newState = local;
    //   }
    // }
    console.log('action:', action, state);

    return {...baseReducer(state, action)};
  };
};

export default function configStore(local?: any) {
  // console.log('local:', local);
  const store = createStore(
    localPer(rootReducer, local),
    applyMiddleware(logger),
  );
  return storeHelper(store);
}
