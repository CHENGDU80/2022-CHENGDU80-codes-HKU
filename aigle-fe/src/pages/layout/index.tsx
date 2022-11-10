import React, {
  FC,
  useEffect,
  Suspense,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MenuList, MenuChild } from '@/types/menu.interface';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { userState } from '@/stores/user';
import { useRecoilState } from 'recoil';
import { ReactComponent as LogoTitleSvg } from '@/assets/logo/logoAndTitle.svg';

import type { MenuDataItem, ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocale } from '@/locales';
import RightContent from './components/RightContent';

import { layoutSettings } from '../../const/layout';
import ErrorBoundary from '@/components/errorBoundary';
import { withSemiIconStyle } from '@/style';
import { IconCode, IconDesktop, IconHistogram } from '@douyinfe/semi-icons';

const menuList = [
  {
    path: '/training',
    name: 'Training',
    icon: 'training',
  },
  {
    path: '/overview',
    name: 'Data Overview',
    icon: 'overview',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
  },
];

const LayoutPage: FC = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const [pathname, setPathname] = useState('/welcome');
  const { device, collapsed, newUser, settings } = user;
  const isMobile = device === 'MOBILE';
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useLocale();

  const IconMap: { [key: string]: React.ReactNode } = useMemo(
    () => ({
      training: (
        <IconCode
          style={withSemiIconStyle({
            marginRight: collapsed ? 16 : 8,
          })}
        />
      ),
      overview: (
        <IconHistogram
          style={withSemiIconStyle({
            marginRight: collapsed ? 16 : 8,
          })}
        />
      ),
      dashboard: (
        <IconDesktop
          style={withSemiIconStyle({
            marginRight: collapsed ? 16 : 8,
          })}
        />
      ),
    }),
    [collapsed]
  );

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/training');
    }
  }, [navigate, location]);

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];
    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  const [dynamicSettings, _] = useState<Partial<ProSettings> | undefined>(
    layoutSettings
  );

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      // ErrorBoundary={false}
      ErrorBoundary={ErrorBoundary}
      location={{
        pathname: location.pathname,
      }}
      logo={() => (
        <LogoTitleSvg
          style={{
            transform: collapsed
              ? 'translate(-23%, 0%) scale(0.55)'
              : 'translate(-18%, 0%) scale(0.55)',
          }}
        />
      )}
      title={false}
      hasSiderMenu={false}
      onCollapse={toggle}
      formatMessage={formatMessage}
      onMenuHeaderClick={() => {}}
      menuItemRender={(menuItemProps: any, defaultDom: any) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(menuList)}
      rightContentRender={() => <RightContent />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
      {...dynamicSettings}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
