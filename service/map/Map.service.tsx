import React from "react";
import PropTypes from "prop-types";
import http from "../../utils/http-common";
import { TOKEN } from "../../utils/main";
// import Storage from '../../utils/storeData';
import { showToast } from "react-native-gtoast";
import Toast from "react-native-toast-message";
let controller = new AbortController();

class ObjectDataService {
  ojectSearch(first?: number, two?: number, object?: string) {
    return http
      .get(`/api/v1/map/search?skip=1&limit=100&fullName=${object}`)
      .then((res) => {
        console.log("SIGNUP_ADDRESS", res.data);

        // Storage.storeData('TOKEN', res.data.data.token);
        return res.data;
      })
      .catch((error) => {
        console.log("SIGNUP_ADDRESS error", error.response);
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        return false;
      });
  }

  objectSearchMap(obj:any) {
    
    console.log('====================================');
    console.log(obj);
    console.log('====================================');
    return http
      .get(
        `/api/v2/map/objects`,{params:obj, signal: controller.signal}
      )
      .then((res) => {
        // console.log('============objectSearchMap========================');
        // console.log(res);
        // console.log('==========objectSearchMap==========================');
        return  res?.data;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Spotting",
          text2: error?.response?.data?.message + `👋`,
        });
        console.log(`/api/v1/map/objects`, error);
        return [];
      });
  }
  abort() {
    controller.abort()

  }
  signal() {
    controller = new AbortController();


  }
}
export default new ObjectDataService();
