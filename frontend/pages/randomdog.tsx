import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button, Row } from "antd"
import { CenterDiv, MainImageDiv, MainImage } from "../styles/divs"

const DOGAPI_URL = `https://dog.ceo/api/breeds/image/random`

function randomdog() {
  const [image, setImage] = useState("")

  const onClickGetDog = async () => {
    const { data } = await axios.get(DOGAPI_URL)
    setImage(data.message)
    return data
  }

  useEffect(() => {}, [])

  return (
    <CenterDiv>
      <MainImageDiv>
        <MainImage src={image}></MainImage>
      </MainImageDiv>
      <Row>
        <Button onClick={onClickGetDog}>랜덤 댕댕이 추출</Button>
      </Row>
    </CenterDiv>
  )
}

export default randomdog
