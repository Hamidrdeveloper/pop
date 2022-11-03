import AuthDataService from './Profile.service';
import React from 'react';

export function profileAc() {
  return AuthDataService.profile();
}
export function userProfileAc(fullName: string,phoneNumber: string) {
  return AuthDataService.userProfile(fullName,phoneNumber);
}
export function userLanguageAc(language: string) {
  return AuthDataService.userLanguage(language);
}
export function userAvatarAc(file) {
  return AuthDataService.userAvatar(file);
}