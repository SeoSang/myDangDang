import React from "react"
import { Upload, message } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

function getBase64(img, callback) {
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

class Avatar extends React.Component {
  state = {
    loading: false,
  }

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      )
    }
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div>Upload</div>
      </div>
    )
    const { imageUrl }: any = this.state
    return (
      <div style={{ display: "inline-block", textAlign: "center" }}>
        <Upload
          name='avatar'
          listType='picture-card'
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          className='avatar-uploader'
        >
          {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: "100%" }} /> : uploadButton}
        </Upload>
      </div>
    )
  }
}

export default Avatar