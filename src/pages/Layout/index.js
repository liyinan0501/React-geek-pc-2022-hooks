import { Layout, Menu, Popconfirm } from 'antd'
import React from 'react'
import styles from './index.module.scss'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const { Header, Content, Sider } = Layout

const LayoutComponent = () => {
  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>User Name</span>
            <span>
              {' '}
              <Popconfirm
                title="Are you sure to logout?"
                okText="Confirm"
                cancelText="Cancel"
                // onConfirm={this.onConfirm}
              >
                <LogoutOutlined />
                {` `}Logout
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={['1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              <Menu.Item icon={<HomeOutlined />} key="1">
                DashBoard
              </Menu.Item>
              <Menu.Item icon={<DiffOutlined />} key="2">
                Content Control
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />} key="3">
                Post
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: '24px',
            }}
          >
            <Content className="site-layout-background">Content</Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
