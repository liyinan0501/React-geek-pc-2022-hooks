import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Space,
  Table,
  Tag,
} from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, DiffOutlined } from '@ant-design/icons'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Publish date',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Views',
    },
    {
      title: 'Comments',
    },
    {
      title: 'Likes',
    },
    {
      title: 'Action',
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <div>
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
              {` `}Content Control
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form initialValues={{ status: -1 }} onFinish={onFinish}>
          <Form.Item label="Status" name="status" labelCol={{ span: 2 }}>
            <Radio.Group>
              <Radio value={-1}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Pending</Radio>
              <Radio value={2}>Proved</Radio>
              <Radio value={3}>Failed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id" labelCol={{ span: 2 }}>
            <Select placeholder="Select a channel" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" labelCol={{ span: 2 }}>
            <RangePicker />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 2,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Article
