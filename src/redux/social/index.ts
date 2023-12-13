import {IAction} from '..';
import {ISocialListItem} from './type';

export type ISocialActionType =
  | 'social/initList'
  | 'social/loadMore'
  | 'social/setLoad'
  | 'social/setRefresh';

export interface ISocialState {
  list?: Array<ISocialListItem>;
  refresh?: boolean;
  loading?: boolean;
  hasNext?: boolean;
}
export default function social(
  state: ISocialState = {
    list: [],
    refresh: false,
    loading: false,
    hasNext: true,
  },
  action: IAction<ISocialActionType, ISocialState>,
): ISocialState {
  switch (action.type) {
    case 'social/initList':
      const list = action.payload?.list || [];
      return {
        ...state,
        list,
        loading: false,
        refresh: false,
      };
    case 'social/loadMore':
      const newList = action.payload?.list || [];
      const oldList = state.list || [];
      return {
        ...state,
        list: [...oldList, ...newList],
        loading: false,
        refresh: false,
      };
    case 'social/setLoad':
      return {
        ...state,
        loading: action.payload.loading,
      };
    case 'social/setRefresh':
      return {
        ...state,
        refresh: action.payload.refresh,
      };
    default:
      return state;
  }
}
