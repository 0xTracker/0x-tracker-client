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

  .table td {
    border-bottom: 1px solid ${colors.gallery};
    padding: 7px;
  }
  
  .table thead th {
    color: white;
    background-color: ${colors.blueMarguerite};
    border-bottom: 4px solid ${colors.scampi};
    border-top: 1px solid ${colors.blueMarguerite};
    padding: 5px;
  }
  
  .table tbody td,
  .table thead th {
    white-space: nowrap;
    padding-left: 30px;
    padding-right: 30px;
  }
  
  .table tbody td:first-child,
  .table thead th:first-child {
    padding-left: 10px;
  }
  
  .table tbody td:last-child,
  .table thead th:last-child {
    padding-right: 10px;
  }
  
  .table tbody tr:nth-child(2n) td {
    background-color: ${colors.wildSand};
  }
  
  .pagination {
    margin: 0;
    padding: 0;
  }
  
  .pagination li.page-item {
    margin: 0 3px 0 0;
  }
  
  .pagination li.page-item:last-child {
    margin: 0;
  }
  
  .pagination li.page-item a.page-link {
    background-color: ${colors.wildSand};
    border: none;
    border-radius: 0;
    color: currentColor;
    cursor: pointer;
    display: block;
    outline: none;
    padding: 10px 15px;
  }
  
  .pagination li.page-item a.page-link:hover {
    background-color: ${colors.gallery};
  }
  
  .pagination li.page-item.active a.page-link {
    background-color: ${colors.bonJour};
  }
  
  .pagination li.page-item.disabled a.page-link,
  .pagination li.page-item.disabled a.page-link:hover {
    cursor: default;
    color: ${colors.stormGray};
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

  .btn-primary {
    background-color: ${colors.blueMarguerite};
    border-color: ${colors.blueMarguerite};

    &&&& {
      &:hover,
      &:active {
        background-color: ${colors.scampi};
        border-color: ${colors.scampi};
      }
    }
  }
`;

export default GlobalStyles;
