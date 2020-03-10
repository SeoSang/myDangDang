import React, { FC } from "react"
import styled from "styled-components"
import { Menu, Row, Col, Typography } from "antd"
import { HeartOutlined, TrophyOutlined, TeamOutlined } from "@ant-design/icons"
import Link from "next/link"
const { SubMenu } = Menu
const { Title } = Typography

const MenuLink = styled.a`
  display: inline-block;
  margin: 1rem;
`

const TitleDiv = styled.div`
  border: 1px solid;
  background: white;
  text-align: center;
  font-family: Lilita One;
  font-size: 2rem;
`
export const PageDiv = styled.div`
  padding: 30px;
`
export const BackgroundDiv = styled.div`
  background-color: #fafafa;
  height: 90vh;
`

const AppLayout: FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Row style={{ border: "1px solid" }}>
        <Col xs={24} md={12}>
          <Link href='/'>
            <MenuLink>홈으로</MenuLink>
          </Link>
          <Link href='/'>
            <MenuLink>소개</MenuLink>
          </Link>
          <Link href='/'>
            <MenuLink>QnA</MenuLink>
          </Link>
        </Col>
        <Col xs={24} md={12}>
          소개
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <TitleDiv>
            <span style={{ color: "#eb4d4b" }}>My</span>
            <span style={{ color: "#f0932b" }}>Dang</span>
            <span style={{ color: "#f9ca24" }}>Dang</span>
          </TitleDiv>
        </Col>
        <Col xs={24} md={16}>
          <Menu selectedKeys={[]} mode='horizontal'>
            <Menu.Item key='mail'>
              <Link href='/boast'>
                <a>
                  <HeartOutlined />
                  댕댕이 자랑
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key='app' disabled>
              <TrophyOutlined />
              댕댕이 월드컵
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
