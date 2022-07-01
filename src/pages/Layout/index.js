import { Layout, Menu, Popconfirm } from 'antd'
import React from 'react'
import styles from './index.module.scss'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, logout } from 'store/actions'

const { Header, Content, Sider } = Layout

const LayoutComponent = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    try {
      dispatch(getUserProfile())
    } catch {}
  }, [dispatch])

  const logoutConfirm = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>{user.name}</span>
            <span>
              {' '}
              <Popconfirm
                title="Are you sure to logout?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={logoutConfirm}
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
              selectedKeys={[location.pathname]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              <Menu.Item key={'/home'} icon={<HomeOutlined />}>
                <Link to="/home">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key={'/home/article'} icon={<DiffOutlined />}>
                <Link to="/home/article">Content Control</Link>
              </Menu.Item>
              <Menu.Item key={'/home/publish'} icon={<EditOutlined />}>
                <Link to="/home/publish">publish</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: '24px',
              overflow: 'auto',
            }}
          >
            <Content className="site-layout-background">
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
