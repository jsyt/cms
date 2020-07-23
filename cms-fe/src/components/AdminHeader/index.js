

import React, {Component, Fragment, useEffect} from 'react';
import {Layout} from 'antd';
import {connect} from "dva";
import styles from './index.less';


const {Header, Footer, Sider, Content} = Layout;

const AdminHeader = (props) => {

  useEffect(() => {
    props.dispatch({type: 'login/loadUser'});
  }, [])

  return (
      <Header>
        <img className={styles.logo} src={'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/hzw-logo.jpeg'} />
        {props.user && <span className={styles.welcome}>欢迎 {props.user.username} </span> }
      </Header>
  )
}

export default connect(state => state.login)(AdminHeader);
