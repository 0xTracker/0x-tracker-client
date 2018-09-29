import autoReloadModel from '../features/auto-reload/models/auto-reload-model';
import preferencesModel from '../features/preferences/models/preferences-model';
import ratesModel from '../features/currencies/models/rates-model';
import relayersModel from '../features/relayers/models/relayers-model';
import tokensModel from '../features/tokens/models/tokens-model';
import zrxPriceModel from '../features/currencies/models/zrx-price-model';

const models = {
  autoReload: autoReloadModel,
  preferences: preferencesModel,
  rates: ratesModel,
  relayers: relayersModel,
  tokens: tokensModel,
  zrxPrice: zrxPriceModel,
};

export default models;
