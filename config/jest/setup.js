import { StyleSheetTestUtils } from 'aphrodite';
import { StyleSheetTestUtils as StyleSheetTestUtilsNoImportant } from 'aphrodite/no-important';

import 'jest-dom/extend-expect';

StyleSheetTestUtils.suppressStyleInjection();
StyleSheetTestUtilsNoImportant.suppressStyleInjection();
