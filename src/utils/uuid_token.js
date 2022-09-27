import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能发生变化
export const getUUID = () => {
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  if (!uuidToken) {
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  // 切记要有返回值 没有返回值结果是undefined
  return uuidToken
}
