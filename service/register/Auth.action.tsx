import AuthDataService from './Auth.service';
import React from 'react';

export function singUpAc(email :string) {
  return AuthDataService.signUp(email);
}
export function codeAc(code :string) {
  return AuthDataService.code(code);
}
export function forgotRequestEmailAc(email :string) {
  return AuthDataService.forgotRequestEmail(email);
}
export function informationAc(password: string,fullName:string) {
  return AuthDataService.information(password,fullName);
}
export function loginAc(password: string,userName:string) {
  return AuthDataService.login(password,userName);
}
export function forgotRequestAc(data: string,password:string) {
  return AuthDataService.forgotRequest(data,password);
}
export function forgotCodeAc(password: string,code:string) {
  return AuthDataService.forgotCode(password,code);
}