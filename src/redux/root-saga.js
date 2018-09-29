import { all } from 'redux-saga/effects';
import metrics from '../features/metrics/saga';

function* rootSaga() {
  yield all([metrics()]);
}

export default rootSaga;
