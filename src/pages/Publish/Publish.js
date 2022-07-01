import styles from './index.module.scss'
import { Card, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, DiffOutlined } from '@ant-design/icons'

const Publish = () => {
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">
                <HomeOutlined />
                {` `}Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <DiffOutlined />
              {` `}Publish
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      ></Card>
    </div>
  )
}

export default Publish
