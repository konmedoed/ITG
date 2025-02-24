import { FormEvent } from "react";

export function formPlug(e:FormEvent){
  e.preventDefault();
  console.log(`doesn't reload`)
}


//переделать, а то ключи повторяются
export function selectCreator(array:string[]) {
  const layout = array.map((item, index) => <option key={`select${index}`} value={item}>{item}</option>)

  return layout.map(item => item)
}