import React from "react";
import PropTypes from "prop-types";
import http from "../../utils/http-common";
import { TOKEN } from "../../utils/main";
import Storage from "../../utils/storeData";
import { showToast } from "react-native-gtoast";
import {Platform} from 'react-native'
import Toast from "react-native-toast-message";
class ObjectDataService {
  objectTemplate() {
    return http
      .get(`/api/v1/users/objects/template`)
      .then((res) => {
        console.log("template", res.data);

        return res.data.object_id;
      })
      .catch((error) => {
        console.log("SIGNUP_ADDRESS", error.response);
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        return false;
      });
  }
  oject(first: number, two: number) {
    return http
      .get(`/api/v1/users/objects?skip=${first}&limit=${two}`)
      .then((res) => {
        console.log("ojectFist", res.data);
        console.log(res.request.status);
        return res.data;
      })
      .catch((error) => {
        console.log("ojectFistErr", error.response);
        console.log(error.response.status);
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });

        return error.response.status;
      });
  }

  ojectImage(file, id) {
    let formData = new FormData();
    formData.append("symbolPhoto", {
      uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri, 
      name: `photo.${file.type}`,
      type: `image/${file.type}`,
    });

    return http
      .put(`/api/v2/users/objects/${id}/symbolPhoto`, formData, {
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
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log("ojectImageerror", error);
        
        //handle error
      });
  }
  ojectMultiImage(file, id) {
    let formData = new FormData();
    formData.append("photo", {
      uri: file.uri,
      name: `photo.${file.type}`,
      type: `image/${file.type}`,
    });
    return http
      .post(`/api/v2/users/objects/${id}/objectPhoto`, formData, {
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
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log("ojectImageerror", error);
        //handle error
      });
  }

  objectCreate(fullName: string, address: [], location, numberId: number) {
    console.log(`/api/v1/users/objects/${numberId}`);
    const value = {
      fullName: fullName,
      address: address,
    };
    console.log(`objectCreate`, value);
    return http
      .post(`/api/v1/users/objects/${numberId}`, value)
      .then((res) => {
        console.log(
          `/api/v1/Object/users/signup/verify/email?language=en`,
          res
        );

        return true;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log(
          `/api/v1/Object/users/signup/verify/email?language=en`,
          error
        );
        return false;
      });
  }
  objectCreatePut(
    fullName: string,
    address: [],
    location: { lat: number; lng: number },
    numberId: number
  ) {
    const value = {
      fullName: fullName,
      address: address,
    };
    console.log("objectCreatePut",value);
    
    return http
      .put(`/api/v1/users/objects/${numberId}`, value)
      .then((res) => {
        console.log(
          `/api/v1/Object/users/signup/verify/email?language=en`,
          res
        );
        return true;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log(
          `/api/v1/Object/users/signup/verify/email?language=en`,
          error
        );
        return false;
      });
  }

  objectId(_id) {
    return http
      .get(`/api/v1/map/search/${_id}`)
      .then((res) => {
        console.log(`objectId====>`, res);
        return res.data;
      })
      .catch((error) => {
        console.log(`objectId====>`, error);
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
      
        
        return {};
      });
  }
  deleteImageObjectId(_id,_idImage) {
    return http
      .delete(`/api/v2/users/objects/${_id}/objectPhoto/${_idImage}`)
      .then((res) => {
        console.log(`deleteObjectId`, res);
        return true;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log(`deleteObjectId`, error);
        return false;
      });
  }
  
  deleteObjectId(_id) {
    return http
      .delete(`/api/v1/users/objects/${_id}`)
      .then((res) => {
        console.log(`deleteObjectId`, res);
        return res.data;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log(`deleteObjectId`, error);
        return {};
      });
  }
}
export default new ObjectDataService();
