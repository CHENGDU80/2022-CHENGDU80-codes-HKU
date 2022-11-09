import { ProSettings } from '@ant-design/pro-layout';
import { COLOR_PALETTE } from '../theme/color';
import { MEASUREMENT } from '../theme/measurement';
import { ConfigOptions } from 'antd/lib/message';

const layoutSettings: Partial<ProSettings> = {
  fixSiderbar: true,
  navTheme: 'light',
  layout: 'side',
  contentWidth: 'Fluid',
  headerHeight: parseInt(`${MEASUREMENT.AIGLE_HEADER_HEIGHT}`),
  primaryColor: COLOR_PALETTE.AIGLE_BLUE,
  splitMenus: false,
  fixedHeader: false,
};

const globalMessageConfig: ConfigOptions = {
  top: 64,
  duration: 3,
};

export { layoutSettings, globalMessageConfig };
