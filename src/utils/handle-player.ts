export function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}`
}

export function getSongSourceByPlayUrl(id: number) {
  console.log('准备请求资源', id)
  const res = getSongPlayUrl(id)
  console.log('res资源请求完毕', res)
  return res
}
