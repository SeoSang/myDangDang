import React, { memo, useEffect } from "react"
import { Form } from "antd"
import Router from "next/router"

const WrappedSignupForm = Form.useForm({ name: "register" })(SignupForm)

const me = { id: 1, nickname: "서상혁" }

const Signup = () => {
  useEffect(() => {
    if (me) {
      alert("이미 로그인이 된 상태입니다!")
      Router.push("/")
    }
  }, [me && me.id])
  return (
    <>
      <div>회원가입</div>
      <WrappedSignupForm />
    </>
  )
}

export default memo(Signup)
