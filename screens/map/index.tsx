import React, { useContext, useEffect, useRef, useState } from "react";
import { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { EvilIcons } from "@expo/vector-icons";

import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  StatusBar,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Svg,
  Image as ImageSvg,
  Defs,
  ClipPath,
  Circle,
  Rect,
} from "react-native-svg";
import Toast from "react-native-toast-message";
import Mark from "../../assets/images/markT.png";
import Home from "../../assets/images/homeOne.png";
import WebView from "react-native-webview";
import { SpaceH, SpaceW } from "../../components/space";
import styled from "styled-components/native";
import * as Location from "expo-location";
import frame from "../../assets/images/frame.png";
import filterIcon from "../../assets/images/filterIcon.png";
import searchIcon from "../../assets/images/search_normal.png";
import addMap from "../../assets/images/addMap.png";
import findMe from "../../assets/images/findMe.png";
import nullImage from "../../assets/images/nullImage.png";
import AppLoading from "expo-app-loading";
import Geolocation from "@react-native-community/geolocation";
import MapSearching from "./searchOnMap";
import { MapContext } from "../../service/map/Map.context";
import Navigation from "../../navigation";
import { ProfileContext } from "../../service/profile/Profile.context";
import { ObjectContext } from "../../service/object/Object.context";
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 45%;
  margin-top: auto;
  padding-left: 25;
`;
const TextFilter = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 20px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const TextFilterCheckBox = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 17px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const Click = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
`;
const ClickDelete = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;

  background: #0133aa;
  border-radius: 8px;
`;
const TextButtonDelete = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 18px;

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #ffffff;
`;
const ImageFrm = styled.Image`
  width: 50px;
  height: 50px;
`;
const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTwo: {
    width: width - 90,
    height: 150,
    backgroundColor: "#fff",
  },
  map: {
    height: "100%",
  },
  // Callout bubble
  bubbleC: {
    width: width - 40,
    height: 160,
  },
  bubble: {
    flexDirection: "row",
    padding: 15,
    width: width - 40,
    height: 160,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },

  // Character name
  name: {
    fontSize: 18,
    color: "#003E77",
    fontFamily: "Hurme",
    width: 120,
  },
  nameTitle: {
    fontSize: 14,
    fontFamily: "Hurme",
    color: "#7B93AF",
    width: 180,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
const customHTML = (image) =>
  `
  <html>
<body>
<img src=${findMe} alt="Paris" style="width:80%;height:80%; border-radius: 30px;">
</body>
</html>`;
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
  font-size: 18px;

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Hurme";

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
const IconLeft = styled.Image`
  width: 24px;
  height: 24px;
`;
const TouchSortLeft = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 20px;
`;
const ViewBottomMap = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 48px;
  height: 104px;
  right: 24px;
  bottom: 30px;
`;
const ImageBottomMap = styled.Image`
  width: 48px;
  height: 48px;
`;
import { useFonts } from "expo-font";
import { useDebounce } from "../../service/map/useDebounce";
import { ModalFilterTwo } from "./Filter";
import { BASE_URL } from "../../utils/main";
let latOld = 0;
let lngOld = 0;
let cul = 13;
let culTwo = "";
let culb = 0;
let culTwob = "";
let zoomLevel = "";
let global_lngInter;
let global_latInter;
let global_lngInterb;
let global_latInterb;
export default function MapScreen({ navigation }) {
  const [modelVisible, setModelVisible] = useState(false);
  const [modelVisibleSearch, setModelVisibleSearch] = useState(false);

  const [isPicture, setPicture] = useState(false);
  const [unPicture, setUnPicture] = useState(false);
  const [isLoadingComplete] = useFonts({
    Hurme: require("../../assets/fonts/LeagueGothic-Regular.ttf"),
  });
  const {
    MapFc,
    MapSearchMapFc,
    mapObjects,
    isLoadingMap,
    numberPage,
    setStopLoopRequest,
    setObjectCreate,
    objectCreate,
    setObjectCreateFilter,
    objectCreateFilter,
    setMapObjects,
    abortFc,
    signalFc,
  } = useContext(MapContext);
  const { profileFc } = useContext(ProfileContext);
  const {
    objectFc,
    objectTwoIdFc,
    objectTemplateFc,
    isShowObjectTwo,
    setIsShowObjectTwo,
    loadShowObjectTwo,
  } = useContext(ObjectContext);
  const [location, setLocation] = useState({
    latitude: 48.49213981185477,
    longitude: 11.405534230960301,
  });
  const [GPS, setGPS] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (isShowObjectTwo) {
      navigation.navigate("DetailPage");
      setIsShowObjectTwo(false);
    }
    return;
  }, [isShowObjectTwo]);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the LOCATION");
      } else {
        console.log("LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      mapRef?.current?.getCamera().then((cam) => {
        console.log(cam);

        cam.center.latitude = 48.4157770609369;
        cam.center.longitude = 11.455684032129676;
        cam.zoom = 5;
        mapRef?.current?.animateCamera(cam);
      });
      
    }, 2000);

    // requestCameraPermission();
   
    profileFc();
    objectFc(1, 100);
    return;
  }, []);
  const ModalFilter = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => {
          setModelVisible(false);
        }}
      >
        <Shadow>
          <PopUp>
            <SpaceH space={30} />
            <TextFilter>Filter object on map</TextFilter>
            <SpaceH space={30} />
            <View style={{ flexDirection: "row" }}>
              {isPicture ? (
                <TouchableOpacity
                  onPress={() => {
                    setPicture(false);
                    setUnPicture(false);
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      backgroundColor: "#0133aa",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setPicture(true);
                    setUnPicture(false);
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                  }}
                />
              )}
              <SpaceW space={15} />
              <TextFilterCheckBox>Pictured</TextFilterCheckBox>
            </View>
            <SpaceH space={20} />
            <View style={{ flexDirection: "row" }}>
              {!unPicture ? (
                <TouchableOpacity
                  onPress={() => {
                    setPicture(false);
                    setUnPicture(false);
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      backgroundColor: "#0133aa",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setPicture(false);
                    setUnPicture(true);
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                  }}
                />
              )}
              <SpaceW space={15} />
              <TextFilterCheckBox>Unpictured</TextFilterCheckBox>
            </View>
            <SpaceH space={40} />
            <View style={{ flexDirection: "row" }}>
              <ClickDelete
                onPress={() => {
                  
                  setModelVisible(false);
                }}
              >
                {/* <TextButtonDelete>{"Done"}</TextButtonDelete> */}
                <SpaceW space={15} />
                {/* <IconSrc source={IconDelete}/> */}
              </ClickDelete>
            </View>

            <Click
              onPress={() => {
                setModelVisible(false);
              }}
            >
              <ImageFrm source={frame} />
            </Click>
          </PopUp>
        </Shadow>
      </Modal>
    );
  };
  const ChildMemo = React.memo(ModalFilter);
  function getDifference(a, b) {
    console.log("Math.abs(a - b)", Math.abs(a - b));

    return Math.abs(a - b);
  }
  const mapRef = useRef(null);
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
      setLocation(gps.coords);
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
  const [clickedMarkerRef, setClickedMarkerRef] = useState(null);
  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };
  return (
    <>
      <View
        style={{
          backgroundColor: "#0133aa",
          width: `100%`,
          height: `100%`,
          paddingTop: useSafeAreaInsets().top - 20,
        }}
      >
        <Header>
          <StatusBar hidden />

          <TouchSortLeft
            onPress={() => {
              navigation.navigate("MapSearching");
            }}
          >
            <IconLeft source={searchIcon} />
          </TouchSortLeft>

          <Label style={{ fontFamily: "Hurme" }}>{"Map"}</Label>
          <TouchSort
            onPress={() => {
              setModelVisible(true);
            }}
          >
            <IconRight source={filterIcon} />
          </TouchSort>
        </Header>

        <MapView
          ref={mapRef}
          initialRegion={INITIAL_REGION}
          style={styles.map}
          showsUserLocation
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
          onRegionChangeComplete={(res) => {
          
            console.log(
              "getCamera",
              Math.log2(
                360 *
                  (Dimensions.get("window").width / 256 / res.longitudeDelta)
              ) + 1
            );
            let zoom = parseInt(
              Math.log2(
                360 *
                  (Dimensions.get("window").width / 256 / res.longitudeDelta)
              ) + 1
            );
            let latitudeDelta = res.latitudeDelta;
            let longitudeDelta = res.longitudeDelta;

            let lat = res.longitude + latitudeDelta / 2 + "";
            let lng = res.latitude + longitudeDelta / 2 + "";
            let latb = res.longitude - latitudeDelta / 2 + "";
            let lngb = res.latitude - longitudeDelta / 2 + "";

            if (res.latitude + 1 > 9) {
              global_latInter = parseFloat(lat);
              global_latInterb = parseFloat(latb);
            } else {
              global_latInter = parseFloat(lat);
              global_latInterb = parseFloat(latb);
            }
            if (res.longitude + 1 > 9) {
              global_lngInter = parseFloat(lng);
              global_lngInterb = parseFloat(lngb);
            } else {
              global_lngInter = parseInt(lng);
              global_lngInterb = parseInt(lngb);
            }
            zoomLevel = getDifference(zoom, 20);
            setObjectCreateFilter({
              ...objectCreateFilter,
              ...{
                screenX1: global_lngInterb,
                screenY1:global_latInterb ,
                screenX2:global_lngInter ,
                screenY2: global_latInter,
         
              },
            })
          }}
        >
          {mapObjects?.map((data, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: data.location.lat,
                  longitude: data.location.lng,
                }}
                key={index}
              >
                {data?.statusPicture ? (
                  <Image
                    style={{ width: 45, height: 45 }}
                    resizeMode={"contain"}
                    source={require("../../assets/images/Subtract.png")}
                  />
                ) : (
                  <Image
                    style={{ width: 45, height: 45 }}
                    resizeMode={"contain"}
                    source={require("../../assets/images/markT.png")}
                  />
                )}
                <Callout
                  key={index}
                  onPress={() => {
                    objectTwoIdFc(data._id);
                  }}
                >
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        objectTwoIdFc(data._id);
                      }}
                      style={styles.bubble}
                    >
                      {/* <Text>A short description</Text> */}

                      <Svg height="160" width="150">
                        <Defs>
                          <ClipPath id="clip">
                            <Rect
                              id="rect"
                              x="2%"
                              y="2%"
                              width="80%"
                              height="80%"
                              rx="15"
                            />
                          </ClipPath>
                        </Defs>
                        {data.symbolPhoto == "" ? (
                          <ImageSvg
                            width="100%"
                            height="100%"
                            opacity="1"
                            x="-5%"
                            y="-6%"
                            preserveAspectRatio="xMidYMid"
                            href={nullImage}
                            clipPath="url(#clip)"
                          />
                        ) : (
                          <ImageSvg
                            width="100%"
                            height="100%"
                            opacity="1"
                            preserveAspectRatio="none"
                            href={{
                              uri: `${BASE_URL}/api/v1/files/${data.symbolPhoto}`,
                            }}
                            clipPath="url(#clip)"
                          />
                        )}
                      </Svg>

                      <SpaceW space={15} />
                      <View style={{ right: 20 }}>
                        <Text numberOfLines={3} style={styles.name}>
                          {data.fullName}
                        </Text>
                        <SpaceH space={10} />
                        {data?.address?.length > 0 ? (
                          <Text numberOfLines={5} style={styles.nameTitle}>
                            {data?.address[0]?.address_on_map}
                          </Text>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <ModalFilterTwo
          culTwob={culTwob}
          culb={culb}
          culTwo={culTwo}
          cul={cul}
          onClose={() => setModelVisible(false)}
          open={modelVisible}
        />
        <ViewBottomMap>
          <TouchableOpacity
            onPress={() => {
              objectTemplateFc();
              navigation.navigate("AddOnMapScreen");
            }}
          >
            <ImageBottomMap source={addMap} />
          </TouchableOpacity>

          <SpaceH space={15} />
          <TouchableOpacity
            onPress={() => {
              watchLocation();
            }}
          >
            <ImageBottomMap source={findMe} />
          </TouchableOpacity>
        </ViewBottomMap>
      </View>
      {loadShowObjectTwo ? <Toast /> : null}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          width: 200,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            signalFc();
            setMapObjects([]);
            setTimeout(() => {
              setObjectCreate({
                ...objectCreate,
                ...{
                  screenX1: global_lngInterb,
                  screenY1:global_latInterb ,
                  screenX2:global_lngInter ,
                  screenY2: global_latInter,
           
                },
              });
            }, 100);
            
          }}
          style={{
            backgroundColor: "#ffff",
            width: 135,
            justifyContent: "center",
            height: 50,
            borderRadius: 50,
            alignItems: "center",
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: "Hurme", fontSize: 12 }}>
              {"Find Location"}
            </Text>
            <Text>{`Page ${!numberPage?.current ? 0 : numberPage?.current}/${
              !numberPage?.pages ? 0 : numberPage?.pages
            }`}</Text>
          </View>
          <SpaceW space={8}/>
          {isLoadingMap ? (
            <ActivityIndicator size={"small"} color={"#0133aa"} />
          ) : null}
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        {isLoadingMap ? (
          <TouchableOpacity
            onPress={() => {
              abortFc();
              setStopLoopRequest(true);
            }}
            style={{
              backgroundColor: "#ffff",
              width: 40,
              justifyContent: "center",
              height: 40,
              borderRadius: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
            }}
          >
            <EvilIcons name="close" size={20} color={"#000"} />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}
