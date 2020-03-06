import React from "react"
import { Card } from "antd"
const { Meta } = Card

const BoastCard = ({ card }) => {
  return (
    <Card
      hoverable
      style={{ width: 250, maxHeight: 400, textAlign: "center", margin: "0 auto" }}
      cover={<img style={{ width: 250, maxHeight: 250 }} alt='example' src={card.img} />}
    >
      <Meta style={{ maxHeight: 150 }} title={card.title} description={card.description} />
    </Card>
  )
}

export default BoastCard
