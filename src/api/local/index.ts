import data from './data.json'

export function getReply(keyword: string) {
  const isHumble = () => Math.random() > 0.5

  let fix: string
  if (isHumble()) {
    fix = randomGet(data.humble) + randomGet(data.apology) + '。' + randomGet(data.end)
  } else {
    fix = randomGet(data.straightforward)
  }

  keyword = keyword.replace(/(^\s|\s$)/g, '')
  fix = fix.replace(/q/g, keyword)

  return `${data.always_start_with}\n${fix}`
}

function randomGet(arr: any[]) {
  const length = arr.length
  const random = Math.floor(Math.random() * length)
  return arr[random]
}
