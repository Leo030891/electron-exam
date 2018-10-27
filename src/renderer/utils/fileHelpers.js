import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const getStats = promisify(fs.stat)

export function readDirectory(dir, filenames) {
  var promises1 = []
  var promises2 = []
  filenames.forEach(file => promises1.push(readFile(path.join(dir, file))))
  filenames.forEach(file => promises2.push(getStats(path.join(dir, file))))
  var arr = [promises1, promises2, filenames]
  return Promise.all(arr.map(el => Promise.all(el)))
}

export function getFilename(filepath) {
  return filepath.split('\\').pop()
}

export function formatFilename(str) {
  return (
    str
      .toLowerCase()
      .trim()
      .replace(/\s/g, '-') + '.json'
  )
}
