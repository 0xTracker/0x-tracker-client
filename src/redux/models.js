import autoReloadModel from '../features/auto-reload/models/auto-reload-model';
import metricsModel from '../features/metrics/models/metrics-model';
import preferencesModel from '../features/preferences/models/preferences-model';
import ratesModel from '../features/currencies/models/rates-model';
import relayersModel from '../features/relayers/models/relayers-model';
import statsModel from '../features/stats/models/stats-model';
import tokensModel from '../features/tokens/models/tokens-model';
import zrxPriceModel from '../features/currencies/models/zrx-price-model';

const models = {
  autoReload: autoReloadModel,
  metrics: metricsModel,
  preferences: preferencesModel,
  rates: ratesModel,
  relayers: relayersModel,
  stats: statsModel,
  tokens: tokensModel,
  zrxPrice: zrxPriceModel,
};

export default models;
