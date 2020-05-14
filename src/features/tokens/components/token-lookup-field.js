import _ from 'lodash';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { callApi, truncateAddress } from '../../../util';
import { COLORS } from '../../../styles/constants';
import TokenImage from './token-image';

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  font-size: 0.9rem;
`;

const createOption = (token) => ({
  address: token.address,
  imageUrl: token.imageUrl,
  label: token.name === null ? 'Unknown Token' : token.name,
  symbol: token.symbol,
  value: token.address,
});

const StyledSelect = styled(AsyncSelect).attrs({
  classNamePrefix: 'Select',
  controlShouldRenderValue: true,
})`
  color: inherit;

  && .Select__control {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_300};
    min-height: 0;
    padding: 0.5rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .Select__value-container {
    padding: 0;

    div:last-child {
      margin: 0;
      padding: 0;
    }
  }

  .Select__control--is-focused {
    box-shadow: none;
  }

  .Select__dropdown-indicator,
  .Select__clear-indicator {
    color: ${COLORS.NEUTRAL.MYSTIC_400};
  }

  .Select__clear-indicator {
    &:hover {
      color: ${COLORS.NEUTRAL.MYSTIC_1000};
    }
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__indicator {
    padding: 0;
  }

  .Select__option:hover,
  .Select__option:active,
  .Select__option--is-focused {
    background: ${COLORS.NEUTRAL.MYSTIC_300};
    color: inherit;
    cursor: pointer;
  }

  .Select__option--is-selected {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
    color: inherit;
  }

  &:hover {
    .Select__control {
      border-color: ${COLORS.NEUTRAL.MYSTIC_400};
    }

    .Select__dropdown-indicator {
      color: ${COLORS.NEUTRAL.MYSTIC_900};
    }
  }

  && .Select__menu {
    border: none;
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  }

  && .Select__menu-list {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
    border-radius: 4px;
    padding: 0;
  }

  && .Select__placeholder {
    color: ${COLORS.NEUTRAL.MYSTIC_400};
  }
`;

const createOptionsLoader = (selectedToken) => async (q) => {
  const lookupResult = await callApi('token-lookup', { limit: 20, q });
  const options = [
    {
      label: 'All',
      value: undefined,
    },
    ..._.sortBy(
      [
        selectedToken === undefined ? undefined : createOption(selectedToken),
        ...lookupResult.tokens.map(createOption),
      ],
      'label',
    ),
  ].filter((x) => x !== undefined);

  return options;
};

const Option = ({ children, ...props }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { address, imageUrl } = props.data;

  return (
    <components.Option {...props}>
      <div css="align-items: center; display: flex; font-size: 14px;">
        <TokenImage
          css="flex-shrink: 0;margin-right: 12px;"
          height={36}
          imageUrl={imageUrl}
          width={36}
        />
        {address ? (
          <span css="line-height: 1;">
            <span css="display: block; margin-bottom: 4px;">
              {_.truncate(children, { length: 25 })}
            </span>
            <SecondaryText>{truncateAddress(address, 25)}</SecondaryText>
          </span>
        ) : (
          children
        )}
      </div>
    </components.Option>
  );
};

Option.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    address: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

// eslint-disable-next-line react/no-multi-comp
class TokenLookupField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { value } = this.props;

    if (_.isString(value)) {
      // eslint-disable-next-line compat/compat
      Promise.all([
        callApi(`tokens/${value}`),
        callApi('tokens', { limit: 20 }),
      ])
        .then(([token, tokens]) => {
          this.setState({
            defaultOptions: [
              {
                label: 'All',
                value: undefined,
              },
              ..._.sortBy(
                [
                  createOption(token),
                  ...tokens.tokens
                    .filter((t) => t.address !== token.address)
                    .map(createOption),
                ],
                'label',
              ),
            ],
            selectedToken: token,
          });
        })
        .catch(console.error);
    } else {
      callApi('tokens')
        .then((tokens) => {
          this.setState({
            defaultOptions: [
              {
                label: 'All',
                value: undefined,
              },
              ..._.sortBy(tokens.tokens.map(createOption), 'label'),
            ],
          });
        })
        .catch(console.error);
    }
  }

  render() {
    const { className, name, onChange, value, ...otherProps } = this.props;
    const { defaultOptions, selectedToken } = this.state;

    return (
      <StyledSelect
        cacheOptions
        className={className}
        components={{ Option }}
        controlShouldRenderValue
        defaultOptions={defaultOptions}
        getOptionValue={(option) => option.value}
        isClearable={false}
        isSearchable
        loadOptions={createOptionsLoader(selectedToken)}
        name={name}
        onChange={(option) => onChange(option.value, name)}
        value={
          selectedToken !== undefined && selectedToken.address === value
            ? createOption(selectedToken)
            : undefined
        }
        {...otherProps}
      />
    );
  }
}

TokenLookupField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

TokenLookupField.defaultProps = {
  className: undefined,
  name: undefined,
  value: undefined,
};

export default TokenLookupField;
