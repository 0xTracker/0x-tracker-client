import { ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled(ResponsiveContainer).attrs({
  height: '',
  width: '',
})`
  flex-grow: 1;
`;

export default ChartContainer;
