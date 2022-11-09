import { atom } from 'recoil';

export type TrainingState = {
  step:
    | 'beforeLoadData'
    | 'loadingData'
    | 'loadDataFinished'
    | 'loadDataFailed'
    | 'preprocessing'
    | 'preprocessingFinished'
    | 'preprocessingFailed';
};

const initialState: TrainingState = {
  step: 'beforeLoadData',
};

export const trainingState = atom({
  key: 'trainingState',
  default: initialState,
});
