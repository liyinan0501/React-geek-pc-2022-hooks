import { Card, Form, Input, Button, Checkbox } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

const Login = () => {
  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remember: true,
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'Please input a correct phone number',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: 'Please input a phone number',
              },
            ]}
          >
            <Input size="large" placeholder="Phone number" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              {
                len: 6,
                message: 'Please input a 6 digitals identifying code',
              },
              {
                required: true,
                message: 'Please input an identifying code',
              },
            ]}
          >
            <Input size="large" placeholder="Identifying code" maxLength={6} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              Agree terms and conditions
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
