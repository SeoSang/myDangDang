import React from "react"
import Head from "next/head"
import withRedux from "next-redux-wrapper"
import withReduxSaga from "next-redux-saga"
import AppLayout from "../components/AppLayout"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import "../components/UploadImage.css"
import { StoreState } from "../reducers"
import rootSaga from "../sagas"
import axios from "axios"

import { Middleware, applyMiddleware, compose, createStore, Store } from "redux"
import { AllActionTypes, Context } from "../custom/types/general"
import reducer from "../reducers"
import { AppPropsType } from "next/dist/next-server/lib/utils"
import { LOAD_USER_REQUEST } from "../custom/types/reducerTypes_user"

export interface MyAppPropsType extends AppPropsType {
  store: Store
}

const MyDangDang = ({ Component, store, pageProps }: MyAppPropsType) => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

MyDangDang.getInitialProps = async (context: any) => {
  // 제일먼저 실행되는 사이클 (프론트, 서버 둘다 실행됨)
  const { ctx } = context
  const state = ctx.store.getState()
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ""
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie // 모든 axios 에 적용
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
      userId: -1,
    })
  }
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
  const store: any = createStore(reducer, initialState as any, composedEnhancers)
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default withRedux(middle)(withReduxSaga(MyDangDang))
