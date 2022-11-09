import { atom } from 'recoil';

type ModelStatus = 'beforeAnalysis' | 'analyzing' | 'analyzed' | 'error';

export type SelectedGraphType = 'barChart' | 'areaChart' | 'pieChart' | 'pie';

export type Curve =
  | 'basis'
  | 'cardinal'
  | 'catmullRom'
  | 'linear'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';

export type DashboardState = {
  model: 'Xgboost' | 'Clf';
  selectedGraphType: SelectedGraphType;
  xgboostStatus: ModelStatus;
  clfStatus: ModelStatus;
  barChartVisualizationSettings: {
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    width: number;
    height: number;
  };
  areaChartVisualizationSettings: {
    height: number;
    width: number;
    enablePoints: boolean;
    hasLegends: boolean;
    curve: Curve;
    lineWidth: number;
  };
  pieChartVisualizationSettings: {
    indexBy: string;
    height: number;
    width: number;
    hasLegends: boolean;
  };
};

const initialState: DashboardState = {
  model: 'Xgboost',
  selectedGraphType: 'areaChart',
  xgboostStatus: 'beforeAnalysis',
  clfStatus: 'beforeAnalysis',
  barChartVisualizationSettings: {
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    width: 1200,
    height: 1000,
  },
  areaChartVisualizationSettings: {
    height: 1000,
    width: 1200,
    enablePoints: false,
    hasLegends: false,
    curve: 'linear',
    lineWidth: 2,
  },
  pieChartVisualizationSettings: {
    indexBy: '',
    height: 1200,
    width: 1400,
    hasLegends: false,
  },
};

export const dashboardState = atom({
  key: 'dashboardState',
  default: initialState,
});
