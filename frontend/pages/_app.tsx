import React from "react"
import Head from "next/head"
import AppLayout from "../components/AppLayout"
import createSagaMiddleware from "redux-saga"
import "../components/UploadImage.css"
import { StoreState } from "../reducers"
import rootSaga from "../sagas"

import { Middleware, applyMiddleware, compose, createStore } from "redux"
import { AllActionTypes } from "../custom/types/general"
import reducer from "../reducers"

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

MyDangDang.getInitialProps = async (context) => {
  // 제일먼저 실행되는 사이클 (프론트, 서버 둘다 실행됨)
  const { ctx } = context

  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx)
  }
  return { pageProps }
}

const middle = (initialState: StoreState, options: any) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares: Middleware[] = [
    sagaMiddleware,
    (store) => (next: any) => (action: AllActionTypes) => {
      console.log(action)
      next(action) // 엑션 로그받는 미들웨어
    },
  ]
  const composedEnhancers =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer && typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
            : (f: any) => f,
        )
  const store = createStore(reducer, initialState as any, composedEnhancers)
  ;(store as any).sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default MyDangDang
