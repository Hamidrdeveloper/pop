import React, { useEffect, useState } from 'react'
import { Container, Logo, TextLogo, VerLogo } from './style/splash.style'
import LogoSource from '../../assets/images/Touch.png'
import Ver from '../../assets/images/ver.png'
import { SpaceH } from '../../components/space'
import Storage from '../../utils/storeData/index'
import httpCommon from '../../utils/http-common'
import { navigationStatic } from '../../utils/main'
import * as Location from 'expo-location'
import { PermissionsAndroid } from 'react-native'
import Geocoder from "react-native-geocoding";
import { Camera, CameraType } from 'expo-camera';
export default function SplashScreen({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
 if(status === 'granted'){
   // do something

 }else{
  alert("Access denied")
 }
}
  navigationStatic.navigation=navigation;
  const [location, setLocation] = useState();
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const last = await Location.getLastKnownPositionAsync();
      if (last) setLocation(last);
      else {
        const current = await Location.getCurrentPositionAsync();
        setLocation(current);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Location App Location Permission",
          message:
            "Cool Photo App needs access to your location " +
            "so you can take awesome location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  useEffect(() => {
    __startCamera();
    requestCameraPermission()
    getLocation();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      Storage.retrieveData("User").then(res=>{
        console.log("retrieveData",res);

        if(res==null){
          navigation.replace("Welcome")

        }else{
          httpCommon.defaults.headers.common.Authorization = `Bearer ${res}`;

          navigation.replace("Root")

        }
      });
    }, 3000);

  
    return ;
  }, [])
  
  return (
    <Container>
        <Logo source={LogoSource}/>
        <SpaceH space={15}/>
        <TextLogo>{"HIGH PERFORMANCE INVESTORS."}</TextLogo>
        <VerLogo resizeMode={'contain'} source={Ver}/>
    </Container>
  )
}
