import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from 'assets/logo.png'
import './index.scss'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from 'store/actions/login'
import React, { useState } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loadings, setLoadings] = useState(false)

  const onFinish = async (values) => {
    const { mobile, code } = values
    setLoadings(true)
    try {
      await dispatch(login(mobile, code))
      message.success('Login succeeds!', 1, () => {
        location.state?.from
          ? navigate(location.state.from)
          : navigate('/home', { replace: true })
      })
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败', 1, () => {
        setLoadings(false)
      })
    }
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
            agree: true,
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

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (rule, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Agree terms and conditions')),
              },
            ]}
          >
            <Checkbox className="login-checkbox-label">
              Agree terms and conditions
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loadings}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
