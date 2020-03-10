import React, { useState, useCallback } from "react"
import { Row, Col, Dropdown, Button, Menu, Input } from "antd"
const { TextArea } = Input
import { DownOutlined, UserOutlined } from "@ant-design/icons"
import styled from "styled-components"
import UploadImage from "../components/UploadImage"

export const RoundWhiteDiv = styled.div`
  padding: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: white;
`

const menu = (
  <Menu>
    <Menu.Item key='1'>
      <UserOutlined />
      귀여운 댕댕이
    </Menu.Item>
    <Menu.Item key='2'>
      <UserOutlined />
      늠름한 댕댕이
    </Menu.Item>
    <Menu.Item key='3'>
      <UserOutlined />
      김단비
    </Menu.Item>
  </Menu>
)

const UploadBoast = () => {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const onChangeTitle = useCallback(
    e => {
      setTitle(e.target.value)
    },
    [title],
  )
  const onChangeText = useCallback(
    e => {
      setText(e.target.value)
    },
    [text],
  )
  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      <Row>
        <Col span={4}></Col>
        <Col span={16} style={{ textAlign: "center" }}>
          <RoundWhiteDiv>
            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <Dropdown overlay={menu}>
                <Button>
                  카테고리 <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <Row gutter={16}>
              <Col span={10}>
                <UploadImage></UploadImage>
                <div>이미지추가</div>
              </Col>
              <Col span={14} style={{ display: "inline-block" }}>
                <Input
                  size='large'
                  maxLength={40}
                  placeholder='제목을 입력해주세요!'
                  onChange={onChangeTitle}
                  value={title}
                />
                <TextArea
                  style={{ margin: "2rem 0", height: "14rem" }}
                  maxLength={100}
                  placeholder='댕댕이를 자랑해주세요'
                  value={text}
                />
                <Button type='primary' href='/'>
                  저장
                </Button>
              </Col>
            </Row>
          </RoundWhiteDiv>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  )
}

export default UploadBoast
