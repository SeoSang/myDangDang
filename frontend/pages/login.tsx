import React, { memo } from "react"
import { Typography } from "antd"
const { Title } = Typography
import LoginForm from "../components/LoginForm"
import styled from "styled-components"

const StyledTitle = styled(Title)`
  text-align: center;
`
const Login = () => {
  return (
    <>
      <StyledTitle>로그인</StyledTitle>
      <LoginForm />
    </>
  )
}

export default memo(Login)
