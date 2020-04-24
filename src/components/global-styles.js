import { createGlobalStyle } from 'styled-components';

import { COLORS } from '../styles/constants';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Monda');

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  html,
  body {
    background-color: none;
    font-size: 15px;
  }
  
  body {
    color: ${COLORS.PRIMARY.SCAMPI_1000};
    font-family: -apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,ubuntu,cantarell,fira sans,droid sans,helvetica neue,sans-serif;
  }

  .table {
    border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
    color: currentColor;
    margin: 0;
  }

  .table td {
    border: none;
    font-size: 1rem;
    padding: 0.75rem 0;
  }
  
  .table thead th {
    background-color: ${COLORS.PRIMARY.SCAMPI_700};
    border-bottom: 3px solid ${COLORS.PRIMARY.SCAMPI_200};
    border-top: none;
    color: ${COLORS.PRIMARY.SCAMPI_100};
    padding: 1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 12px;
    vertical-align: middle;
  }
  
  .table tbody td,
  .table thead th {
    white-space: nowrap;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .table tbody tr:nth-child(2n) {
    background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  }
  
  .table tbody td:first-child,
  .table thead th:first-child {
    padding-left: 2rem;
  }
  
  .table tbody td:last-child,
  .table thead th:last-child {
    padding-right: 2rem;
  }

  .card-header .nav-tabs .nav-link:hover:not(.active) {
    border-color: transparent;
  }

  .modal-backdrop.show {
    opacity: 0.8;
  }

  .recharts-brush-texts {
    font-size: 0.8rem;
  }
`;

export default GlobalStyles;
