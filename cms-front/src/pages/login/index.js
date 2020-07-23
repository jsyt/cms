import React, {Component} from 'react';

import {Layout, Form, Input, Radio, Cascader, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Checkbox, Button  } from 'antd';
import styled from 'styled-components';

import {connect} from "dva";
import addresses from '../../utils/addresses'

const { Option } = Select;
const {Header, Footer, Sider, Content} = Layout;



class Login extends Component {
  render () {
    return (
      <Layout>
        <Content>
          <LoginForm></LoginForm>
        </Content>
      </Layout>
    )
  }
}

class LoginForm extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      gender: 1,
      autoCompleteResult: []
    };
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult = [];
    if (value) {
      autoCompleteResult = ['.com', '.cn', '.net', '.org'].map(domain => value + domain);
    }
    this.setState({autoCompleteResult})
  }
  onRadioChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      gender: e.target.value,
    });
  };
  validateRePass = (rule, value) => {
    console.log('validate')
    const form = this.props.form;
    console.log(value + '---' + form.getFieldValue('password'))
    if (!value || form.getFieldValue('password') === value) {
      return Promise.resolve();
    }

    return Promise.reject('两次输入密码不一致')

  }
  render () {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 6,
        span: 18,
      },
    };
    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };


    // let { form: { getFieldDecorator }} = this.props;
    return (
      <FormWrapper>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h3>欢迎注册</h3>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
                validator: this.validatePass
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="repassword"
            rules={[
              {
                required: true,
                message: '确认密码必须输入!',
                validator: this.validateRePass
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入合法邮箱',
                }, {
                  type: 'email'
                }
              ]}
            >
              <Input />
          </Form.Item>
          <Form.Item
              label="性别"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "请输入选择性别",
                }
              ]}

            >
            <Radio.Group
              onChange={this.onRadioChange}
              value={this.state.gender}
              defaultValue={1}
            >
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
          </Form.Item>
          <Form.Item
              label="住址"
              name="address"
              rules={[
                {
                  required: true,
                  message: "请输选择住址",
                },
              ]}
            >
            <Cascader options={addresses}  placeholder="Please select" />
          </Form.Item>
          <Form.Item
              label="手机号"
              name=" phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
              ]}
            >
            <Input.Group compact>
              <Select defaultValue="086" style={{ width: '30%' }}>
                <Option value="086">086</Option>
                <Option value="087">087</Option>
                <Option value="088">088</Option>
              </Select>
              <Input
                style={{ width: '70%' }}
                placeholder="请输入手机号码"

              />
          </Input.Group>
          </Form.Item>
          <Form.Item
              label="个人主页"
              name="profile"
              rules={[
                {
                  required: true,
                  message: '请输入个人主页',
                },
              ]}
            >
            <AutoComplete
              onSearch={this.handleWebsiteChange}
              placeholder="input here"
            >
              {this.state.autoCompleteResult.map(website => (
                <AutoComplete.Option key={website} value={website}>
                  {website}
                </AutoComplete.Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item
              label="验证码"
              name="validateCode"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            >
              <Input />
          </Form.Item>
          <Form.Item {...tailLayout}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>我已经同意本协议</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}

          >
            <Button style={{width:'67%'}} type="primary" htmlType="submit">
              注册
            </Button>
            <div>已有账号？ <a href="#">立刻登录</a></div>
          </Form.Item>
        </Form>
      </FormWrapper>
    )
  }
}

LoginForm = Form.create()(LoginForm);

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: calc(100vh- 70px );
  h3 {
    text-align: center;
  }
  form {
    border: 1px solid #999;
    border-radius: 5%;
    padding: 20px;
    width: 500px;
  }
`

const mapStateToProps = (state) => state.login;
const actions = {};

export default connect(state => state)(Login);
