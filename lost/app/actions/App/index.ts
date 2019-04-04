
import { boardcast } from 'febrest'
function toast(data: any) {
  boardcast('TOAST', data)
}

function alert(data:any) {
  boardcast('alert', data)
}

export default {
  toast,
  alert
}