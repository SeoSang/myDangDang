import React, { Component, memo, useState } from "react"
import styled, { css } from "styled-components"

import { Form, Input, Tooltip, Cascader, Select, Checkbox, Button } from "antd"

const { Option } = Select
const StyledForm = styled.div`
  border-radius: 15px;
  background-color: white;
  border-radius: 10px;
  padding: 5% 20% 0 3%;
`

const isSigningUp = false

const residences = [
  {
    value: "마포구",
    label: "마포구",
    children: [
      {
        value: "성산동",
        label: "성산동",
      },
      {
        value: "망원동",
        label: "망원동",
      },
    ],
  },
  {
    value: "기타",
    label: "기타",
  },
]

const SignupForm = ({ form }) => {
  const [confirmDirty, setConfirmDirty] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !!values.agreement) {
      }
    })
    const formData = form.getFieldsValue()
  }

  const handleConfirmBlur = e => {
    const { value } = e.target
    setConfirmDirty(confirmDirty || !!value)
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!")
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true })
    }
    callback()
  }

  const validateChecked = (rule, value, callback) => {
    if (value === true) {
      form.validateFields(["agreement"], { force: true })
    }
    callback()
  }

  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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
  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "82",
  })(
    <Select style={{ width: 70 }}>
      <Option value='82'>+82</Option>
    </Select>,
  )

  return (
    <>
      <StyledForm>
        <Form
          {...formItemLayout}
          onSubmit={handleSubmit}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label='E-mail'>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "올바른 이메일 주소가 아닙니다!",
                },
                {
                  required: true,
                  message: "이메일을 입력해주세요!",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label='비밀번호' hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "비밀번호를 입력해주세요!",
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label='비밀번호 확인' hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "비밀번호를 확인해주세요!",
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                닉네임&nbsp;
                <Tooltip title='무엇으로 불리고 싶으신가요?'>
                  <Icon type='question-circle-o' />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "닉네임을 입력해주세요!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label='거주지'>
            {getFieldDecorator("residence", {
              initialValue: ["망원동", "성산동"],
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "거주지를 입력해주세요!",
                },
              ],
            })(<Cascader options={residences} />)}
          </Form.Item>
          <Form.Item label='휴대전화'>
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "핸드폰 번호를 입력해주세요!" }],
            })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              // rules: [{ validator: this.validateChecked, message: "약관에 동의하셔야합니다!" }]
            })(
              <Checkbox>
                저는 <a href=''>약관</a>을 읽었고 동의합니다.
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit' loading={isSigningUp}>
              가입하기
            </Button>
          </Form.Item>
        </Form>
      </StyledForm>
    </>
  )
}

export default memo(SignupForm)
