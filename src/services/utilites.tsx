import { FormEvent } from "react";

export function formPlug(e:FormEvent){
  e.preventDefault();
  console.log(`doesn't reload`)
}