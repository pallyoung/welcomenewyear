
import {
  query,
  update
 } from 'febrest'

function search(payload: { keyword: string, curPage: string }) {
  return query('music','search',payload).then(data=>{
    return data;
  })
}

export default  {
  search
}