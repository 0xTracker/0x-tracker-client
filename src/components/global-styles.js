import { createGlobalStyle } from 'styled-components';

import { colors } from '../styles/constants';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Monda');
  
  html,
  body {
    font-size: 15px;
    height: 100%;
  }
  
  body {
    background-color: ${colors.athensGray};
    color: ${colors.violet};
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: -apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,ubuntu,cantarell,fira sans,droid sans,helvetica neue,sans-serif;
  }

  .table {
    margin: 0;
  }

  .table td {
    border-bottom: 1px solid ${colors.athensGray};
    padding: 7px;
  }
  
  .table thead th {
    border-bottom: 3px solid ${colors.athensGray};
    border-top: none;
    padding: 0.75em;
  }
  
  .table tbody td,
  .table thead th {
    white-space: nowrap;
    padding-left: 30px;
    padding-right: 30px;
  }
  
  .table tbody td:first-child,
  .table thead th:first-child {
    padding-left: 16px;
  }
  
  .table tbody td:last-child,
  .table thead th:last-child {
    padding-right: 16px;
  }
  
  .table tbody tr:hover td {
    background-color: ${colors.selago};
  }

  .table .faded,
  .table .faded a {
    color: ${colors.santasGray};
  }

  .table .faded img {
    opacity: 0.5;
  }

  .card-header .nav-tabs .nav-link:hover:not(.active) {
    border-color: transparent;
  }

  .text-muted a {
    color: currentColor;
  }

  .modal-backdrop.show {
    opacity: 0.8;
  }
`;

export default GlobalStyles;
