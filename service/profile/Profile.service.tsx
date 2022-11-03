import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
// import Storage from '../../utils/storeData';
import { showToast } from 'react-native-gtoast';
import Toast from 'react-native-toast-message';
class ProfileDataService {
  profile() {
  

    return http
      .get(`/api/v1/users/profile?language=en`)
      .then(res => {
        console.log("SIGNUP_ADDRESS", res.data);
        // Storage.storeData('TOKEN', res.data.data.token);
        return res.data;
      })
      .catch(error => {
        console.log("SIGNUP_ADDRESS", error.response);
        Toast.show({
          type: 'error',
          text1: 'Spotting',
          text2: error?.response?.data?.message +`👋`
        });
        return false;
      });
  }
  
  userProfile(fullName: string,phoneNumber: string) {
    console.log(`/api/v1/users/profile`);
   const value = {
    fullName:fullName,
    phoneNumber:phoneNumber
   }
    return http
      .put(`/api/v1/users/profile`, value)
      .then(res => {
        console.log(`/api/v1/users/profile`, res);
        TOKEN.token = res.data.token;
        return true;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Spotting',
          text2: error?.response?.data?.message +`👋`
        });
        console.log(`/api/v1/Profile/users/signup/verify/email?language=en`, error)
        return false;
      });
  }
  userLanguage(language: string) {
    console.log(`/api/v1/users/profile/language?language=en`, language);
   const value = {
    language:language,
   }
    return http
      .put(`/api/v1/users/profile/language?language=${language}`)
      .then(res => {
        console.log(`/api/v1/Profile/users/signup/verify/email?language=en`, res);
        TOKEN.token = res.data.token;
        return true;
      })
      .catch(error => {
        showToast( error?.message, {
          duration: 3000
      })
        console.log(`/api/v1/Profile/users/signup/verify/email?language=en`, error)
        return false;
      });
  }
  userAvatar(file) {
    let formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: `photo.${file.type}`,
      type: `image/${file.type}`,
    });
    return http
      .put(`/api/v2/users/profile/avatar?language=en`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        //handle success
        console.log("ojectImage", response);
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Spotting',
          text2: error?.response?.data?.message +`👋`
        });
        console.log("ojectImageerror", error);
        //handle error
      });
  }
}
export default new ProfileDataService();
