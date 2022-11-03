import AuthDataService from "./Map.service";
import React from "react";

export function ojectSearchAc(first?:number,two?:number,object?:string) {
  return AuthDataService.ojectSearch(first, two,object);
}
export function ojectSearchMapAc(obj:any) {
  return AuthDataService.objectSearchMap(obj);
}
export function abortAc() {
  return AuthDataService.abort();
}
export function signalAc() {
  return AuthDataService.signal();
}
