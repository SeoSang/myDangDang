import React, { useState } from "react"
import { Upload, message } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { UploadChangeParam } from "antd/lib/upload"

export const getBase64 = async (img: Blob, callback: any) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 20
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return isJpgOrPng && isLt2M
}

interface UploadImageProps {
  handleChange: any
  image_64: string
}

const Avatar = (props: UploadImageProps) => {
  const { handleChange, image_64 } = props
  const uploadButton = (
    <div>
      <div>Upload</div>
    </div>
  )

  return (
    <div style={{ display: "inline-block", textAlign: "center" }}>
      <Upload
        name='avatar'
        listType='picture-card'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        className='avatar-uploader'
      >
        {image_64 !== "" ? (
          <img src={image_64} alt='avatar' style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}

export default Avatar
