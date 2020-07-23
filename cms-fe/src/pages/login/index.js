import React, {useState} from 'react';

import {
  Layout, Form, Input, Radio, Cascader, Col, Row, Select,
  InputNumber, DatePicker, AutoComplete, Checkbox, Button
} from 'antd';
import styled from 'styled-components';

import {connect} from "dva";
import addresses from '../../utils/addresses'
import {useDebounceFn} from 'ahooks';

const { Option } = Select;
const {Header, Footer, Sider, Content} = Layout;

const captchaUrl = `http://127.0.0.1:7001/api/captcha?ts=`

const Login = (props) => {


  return (
    <Layout>
      <Content>
        <LoginForm
          {...props}
        ></LoginForm>
      </Content>
    </Layout>
  )

}

const LoginForm = (props) => {
  // constructor (...args) {
  //   super(...args);
  //   this.state = {
  //     gender: 1,
  //     autoCompleteResult: []
  //   };
  // }
  let changeLoginStatus = () => {
    props.dispatch({
      type: 'login/save',
      payload: {isLogin: !props.isLogin}
    })
  }

  // let handleSubmit = (event) => {
  //   event.preventDefault();

  // }
  let [gender, setGender] = useState(1)
  let [autoCompleteResult, setAutoCompleteResult] = useState([])
  let [autoEmail, setAutoEmail] = useState([]);
  const [form] = Form.useForm();
  let handleWebsiteChange = (value) => {
    let autoCompleteResult = [];
    if (value) {
      autoCompleteResult = ['.com', '.cn', '.net', '.org'].map(domain => value + domain);
    }
    // this.setState({autoCompleteResult})
    setAutoCompleteResult(autoCompleteResult);
  }
  let handleEmailChange = (value) => {
    let autoEmail = [];
    if (value) {
      autoEmail = ['@qq.com', '@gmail.com', '@163.com', '@icloud.com'].map(domain => value + domain);
    }
    setAutoEmail(autoEmail);
  }
  let onRadioChange = e => {
    console.log('radio checked', e.target.value);
    // this.setState({
    //   gender: e.target.value,
    // });
    setGender(e.target.value)
  };

  let onValidateRepassword = (rule, value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(form.getFieldValue('password') )
        if (!value || form.getFieldValue('password') === value) {
          return resolve();
        }
        return reject('两次输入的密码不一致！');
      }, 1000)
    })
  }

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
  const refreshCaptcha = (event) => {
    event.target.src = captchaUrl + Date.now();
  }
  const onFinish = values => {
    console.log('Success:', values);
    props.dispatch({
      type: props.isLogin ? 'login/signin' : 'login/signup',
      payload: values
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )

  return (
    <FormWrapper>
      <Form
        {...layout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          address: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
        onFinishFailed={onFinishFailed}
      >
        <h3>欢迎 {props.isLogin ? '登录' : '注册'} </h3>
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
              message: '请输入密码'
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {
          props.isLogin ? null : (
            <>
            <Form.Item
            label="确认密码"
            name="repassword"
            rules={[
              {
                required: true,
                message: '确认密码必须输入!',
                validator: onValidateRepassword
              },
              // ({getFieldValue}) => ({
              //   validator(rule, value) {
              //     if (!value || getFieldValue('password') === value) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject('两次输入的密码不一致！');
              //   },
              // }),
            ]}
          >
            <Input.Password />
          </Form.Item>
            <Form.Item
            label="邮箱"
            name="email"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入合法邮箱',
              }, {
                type: 'email'
              }
            ]}
          >
          <AutoComplete
            onSearch={handleEmailChange}
            placeholder="请输入合法邮箱"
          >
            {autoEmail.map(email => (
              <AutoComplete.Option key={email} value={email}>
                {email}
              </AutoComplete.Option>
            ))}
          </AutoComplete>
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
            onChange={onRadioChange}
            value={gender}
            initialValues={1}
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
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          >
          <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
        </Form.Item>
        <Form.Item
            label="个人主页"
            name="website"
            rules={[
              {
                required: true,
                message: '请输入个人主页',
              },
            ]}
          >
          <AutoComplete
            onSearch={handleWebsiteChange}
            placeholder="input here"
          >
            {autoCompleteResult.map(website => (
              <AutoComplete.Option key={website} value={website}>
                {website}
              </AutoComplete.Option>
            ))}
          </AutoComplete>
        </Form.Item>



              </>)
        }
        <Form.Item label="验证码" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the captcha you got!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <img src={captchaUrl} onClick={refreshCaptcha} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailLayout}
          name="agreement"
          valuePropName="checked"
        >
          <Checkbox>我已经同意本协议</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button style={{width:'67%'}} type="primary" htmlType="submit">
            {props.isLogin ? '登录' : '注册'}
          </Button>
          <div>{props.isLogin ? '没有账号' : '已有账号'}？ <a href="#" onClick={changeLoginStatus}>立刻{props.isLogin ? '注册' : '登录'}</a></div>
        </Form.Item>
      </Form>
    </FormWrapper>
  )

}



// LoginForm = Form.create()(LoginForm);

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

// const mapStateToProps = (state) => state.login;
// const actions = {};

export default connect(state => state.login)(Login);

// export default Login;
