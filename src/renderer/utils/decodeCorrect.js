import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function(correct, variant) {
  let key = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  let str = ''
  let arr = []
  correct.forEach((c, i) => {
    if (variant === 0 || variant === 1) {
      if (c) str += `${key[i]}, `
    } else if (variant === 2) {
      str += `${c.text}, `
    } else if (variant === 3) {
      arr.push(<Typography key={i} variant="subtitle1">{`${i + 1}. ${c.text}`}</Typography>)
    }
  })
  return variant < 3 ? str.trim().substring(0, str.length - 2) : arr
}
