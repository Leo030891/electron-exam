export default function(correct, variant) {
  let key = ['A', 'B', 'C', 'D', 'E', 'F']
  let str = ''
  correct.forEach((c, i) => {
    if (variant === 2) {
      str += `${c}, `
    } else {
      if (c) str += `${key[i]}, `
    }
  })
  return str.trim().substring(0, str.length - 2)
}
