// import { SelectedGraphType } from '@/stores/dataTable';
import { SelectedGraphType } from '@stores/dashboard';
import AreaChartVisualization from './areaChartVisualization';
import BarChartVisualization from './barChartVisualization';
// import LineChartVisualization from './lineChartVisualization';
import PieChartVisualization from './pieChartVisualization';
// import TableVisualization from './tableVisualization';

export type VisualizationComponentMap = Record<SelectedGraphType, JSX.Element>;

const visualizationComponentMap: VisualizationComponentMap = {
  barChart: <BarChartVisualization></BarChartVisualization>,
  areaChart: <AreaChartVisualization></AreaChartVisualization>,
  pieChart: <PieChartVisualization></PieChartVisualization>,
};

export {
  visualizationComponentMap,
  BarChartVisualization,
  AreaChartVisualization,
  PieChartVisualization,
};
