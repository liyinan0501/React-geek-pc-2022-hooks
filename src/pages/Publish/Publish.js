import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Button, Space, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, DiffOutlined } from '@ant-design/icons'
import Channel from 'components/Channel/index'

const Publish = () => {
  const onFinish = (values) => {
    console.log(values)
  }
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
      >
        <Form
          labelCol={{ span: 2 }}
          size="large"
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
          // initialValues={{ channel_id: 4 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Title can not be empty.',
              },
            ]}
          >
            <Input
              style={{ width: 400 }}
              placeholder="Input article's title"
            ></Input>
          </Form.Item>
          <Form.Item label="Channel" name="channel_id">
            <Channel width={400} />
          </Form.Item>
          <Form.Item label="Cover"></Form.Item>
          <Form.Item label="Content"></Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Publish
              </Button>
              <Button size="large">Save</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
