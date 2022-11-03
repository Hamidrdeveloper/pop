import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import styled from "styled-components/native";
import { SpaceH } from "../../../components/space";
import { View ,Dimensions, Image, TouchableOpacity, Platform} from "react-native";
import IconTick from "../../../assets/images/tick.png";
import { MapContext } from "../../../service/map/Map.context";
import { navigationStatic } from "../../../utils/main";
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import findMe from "../../../assets/images/findMe.png";

const InputSearchBig = styled.TextInput`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  padding: 5px;
  /* White */
  background: #ffffff;
  /* Gray/200 */
  border: 1px solid #aec1da;
  border-radius: 8px;
  font-family: "Hurme";
  text-align-vertical: top;
`;
const Header = styled.View`
  width: 100%;
  height: 64px;
  left: 0px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const Label = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 18px;

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 20px;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const LabelTextInput = styled.Text`
  width: 100%;
  font-family: "Hurme";

  font-size: 12px;
  color: #0133aa;
`;
const ImageBottomMap = styled.Image`
  width: 48px;
  height: 48px;
`;
export default function MapSelect({navigation}) {
  const [location, setLocation] = useState([1]);
  const mapRef = React.useRef(null);

  const [addressSave, setAddressSave] = useState([""]);
  const [markers, setMarkers] = useState();
  const [addressBig, setAddressBig] = useState([1]);
 const {saveMarkAddress, setSaveMarkAddress,setLocationMark,setSaveMarkInform} = useContext(MapContext)
  function onMapPress(e) {
    let id = 1;
    let lats = e?.latitude;
    let lngs = e?.longitude;
   
    setLocationMark({lat:e?.latitude,lng:e?.longitude});
    Geocoder.from(lats, lngs)
      .then((json) => {
        let formatted_address = json.results[0].formatted_address;
        console.log(formatted_address);
        setSaveMarkAddress(formatted_address);
        let changeAddress = addressBig.map((res, index) => {
          //   if (ids - 1 === index) {
          return formatted_address;
          //   }
          //   else {
          //     return addressSave[index];
          //   }
        });
        const { long_name: postalCode = '' } =
        json.results[0].address_components.find(c => c.types.includes('postal_code')) || {};
        const {  long_name: administrative_area_level_1 = '' } =
        json.results[0].address_components.find(c => c.types.includes('administrative_area_level_1')) || {};
        const { long_name:locality=''} =
        json.results[0].address_components.find(c => c.types.includes('locality')) || {};
        const { long_name:route=''} =
        json.results[0].address_components.find(c => c.types.includes('route')) || {};
    console.log("postalCode",postalCode+"=="+locality+"==" +administrative_area_level_1+"=="+route);
    
        setSaveMarkInform({postalCode:postalCode,locality:locality,administrative_area_level_1:administrative_area_level_1,route:route})
        setAddressSave(changeAddress);
      })
      .catch((error) => console.log(error));
    setMarkers({
      coordinate: e?.nativeEvent?.coordinate,
      key: id,
      color: "red",
    });
    setLocation({
      lat: e?.latitude,
      lng: e?.longitude,
    });
  }
  const [GPS, setGPS] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [locationMe, setLocationMe] = useState({
    latitude: 48.49213981185477,
    longitude: 11.405534230960301,
  });
  function watchLocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const gps = await Location.getCurrentPositionAsync({
        accuracy:
          Platform.OS == "android"
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
      });
      setLocationMe(gps.coords);
      setGPS(gps.coords);
      console.log(gps);
      // let r = {
      //   latitude: location.latitude,
      //   longitude: location.longitude,
      //   latitudeDelta: 0.5,
      //   longitudeDelta: 0.5,
      // };

      // mapRef?.current?.getCamera().then((cam) => {
      //   console.log(cam);
      //   cam.center.latitude = gps.coords.latitude;
      //   cam.center.longitude = gps.coords.longitude;
      //   cam.zoom += 8;
      //   mapRef?.current?.animateCamera(cam);
      // });

      // mapRef.current?.animateToRegion(
      //   {
      //     latitude:  gps.coords.latitude,
      //     longitude: gps.coords.longitude,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   },
      //   2000
      // )
    })();
  }
  useEffect(() => {
    if (GPS.latitude != 0) {
      let r = {
        latitude: GPS.latitude,
        longitude: GPS.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };

      // mapRef?.current?.getCamera().then((cam) => {
      //   console.log(cam);
      //   cam.center.latitude = GPS.latitude;
      //   cam.center.longitude =GPS.longitude;
      //   cam.zoom += 8;
      //   mapRef?.current?.animateCamera(cam);
      // });

      mapRef.current?.animateToRegion(
        {
          latitude: GPS.latitude,
          longitude: GPS.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        2000
      );
    }
  }, [GPS]);
  return (
    <>
        <View  style={{backgroundColor: '#0133aa',width:`100%`,height:`100%`,paddingTop: useSafeAreaInsets ().top-20 }} >

    <View style={{backgroundColor:"#fff",width:`100%`,height:`100%`}}>
      <Header>
        <Label>{"Please choose on map"}</Label>
        <TouchSort onPress={() => {
            navigation.goBack()
        }}>
          <IconRight source={IconTick} />
        </TouchSort>
      </Header>
      <View   style={{ width: `90%`, height: 300,marginTop:15,borderRadius:15 ,alignSelf: 'center',}}>
      <MapView
      ref={mapRef}
      mapPadding={{top: 0, right: 0, bottom: 500, left: 0}}
        style={{ width: `100%`, height: 300,justifyContent:'center',borderRadius:15}}
        showsUserLocation
        onRegionChangeComplete={(e)=>{
          onMapPress(e)
        }}
      >
        <Image style={{width:40,height:40,alignSelf:'center',justifyContent: 'center',}} source={require('../../../assets/images/pin.png')}/>
       
      </MapView>
      <View style={{position:'absolute',bottom:10,left:10}}>
      <TouchableOpacity
            onPress={() => {
              watchLocation();
            }}
          >
            <ImageBottomMap source={findMe} />
          </TouchableOpacity>
      </View>
      </View>
      <SpaceH space={15} />
      <View style={{ padding: 15 }}>
        <LabelTextInput>{"Address on map*"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearchBig
          value={addressSave[0]}
          onChangeText={(e) => {
            setSaveMarkAddress(e);
            let changeAddress = addressBig.map((res, index) => {
              console.log("changeAddress", res);

              //   if (id - 1 === index) {
              return e;
              //   } else {
              //     return addressSave[index];
              //   }
            });
            setAddressSave(changeAddress);
          }}
        />
      </View>
      <Toast />
      </View>
      </View>
    </>
  );
}
