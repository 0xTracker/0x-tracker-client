import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  display: flex;
  flex-direction: column;
  flex-grow: ${(props) => (props.autoHeight ? '1' : '0')};
`;

Card.defaultProps = {
  autoHeight: true,
};

export default Card;
