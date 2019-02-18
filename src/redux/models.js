import preferencesModel from '../features/preferences/models/preferences-model';
import ratesModel from '../features/currencies/models/rates-model';
import relayersModel from '../features/relayers/models/relayers-model';
import statsModel from '../features/stats/models/stats-model';
import tokensModel from '../features/tokens/models/tokens-model';

const models = {
  preferences: preferencesModel,
  rates: ratesModel,
  relayers: relayersModel,
  stats: statsModel,
  tokens: tokensModel,
};

export default models;
