import { ElMessage } from 'element-plus'

type MType = 'success' | 'info' | 'warning' | 'error'

const DTIP = '这是一个提示'
const DType: MType = 'success'
const Duration:number=1000
export function Message(tip = DTIP, type = DType, duration=Duration, rule?: () => boolean) {
  if (rule) {
    if (rule()) {
      ElMessage({
        message: tip,
        type: type,
        duration:duration
      })
    }
  } else {
    ElMessage({
      message: tip,
      type: type,
      duration:duration
    })
  }
}