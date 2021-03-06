import React, { useState, useEffect } from "react"
import { Form, Input, Tooltip, Select, Row, Col, Checkbox, Button } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { SignUpRequestData, SIGN_UP_REQUEST } from "../custom/types/reducerTypes_user"
import { StoreState } from "../custom/types/general"
import { useRouter } from "next/router"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const SignupForm = () => {
  const [form] = Form.useForm()
  const { isSignedUp } = useSelector((state: StoreState) => state.user)
  const router = useRouter()
  const dispatch = useDispatch()

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    if (!values.agreement) {
      return alert("이용약관 동의를 눌러주세요!")
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: values,
    })
  }

  useEffect(() => {
    if (isSignedUp) {
      alert("회원가입이 완료되어 메인으로 돌아갑니다!")
      router.push("/index")
    }
  }, [isSignedUp])

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      initialValues={{
        prefix: "82",
      }}
      scrollToFirstError
    >
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: "email",
            message: "올바른 이메일을 입력해주세요!",
          },
          {
            required: true,
            message: "이메일을 입력해주세요!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='password'
        label='비밀번호'
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirm'
        label='비밀번호 확인'
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "비밀번호 확인이 틀렸습니다!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject("비밀번호가 일치하지 않습니다!")
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='nickname'
        label={
          <span>
            닉네임&nbsp;
            <Tooltip title='닉네임을 정해주세요!'>
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: "닉네임을 입력해주세요!", whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='agreement' valuePropName='checked' {...tailFormItemLayout}>
        <Checkbox>
          <a href=''>이용약관</a> 을 읽었으며 동의합니다.
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          회원가입하기
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignupForm
