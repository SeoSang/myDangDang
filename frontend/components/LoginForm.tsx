import { Form, Input, Button, Checkbox } from "antd"
import * as React from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { LOG_IN_REQUEST } from "../custom/types/reducerTypes_user"
import { StoreState } from "../custom/types/general"
import { useRouter } from "next/router"

const layout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12 },
  },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const LoginForm = () => {
  const { me } = useSelector((state: StoreState) => state.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    console.log("Success:", values)
    dispatch({
      type: LOG_IN_REQUEST,
      data: values,
    })
  }

  React.useEffect(() => {
    if (me) {
      alert("이미 로그인 된 상태입니다!")
      router.push("/")
    }
  }, [me])

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='E-mail'
        name='email'
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='비밀번호'
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
        <Checkbox>아이디 기억하기</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' style={{ marginRight: "1rem" }}>
          로그인
        </Button>
        <Button type='primary'>
          <Link href='/signup'>
            <a>회원가입</a>
          </Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
