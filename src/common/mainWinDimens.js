import { screen } from 'electron'

export default function() {
  const { width, height } = screen.getPrimaryDisplay().size
  let mainWidth = Math.round(width * 0.85)
  let mainHeight = Math.round(height * 0.85)
  return [mainWidth, mainHeight]
}
