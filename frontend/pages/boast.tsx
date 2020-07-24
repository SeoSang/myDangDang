import React, { useCallback } from "react"
import { Card, Row, Col, Button } from "antd"
const { Meta } = Card
import BoastCard from "../components/BoastCard"
import styled from "styled-components"
import { PlusCircleOutlined } from "@ant-design/icons"
import Router from "next/router"
import { Context, StoreState } from "../custom/types/general"
import { LOAD_POSTS_REQUEST } from "../custom/types/reducerTypes_post"
import { useDispatch, useSelector } from "react-redux"

const CardBox = styled.div`
display:flex
flex-direction: row
`
const AddButton = styled(Button)`
  position: fixed;
  right: 50px;
  bottom: 50px;
`

const Boast = () => {
  const onClickAddButton = useCallback(() => {
    Router.push("/uploadBoast")
  }, [])
  // const dispatch = useDispatch()
  const { dangdangPosts } = useSelector((state: StoreState) => state.post)

  return (
    <>
      <Row justify='space-around' gutter={[0, 48]}>
        {dangdangPosts.map((card) => (
          <Col xs={24} sm={12} md={8} xl={6}>
            <BoastCard card={card} />
          </Col>
        ))}
      </Row>
      <AddButton
        type='danger'
        shape='circle'
        size='large'
        icon={<PlusCircleOutlined />}
        onClick={onClickAddButton}
      ></AddButton>
    </>
  )
}

Boast.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  })
  return
}

export default Boast
