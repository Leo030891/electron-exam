import React from 'react'
import Typography from '@material-ui/core/Typography'

function StaticItem({ text, style }) {
  return (
    <div style={{ ...style }} className="static-order-choice">
      <Typography variant="subtitle1">{text}</Typography>
    </div>
  )
}

function StaticList({ order, choices }) {
  let list = []
  for (let i = 0; i < choices.length; i++) {
    let { text } = order ? choices[order[i]] : choices[i]
    let correct = order ? order[i] === i : false
    list.push({ text, correct })
  }
  return (
    <div className="static-order">
      {list.map((l, i) => (
        <StaticItem
          key={i}
          text={l.text}
          style={{
            border: `2px dashed ${l.correct ? 'rgb(1, 139, 244)' : 'rgb(185, 185, 185)'}`
          }}
        />
      ))}
    </div>
  )
}

export default StaticList
