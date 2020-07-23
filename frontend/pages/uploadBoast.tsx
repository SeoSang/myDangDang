import React, { useState, useCallback, useRef } from "react"
import { message, Row, Col, Dropdown, Button, Menu, Input, Form } from "antd"
const { TextArea } = Input
import { DownOutlined, UserOutlined } from "@ant-design/icons"
import styled from "styled-components"
import UploadImage, { getBase64 } from "../components/UploadImage"
import { UploadChangeParam } from "antd/lib/upload"
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGE_REQUEST,
} from "../custom/types/reducerTypes_post"
import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "../custom/types/general"

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
  const [image_avail, setImage_avail] = useState(false)
  const [image_64, setImage_64] = useState("")
  const { isAddingPost, imagePath } = useSelector((state: StoreState) => state.post)
  const dispatch = useDispatch()

  const onSubmitFormSuccess = useCallback(() => {
    message.success("게시글 작성에 성공했습니다!", 5)
  }, [])

  const onSubmitForm = (values: any) => {
    // antd values 방식을 쓰지 않는다.
    if (image_avail === false || text === "" || title === "") {
      alert("입력이 안된 칸이 있습니다!")
      return
    }
    const formData = new FormData()
    formData.append("image", imagePath)
    formData.append("description", text)
    formData.append("title", title)
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    })
    onSubmitFormSuccess()
  }

  const handleChange = (info: UploadChangeParam) => {
    try {
      setImage_avail(false)
      if (info.file.status === "uploading") {
        return
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        const imageData = new FormData()
        imageData.append("image", info.file.originFileObj!)
        dispatch({
          type: UPLOAD_IMAGE_REQUEST,
          data: imageData,
        })
        getBase64(info.file.originFileObj!, (img64: string) => {
          setImage_64(img64)
        })
        setImage_avail(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value)
    },
    [title],
  )
  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value)
    },
    [text],
  )

  return (
    <Form
      style={{ backgroundColor: "#FAFAFA" }}
      encType='multipart/form-data'
      onFinish={onSubmitForm}
    >
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
                <UploadImage handleChange={handleChange} image_64={image_64}></UploadImage>
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
                <Input.TextArea
                  style={{ margin: "2rem 0", height: "14rem" }}
                  maxLength={100}
                  placeholder='댕댕이를 자랑해주세요'
                  onChange={onChangeText}
                  value={text}
                />
                <Button type='primary' htmlType='submit'>
                  저장
                </Button>
              </Col>
            </Row>
          </RoundWhiteDiv>
        </Col>
        <Col span={4}></Col>
      </Row>
    </Form>
  )
}

export default UploadBoast
