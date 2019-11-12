import { setTestDefaults } from '../../src/responsive-utils';
import { BREAKPOINTS } from '../../src/constants';
import '@testing-library/jest-dom/extend-expect';

process.env.REACT_APP_API_ENDPOINT = 'https://api.0xtracker.com';

setTestDefaults(BREAKPOINTS, 'xl');
