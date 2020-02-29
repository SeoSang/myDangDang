import React, { useState } from "react"
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"

import { Mention } from "@ant-design/compatible"

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
]

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

  const onFinish = values => {
    console.log("Received values of form: ", values)
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }}>
        <Option value='82'>+82</Option>
      </Select>
    </Form.Item>
  )

  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult([".com", ".org", ".net"].map(domain => `${value}${domain}`))
    }
  }

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }))

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

      <Form.Item
        name='phone'
        label='전화번호'
        rules={[{ required: true, message: "전화번호를 입력해주세요!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name='captcha'
              noStyle
              rules={[{ required: true, message: "쓰여진 문자를 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
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
