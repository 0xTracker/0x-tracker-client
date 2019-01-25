import { createGlobalStyle } from 'styled-components';

import { colors } from '../styles/constants';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Monda');

  #root {
    min-height: 100vh;
  }

  html,
  body {
    background-color: none;
    font-size: 15px;
  }
  
  body {
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
    padding: 0.5rem;
  }
  
  .table thead th {
    background-color: ${colors.indigo};
    border-bottom: 3px solid ${colors.periwinkleGray};
    border-top: none;
    color: ${colors.white};
    padding: 0.75rem;
    font-weight: normal;
  }
  
  .table tbody td,
  .table thead th {
    white-space: nowrap;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .table tbody td:first-child,
  .table thead th:first-child {
    padding-left: 1rem;
  }
  
  .table tbody td:last-child,
  .table thead th:last-child {
    padding-right: 1rem;
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
