import AuthDataService from "./Object.service";
import React from "react";

export function objectAc(first: number, two: number) {
  return AuthDataService.oject(first, two);
}
export function objectTemplateAc() {
  return AuthDataService.objectTemplate();
}
export function ojectImageAc(file,id) {
  return AuthDataService.ojectImage(file,id);
}
export function ojectMultiImageAc(file,id) {
  return AuthDataService.ojectMultiImage(file,id);
}
export function ojectDeleteMultiImageAc(_id,_idImage) {
  return AuthDataService.deleteImageObjectId(_id,_idImage);
}

export function objectIdAc(id) {
  return AuthDataService.objectId(id);
}
export function deleteObjectIdAc(id) {
  return AuthDataService.deleteObjectId(id);
}


export function objectCreate(
  fullName: string,
  address: [],
  location,
  numberId: number
) {
  return AuthDataService.objectCreate(fullName, address, location, numberId);
}
export function objectCreatePut(
  fullName: string,
  address: [],
  location: { lat: number; lng: number },
  numberId: number
) {
  return AuthDataService.objectCreatePut(fullName, address, location, numberId);
}
