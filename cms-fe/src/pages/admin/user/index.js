import React, { useEffect,useState } from 'react'
import {connect} from "dva";
import { Table, Form, Card, Button, Modal, Input, message, Popconfirm } from "antd";
import {routerRedux} from 'dva/router';
import {PAGE_SIZE} from './constants';
import {SearchOutlined} from '@ant-design/icons';
import qs from 'qs';

const User = (props) => {

  // const [rec, setRec] = useState({})
  let {
    list, pageNum, total, isCreate, editVisible,
    record, selectedRowKeys, where, loading
  } = props;
  const save = (payload) => {
    // debugger;
    props.dispatch({type: 'user/save', payload})
  }
  const onEdit = (record) => {
    console.log(record)
    save({isCreate: false, editVisible: true, record})
    // setRec(record);
  }

  const onDelete = (id) => {
    props.dispatch({type: 'user/delete', payload: id})
  }

  const columns = [
    {
      title: '用户名', dataIndex: 'username', key: 'username',
      sorter: {
        compare: (a, b) => a.username.length - b.username.length,
      }
    },
    {title: '邮箱', dataIndex: 'email', key: 'email'},
    {title: '性别', dataIndex: 'gender', key: 'gender', render: (value, row) => value == 1 ? '男' : '女'},
    {
      title: '操作', key: 'operation', render: (value, record) => {
        return (
          <>
            <Button type="warning" onClick={() => onEdit(record)} style={{marginRight: 10}}>编辑 </Button>
            <Popconfirm
              title="是否确定删除？"
              onConfirm={() => onDelete(record.id)}
              okText="是"
              cancelText="否"
            >
              <Button type="danger" > 删除</Button>
            </Popconfirm>


          </>
        )
      }
    },

  ]

  const [form] = Form.useForm();

  const onAdd = () => {
    save({isCreate: true, editVisible: true})
  }

  const onCancel = () => {
    save({editVisible: false})
  }

  const onEditOK = () => {
    form.validateFields()
      .then(values => {
        console.log(values)
        props.dispatch({type: isCreate ? 'user/create' : 'user/update', payload: values})
      }).catch(errorInfo => {
        return message.error(errorInfo);
      })
  }


  const pagination = {
    current: pageNum,
    pageSize: PAGE_SIZE,
    showQuickJumper: true,
    showTotal: (total) => {
      return `共计${total}行`
    },
    total,
    onChange: (pageNum, pageSize) => {
      let where = qs.stringify(props.where);
      props.dispatch(routerRedux.push(`/admin/user?pageNum=${pageNum}&${where}`))
    }
  }
  let rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      console.log(selectedRowKeys)
      save({selectedRowKeys})
    }
  }
  const onDelAll = () => {
    props.dispatch({type: 'user/deleteAll', payload: {selectedRowKeys}})
  }

  return (
    <>
      <Card>
        <SearchForm
          {...props}
          where={where}

        >

        </SearchForm>

      </Card>


      <Card>
        <Button type='primary' onClick={onAdd} style={{marginRight: 10}} >新增</Button>
        <Button type='danger' onClick={onDelAll} >全部删除</Button>
        <Table
          columns={columns}
          dataSource={props.list}
          rowKey={record => record.id}
          pagination={pagination}
          rowSelection={rowSelection}
          onRow={(record) => {
            return {
              onClick: (event) => {
                let idx = selectedRowKeys.indexOf(record.id)
                if (idx == -1) {
                  selectedRowKeys = [...selectedRowKeys, record.id];
                } else {
                  selectedRowKeys = selectedRowKeys.filter(id => id != record.id);
                }
                save({selectedRowKeys});
              }
            }
          }}
          loading={loading}
        />
        <EditModal
          isCreate={isCreate}
          visible={editVisible}
          onOk={onEditOK}
          onCancel={onCancel}
          record={record}
          form={form}
        />
      </Card>
    </>
  )
}

const SearchForm = (props) => {
  const [form] = Form.useForm()

  let {where} = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSearch = () => {
    form.validateFields().then((values) => {
      // debugger;
      let where = Object.keys(values).reduce((memo, key) => {
        if (values[key]) {
          memo[key] = values[key]
        }
        return memo;
      }, {});
      // save({payload: where});
      props.dispatch({type: 'user/search', payload: {where}})
    }).catch((error) => {
      return message.error(error);
    })
  }

  return (
    <Form
        form={form}
        {...layout}
      name='updateUser'
      layout="inline"
      >
          <Form.Item
            label='用户名'
            name='username'
            initialValue={where.username}
          >
          <Input />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
          initialValue={where.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
        >
        <Button onClick={onSearch} type="primary" shape="circle" icon={<SearchOutlined />} />
        </Form.Item>
      </Form>
  )
}



const EditModal = (props) => {


  let {isCreate, visible, record, onCancel, form, onOk} = props;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const hiddernLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 0 },
  };

  useEffect(() => {
    if (record) {
      record.username && form.setFieldsValue({username: record.username})
      record.email && form.setFieldsValue({email: record.email})
    }
  }, [record])

  return (
    <Modal
      title={isCreate ? '新增' : '编辑'}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      destoryOnClose
    >
      <Form
        form={form}
        {...layout}
        name='updateUser'
      >
        <Form.Item
          name='id'
          initialValue={record.id}
          {...hiddernLayout}
        >
          <Input type="hidden" />
        </Form.Item>
          <Form.Item
            label='用户名'
            name='username'
            rules={[{required: true}]}
            initialValue={record.username}
          >
          <Input />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
          rules={[{required: true}]}
          initialValue={record.email}
        >
          <Input />
        </Form.Item>

      </Form>

    </Modal>

  )
}

export default connect(state => ({...state.user, loading: state.loading.models.user}))(User);
