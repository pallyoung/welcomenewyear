
import { boardcast } from 'febrest'
function toast(data: any) {
  boardcast('sys.toast', data)
}

function alert(data:any) {
  boardcast('sys.alert', data)
}

export default {
  toast,
  alert
}