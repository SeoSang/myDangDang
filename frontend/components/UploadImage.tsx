import React, { useState } from "react"
import { Upload, message } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

const getBase64 = async (img: Blob, callback) => {
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

const Avatar = (imageUploaded) => {
  const [loading, setLoading] = useState(false)
  const [imgSrc, setimgSrc] = useState("")

  const handleChange = (info) => {
    try {
      if (info.file.status === "uploading") {
        setLoading(true)
        return
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imgSrc: string) => {
          setimgSrc(imgSrc)
          setLoading(false)
        })
      }
      console.log(imgSrc)
      imageUploaded(imgSrc)
    } catch (e) {
      console.error(e)
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
        {imgSrc ? <img src={imgSrc} alt='avatar' style={{ width: "100%" }} /> : uploadButton}
      </Upload>
    </div>
  )
}

export default Avatar
