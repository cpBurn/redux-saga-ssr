import { call, put, takeLatest, all } from 'redux-saga/effects';

import { get } from '../api/api.sagas';
import { MaintainersTypes, MaintainersActions } from './maintainers.redux';


export function* fetchMaintainersSaga() {
  try {
    const data = yield call(get, 'https://ghibliapi.herokuapp.com/films/');

    yield put(MaintainersActions.fetchSuccess(data));
  } catch (e) {
    yield put(MaintainersActions.fetchError(e));
  }
}

export default function* maintainersSaga() {
  yield all([
    takeLatest(MaintainersTypes.FETCH, fetchMaintainersSaga),
  ]);
}
