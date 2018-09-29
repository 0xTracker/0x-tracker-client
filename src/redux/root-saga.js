import { all } from 'redux-saga/effects';
import metrics from '../features/metrics/saga';
import stats from '../features/stats/saga';

function* rootSaga() {
  yield all([metrics(), stats()]);
}

export default rootSaga;
