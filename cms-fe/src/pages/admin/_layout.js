

import React, {Component, Fragment} from 'react';
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

import AdminHeader from '../../components/AdminHeader';
import MenuList from '../../components/MenuList';

const Admin = (props) => {

  return (
    <Layout>
      <AdminHeader />
      <Layout>
          <Sider>
            <MenuList/>
          </Sider>
          <Content>
            {props.children}
          </Content>
      </Layout>
      <Footer style={{textAlign: 'center'}}>
         PROP 用户权限管理系统@2020
      </Footer>
    </Layout>
  )
}

export default Admin;
