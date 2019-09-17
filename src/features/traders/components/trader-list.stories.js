import { storiesOf } from '@storybook/react';
import React from 'react';

import TraderList from './trader-list';

storiesOf('Traders|TraderList', module).add('default', () => {
  const traders = [
    {
      address: '0x41f8d14c9475444f30a80431c68cf24dc9a8369a',
      stats: {
        fillCount: { maker: 0, taker: 534, total: 534 },
        fillVolume: {
          maker: 0,
          taker: 323764.41063205403,
          total: 323764.41063205403,
        },
      },
    },
    {
      address: '0xb14232b0204b2f7bb6ba5aff59ef36030f7fe38b',
      stats: {
        fillCount: { maker: 367, taker: 0, total: 367 },
        fillVolume: {
          maker: 187142.17355110345,
          taker: 0,
          total: 187142.17355110345,
        },
      },
    },
    {
      address: '0x61b9898c9b60a159fc91ae8026563cd226b7a0c1',
      stats: {
        fillCount: { maker: 0, taker: 46, total: 46 },
        fillVolume: {
          maker: 0,
          taker: 157455.91741013335,
          total: 157455.91741013335,
        },
      },
    },
    {
      address: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
      stats: {
        fillCount: { maker: 82, taker: 1, total: 83 },
        fillVolume: {
          maker: 144689.40724991728,
          taker: 1225.1999999999998,
          total: 145914.6072499173,
        },
      },
    },
    {
      address: '0x0122676358aee287246b2a84377c8ab664d013cb',
      stats: {
        fillCount: { maker: 0, taker: 70, total: 70 },
        fillVolume: {
          maker: 0,
          taker: 127982.11165549843,
          total: 127982.11165549843,
        },
      },
    },
    {
      address: '0x6924a03bb710eaf199ab6ac9f2bb148215ae9b5d',
      stats: {
        fillCount: { maker: 54, taker: 0, total: 54 },
        fillVolume: {
          maker: 123389.95584757318,
          taker: 0,
          total: 123389.95584757318,
        },
      },
    },
    {
      address: '0x8018280076d7fa2caa1147e441352e8a89e1ddbe',
      stats: {
        fillCount: { maker: 0, taker: 30, total: 30 },
        fillVolume: {
          maker: 0,
          taker: 111990.71549475407,
          total: 111990.71549475407,
        },
      },
    },
    {
      address: '0x998497ffc64240d6a70c38e544521d09dcd23293',
      stats: {
        fillCount: { maker: 54, taker: 0, total: 54 },
        fillVolume: {
          maker: 106879.51897680406,
          taker: 0,
          total: 106879.51897680406,
        },
      },
    },
    {
      address: '0x111112549cfedf7822eb11fbd8fd485d8a10f93f',
      stats: {
        fillCount: { maker: 0, taker: 53, total: 53 },
        fillVolume: {
          maker: 0,
          taker: 103827.80796587492,
          total: 103827.80796587492,
        },
      },
    },
    {
      address: '0xfc898b18a70ce49579f8d79a32e29928c15b4bc8',
      stats: {
        fillCount: { maker: 17, taker: 0, total: 17 },
        fillVolume: {
          maker: 95079.42287258878,
          taker: 0,
          total: 95079.42287258878,
        },
      },
    },
  ];

  return <TraderList traders={traders} />;
});
