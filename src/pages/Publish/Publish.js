import styles from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, DiffOutlined, PlusOutlined } from '@ant-design/icons'
import Channel from 'components/Channel/index'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { baseURL } from 'utils/request'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addArticle } from 'store/actions'

const Publish = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    if (values.type !== fileList.length) {
      return message.warning('Upload amount is not correct')
    }
    const { type, ...rest } = values
    const images = fileList.map((item) => {
      return item.response.data.url || item.url
    })
    const data = {
      ...rest,
      cover: {
        type,
        images,
      },
    }
    console.log(data)
    try {
      await dispatch(addArticle(data))
      message.success('Publish succeeds!', 1, () => {
        navigate(`/home/article`)
      })
    } catch {}
  }

  const [uploadAmount, setUploadAmount] = useState(1)
  const changeType = (e) => {
    const count = e.target.value
    setUploadAmount(count)
    setFileList([])
  }

  const [fileList, setFileList] = useState([])
  // uploaded image will be saved in fileList
  const uploadImage = ({ fileList }) => {
    setFileList(fileList)
  }

  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const handlePreview = (file) => {
    const url = file.url || file.response.data.url
    setShowPreview(true)
    setPreviewUrl(url)
  }

  const handleCancel = () => {
    setShowPreview(false)
    setPreviewUrl('')
  }

  const beforeUpload = (file) => {
    if (file.size >= 1024 * 500) {
      message.warn('Can not upload over 500kb')
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('Only png and jpeg can upload')
      return Upload.LIST_IGNORE
    }
    return true
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
          //Quill 必须要有初始值 content: ''
          initialValues={{ content: '', type: uploadAmount }}
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

          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[
              {
                required: true,
                message: 'Channel can not be empty',
              },
            ]}
          >
            <Channel width={400} />
          </Form.Item>

          <Form.Item label="Cover" name="type">
            <Radio.Group onChange={changeType}>
              <Radio value={1}>Single photo</Radio>
              <Radio value={3}>Triple photos</Radio>
              <Radio value={0}>No photos</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2 }}>
            {uploadAmount !== 0 && (
              <Upload
                listType="picture-card"
                fileList={fileList}
                action={`${baseURL}upload`}
                //指定上传名字
                name="image"
                //上传文件改变时的状态
                onChange={uploadImage}
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
              >
                {fileList.length < uploadAmount && <PlusOutlined />}
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Content can not be empty',
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              className="publish-quill"
              placeholder="Write the content of article"
            ></ReactQuill>
          </Form.Item>

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
      {/* Preview */}
      <Modal
        visible={showPreview}
        title={'Preview'}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewUrl}
        />
      </Modal>
    </div>
  )
}

export default Publish
