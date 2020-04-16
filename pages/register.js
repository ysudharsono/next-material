import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { register } from '../lib/redux/actions/authA';

const Register = (props) => {
  const { register } = props;

  const onFinish = (values) => {
    register(values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ username: '', password: '' }}
      onFinish={onFinish}
    >
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({ register: bindActionCreators(register, dispatch) });

export default connect(null, mapDispatchToProps)(Register);
