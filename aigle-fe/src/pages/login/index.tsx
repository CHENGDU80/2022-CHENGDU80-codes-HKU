import React, { FC, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams, Role } from '@/types/login';
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from 'history';

const currentUser: {
  username: string;
  role: Role;
} = {
  username: 'decker',
  role: 'admin',
};

import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest',
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: { from: string } };

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setUser({
      ...user,
      username: currentUser.username,
      logged: true,
      role: currentUser.role,
    });
  }, []);

  const onFinished = async (form: LoginParams) => {
    localStorage.setItem('token', '123abcdefg');

    const from = location.state?.from || { pathname: '/training' };
    navigate(from);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <LogoSvg
            style={{
              transform: 'translate(0%, 30%) scale(0.7)',
            }}
          />
          <span className={styles.title}>AIGLE</span>
        </div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox> Remember Me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
