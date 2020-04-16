import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { withRouter } from 'next/router';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { signin } from '../lib/redux/actions/authA';

const Signin = (props) => {
  const [username] = useState('senz17@gmail.com');
  const [password] = useState('ZXasqw12');

  const { signin, router } = props;

  const onFinish = (values) => {
    const redirectUri = router.query && router.query.next;
    signin(values, redirectUri);
  };

  return (
    <Form name="signin" initialValues={{ username, password }} onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({ signin: bindActionCreators(signin, dispatch) });

export default compose(connect(null, mapDispatchToProps), withRouter)(Signin);
