import Head from "next/head"
import React from "react"
import Link from "next/link"
import { TitleDiv } from "../components/AppLayout"
import styled from "styled-components"
import { Context } from "../custom/types/general"
import { RESET_EXCPEPT_USER } from "../custom/types/reducerTypes_user"

export const IndexTitleDiv = styled(TitleDiv)`
  border: none;
  background: none;
  cursor: default;
`
export const IndexUl = styled.ul`
  list-style: none;
  margin: 10px auto;
  padding: 0px;
  text-align: center;
  max-width: 900px;
  width: 100%;
`

export const IndexLi = styled.li`
  display: block;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #efefef;
  font-size: 25px;
  cursor: pointer;
`

const Home = () => (
  <div className='container'>
    <Head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main>
      <IndexTitleDiv>
        <h1 style={{ display: "inline-block", color: "#eb4d4b" }}>My</h1>
        <h1 style={{ display: "inline-block", color: "#f0932b" }}>Dang</h1>
        <h1 style={{ display: "inline-block", color: "#f9ca24" }}>Dang</h1>
      </IndexTitleDiv>
      <IndexUl>
        <Link href='/boast'>
          <IndexLi>나만의 이쁜 댕댕이를 자랑하고 공유하세요~</IndexLi>
        </Link>
        <Link href='/randomdog'>
          <IndexLi>귀여운 댕댕이들을 구경하세요! </IndexLi>
        </Link>
        <Link href='/quiz'>
          <IndexLi>댕댕이 상식 퀴즈 ~!</IndexLi>
        </Link>
      </IndexUl>
    </main>
  </div>
)

Home.getInitialProps = async (context: Context) => {
  context.store.dispatch({
    type: RESET_EXCPEPT_USER,
  })
  return
}

export default Home
