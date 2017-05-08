import { all } from 'redux-saga/effects';
import maintainersSaga from './maintainers/maintainers.sagas';

export default function* rootSaga() {
  yield all([
    maintainersSaga(),
  ]);
}
