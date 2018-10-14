export default function(correct) {
  let key = ['A', 'B', 'C', 'D', 'E', 'F']
  let str = ''
  correct.forEach((c, i) => {
    if (c) str += `${key[i]}, `
  })
  return str.trim().substring(0, str.length - 2)
}
