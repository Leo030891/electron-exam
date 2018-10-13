import path from 'path'
import url from 'url'

const inDev = process.env.NODE_ENV === 'development'

export default function() {
  return inDev
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
}
