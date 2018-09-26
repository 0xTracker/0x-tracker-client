import { all } from 'redux-saga/effects';
import currencies from '../features/currencies/saga';
import metrics from '../features/metrics/saga';
import relayers from '../features/relayers/saga';
import stats from '../features/stats/saga';
import tokens from '../features/tokens/saga';

function* rootSaga() {
  yield all([currencies(), metrics(), relayers(), stats(), tokens()]);
}

export default rootSaga;
