import React from "react"
import Head from "next/head"
import AppLayout from "../components/AppLayout"

const MyDangDang = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MyDangDang</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css'
        ></link>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        <link
          href='https://fonts.googleapis.com/css?family=Lilita+One&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

MyDangDang.getInitialProps = async context => {
  // 제일먼저 실행되는 사이클 (프론트, 서버 둘다 실행됨)
  const { ctx } = context
  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default MyDangDang
