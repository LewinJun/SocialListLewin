import {combineReducers} from 'redux';
import social, {ISocialActionType, ISocialState} from './social';

export interface IAction<Type, Payload> {
  type: Type;
  payload: Payload;
}

export type IModelPayload = ISocialState;

export type IModelType = ISocialActionType;

export interface IConnectionState {
  social?: ISocialState;
}

export default combineReducers({
  social,
});
