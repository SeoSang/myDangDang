import React, { useCallback } from "react"
import { Card, Popover, Button } from "antd"
import { NextPage } from "next"
import { DangDangPost } from "../custom/types/reducerTypes_post"
const { Meta } = Card

const BoastCard: NextPage<{ card: DangDangPost }> = ({ card }) => {
  const onReviseCard = useCallback((id) => () => {}, [])
  const onRemoveCard = useCallback((id) => () => {}, [])
  const popoverContent = (
    <div>
      <Button onClick={onReviseCard}>수정</Button>
      <Button onClick={onRemoveCard}>삭제</Button>
    </div>
  )
  return (
    <Popover content={popoverContent} title='...님의 카드'>
      <Card
        hoverable
        style={{ width: 250, maxHeight: 400, textAlign: "center", margin: "0 auto" }}
        cover={<img style={{ width: 250, maxHeight: 250 }} alt='example' src={card.image?.src} />}
      >
        <Meta style={{ maxHeight: 150 }} title={card.title} description={card.description} />
      </Card>
    </Popover>
  )
}

export default BoastCard
