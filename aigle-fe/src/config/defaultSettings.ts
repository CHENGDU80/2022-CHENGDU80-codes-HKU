import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { COLOR_PALETTE } from '../const/theme/color';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: COLOR_PALETTE.AIGLE_BLUE,
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: 'Aigle',
  colorWeak: false,
  pwa: false,
  iconfontUrl: '',
};

export default Settings;
