import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  DatePicker,
  Button,
  Space,
  Table,
  Tag,
  Modal,
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { ArticleStatus } from 'api/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, delArticle } from 'store/actions'
import Channel from 'components/Channel/index'
import img404 from 'assets/error.png'
import { useRef } from 'react'

const { RangePicker } = DatePicker
const { confirm } = Modal

const Article = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticles({}))
  }, [dispatch])

  const { current, pageSize, total, list } = useSelector((item) => item.article)

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
      dataIndex: 'id',
      render: (id) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                goPublish(id)
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(id)}
            />
          </Space>
        )
      },
    },
  ]

  let filters = useRef({})
  const onFinish = ({ status, channel_id, date }) => {
    // console.log('Query:', status, channel_id, date)
    const params = { channel_id, page: current, per_page: pageSize }
    if (status !== -1) {
      params.status = status
    } else {
      delete params.status
    }
    if (!!channel_id) {
      params.channel_id = channel_id
    } else {
      delete params.channel_id
    }
    if (!!date) {
      params.begin_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      params.end_pubdate = date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete params.begin_pubdate
      delete params.end_pubdate
    }
    console.log(params)
    filters.current = params
    dispatch(getArticles(params))
  }

  const changePage = (current, pageSize) => {
    const params = { ...filters.current, page: current, per_page: pageSize }
    dispatch(getArticles(params))
  }

  const handleDelete = (id) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',

      onOk() {
        dispatch(delArticle(id, filters.current))
      },

      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const navigate = useNavigate()
  const goPublish = (id) => {
    navigate(`/home/publish?id=${id}`)
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
            <Channel width={266} />
          </Form.Item>

          <Form.Item label="Date" name="date" labelCol={{ span: 2 }}>
            <RangePicker style={{ width: 266 }} />
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
      <Card title={`Total ${total} results`}>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            position: ['bottomCenter'],
            total,
            pageSize,
            current,
            onChange: changePage,
          }}
        />
      </Card>
    </div>
  )
}

export default Article
