import React from "react"
import { Card } from "antd"
const { Meta } = Card

const BoastCard = ({ card }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, maxHeight: 400, textAlign: "center", margin: "0 auto" }}
      cover={<img style={{ maxHeight: 280 }} alt='example' src={card.img} />}
    >
      <Meta title={card.title} description={card.description} />
    </Card>
  )
}

export default BoastCard
