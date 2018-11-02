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
    let { text } = choices[order[i]]
    let correct = order[i] === i
    list.push({ text, correct })
  }
  return (
    <div className="static-order">
      {list.map((l, i) => (
        <StaticItem
          key={i}
          text={l.text}
          style={{
            border: `2px dashed ${l.correct ? 'rgb(1, 139, 244)' : 'lightgrey'}`
          }}
        />
      ))}
    </div>
  )
}

export default StaticList
