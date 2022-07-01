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
import { ArticleStatus } from 'api/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, getArticles } from 'store/actions'
import img404 from 'assets/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChannels())
    dispatch(getArticles({}))
  }, [dispatch])

  const channels = useSelector((item) => item.channel)
  const { page, pageSize, count, list } = useSelector((item) => item.article)

  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      render: (cover) => {
        return (
          <img
            src={cover || img404}
            alt=""
            style={{ width: 200, height: 120, objectFit: 'cover' }}
          ></img>
        )
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const obj = ArticleStatus.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      },
    },
    {
      title: 'Publish date',
      dataIndex: 'pubdate',
    },
    {
      title: 'Views',
      dataIndex: 'read_count',
    },
    {
      title: 'Comments',
      dataIndex: 'comment_count',
    },
    {
      title: 'Likes',
      dataIndex: 'like_count',
    },
    {
      title: 'Action',
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
              {ArticleStatus.map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id" labelCol={{ span: 2 }}>
            <Select placeholder="Select a channel" style={{ width: 120 }}>
              {channels.map((item) => (
                <Option key={item.id}>{item.name}</Option>
              ))}
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
      <Card title={`Total ${count} results`}>
        <Table columns={columns} dataSource={list} rowKey="id" />
      </Card>
    </div>
  )
}

export default Article
