

import React, { Component } from 'react'
import {Menu} from "antd";

import { Link } from 'umi';
import {connect} from "dva";


import Icon, {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';




const { SubMenu } = Menu;


const MenuList = (props) => {

  const handleClick = e => {
    console.log('click ', e);
  };


  const renderMenuItems = (menus) => {
    return menus.map(menu => {
      if (menu.children && menu.children.length > 0) {
        return (
          <SubMenu key={menu.key} title={<span> <Icon component={SettingOutlined}></Icon> { menu.name }</span>}>
            { renderMenuItems(menu.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={menu.key}>
            <Link to={menu.key}>
              <Icon component={AppstoreOutlined}></Icon>{ menu.name }
            </Link>
          </Menu.Item>
        )
      }
    })
  }

  if (!props.user) {
    return null;
  }


  return (
    <Menu
      style={{height: 'calc(100vh - 128px)'}}
      onClick={handleClick}
      theme="dark"
      defaultSelectedKeys={['/admin']}
      defaultOpenKeys={['/admin']}
      mode="inline"
    >
      {
        renderMenuItems(props.user.menus)
      }

    </Menu>
  );

}

export default connect(state => state.login)(MenuList);
