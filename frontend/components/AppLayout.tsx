import React, { FC, useState, useCallback } from "react"
import styled from "styled-components"
import { Menu, Row, Col, Typography, Avatar, Drawer, Button } from "antd"
import { HeartOutlined, TrophyOutlined, TeamOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { StoreState } from "../custom/types/general"
import { LOG_OUT_REQUEST } from "../custom/types/reducerTypes_user"
const { SubMenu } = Menu

export const MenuLink = styled.a`
  display: inline-block;
  margin: 1rem;
  font-weight: 600;
  color: #da5c53;
`

export const ProfileDiv = styled.div`
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  background-color: #ecf0f1;
  padding: 5px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
  font-size: larger;
`

export const TitleDiv = styled.div`
  border: 1px solid;
  background: white;
  text-align: center;
  font-family: Lilita One;
  font-size: 2rem;
  cursor: pointer;
`
export const PageDiv = styled.div`
  padding: 30px;
`
export const BackgroundDiv = styled.div`
  background-color: #fafafa;
  height: 90vh;
`

const AppLayout: FC<{ children: any }> = ({ children }) => {
  const { me } = useSelector((state: StoreState) => state.user)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    if (me && me.id) {
      setVisible(true)
    }
  }
  const onClose = () => {
    setVisible(false)
  }
  const onClickMyInfo = () => {}

  const test = useCallback(
    (dispat, action, callback) => {
      dispat(action)
      callback()
    },
    [me && me.id],
  )
  const onClickLogout = () => {
    test(dispatch, { type: LOG_OUT_REQUEST }, () => {
      if (me === null) {
        setVisible(false)
      }
    })
  }

  const drawer_content =
    me === null ? (
      <>
        <h3> 로그인을 해주세요 </h3>
        <br></br>
        <Link href='/login'>
          <a>
            <Button>로그인</Button>
          </a>
        </Link>
      </>
    ) : (
      <>
        <h2>{me?.email}</h2>
        <h3>{me?.nickname + "님"}</h3>
        <Button onClick={onClickMyInfo} style={{ margin: "5px" }}>
          내 정보
        </Button>
        <Button onClick={onClickLogout} style={{ margin: "5px" }}>
          로그아웃
        </Button>
      </>
    )

  return (
    <>
      <Drawer title='User' placement='right' closable={false} onClose={onClose} visible={visible}>
        {drawer_content}
      </Drawer>
      <Row style={{ border: "1px solid" }} justify='end' align='middle'>
        <Col xs={24} md={12}>
          <Link href='/'>
            <MenuLink>Home</MenuLink>
          </Link>
          <Link href='/'>
            <MenuLink>About</MenuLink>
          </Link>
          <Link href='/'>
            <MenuLink>QnA</MenuLink>
          </Link>
        </Col>
        <Col xs={0} md={6}></Col>
        <Col xs={24} md={6} style={{ textAlign: "end", padding: "3px" }}>
          <ProfileDiv onClick={showDrawer}>
            <Avatar
              style={{
                display: "inline-block",
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                marginRight: "5px",
              }}
            >
              {me ? me.nickname[0] : "?"}
            </Avatar>
            {me ? me.nickname + " 님" : ""}
          </ProfileDiv>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <Link href='/'>
            <TitleDiv>
              <span style={{ color: "#eb4d4b" }}>My</span>
              <span style={{ color: "#f0932b" }}>Dang</span>
              <span style={{ color: "#f9ca24" }}>Dang</span>
            </TitleDiv>
          </Link>
        </Col>
        <Col xs={24} md={16}>
          <Menu mode='horizontal'>
            <Menu.Item key='mail'>
              <Link href='/boast'>
                <a>
                  <HeartOutlined />
                  댕댕이 자랑
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key='app'>
              <Link href='/randomdog'>
                <a>
                  <TrophyOutlined />
                  랜덤 강아지
                </a>
              </Link>
            </Menu.Item>
            <SubMenu
              title={
                <span className='submenu-title-wrapper'>
                  <TeamOutlined />
                  댕댕이 정보
                </span>
              }
            >
              <Menu.ItemGroup title='Item 1'>
                <Menu.Item key='setting:1'>강아지 훈련</Menu.Item>
                <Menu.Item key='setting:2'>강아지 음식</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title='Item 2'>
                <Menu.Item key='setting:3'>강아지 아아</Menu.Item>
                <Menu.Item key='setting:4'>강아지 홍길동</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key='alipay'>
              <Link href='/login'>
                <a>로그인</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <BackgroundDiv>
        <PageDiv>{children}</PageDiv>
      </BackgroundDiv>
    </>
  )
}

export default AppLayout
