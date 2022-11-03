import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import RightIcon from "../../../assets/images/setting.png";
import FrameImageSrc from "../../../assets/images/freamImage.png";
import { SpaceH, SpaceW } from "../../../components/space";
import IconTick from "../../../assets/images/tick.png";
import ImageOne from "../../../assets/images/homeOne.png";
import IconDelete from "../../../assets/images/fi_trash.png";
import ImageCamera from "../../../assets/images/camera.png";
import ButtonOne from "../../../assets/images/gallery.png";
import ButtonTwo from "../../../assets/images/pickir.png";
import Delete from "../../../assets/images/u_trash.png";
import Arrow from "../../../assets/images/arrow.png";
import Toast from "react-native-toast-message";
import frame from "../../../assets/images/frame.png";
import { ObjectContext } from "../../../service/object/Object.context";
import * as ImagePicker from "expo-image-picker";
import ToastTwo from "../../../components/toast";
import { MapContext } from "../../../service/map/Map.context";
import ProgressView from "../../../components/progress";
const BackView = styled.ScrollView`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  opacity: 0.9;
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
const ImageInToAdd = styled.Image`
  width: 40px;
  height: 40px;
`;
const TextIcon = styled.Text`
  width: 100px;

  font-family: "Hurme";
  font-style: normal;

  font-size: 10px;

  /* identical to box height, or 160% */
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
  width: 35px;
  height: 35px;
`;
const InputSearch = styled.TextInput`
  box-sizing: border-box;
  width: 100%;
  height: 40px;

  padding: 5px;

  /* White */
  background: #ffffff;
  /* Gray/200 */
  border: 1px solid #aec1da;
  font-family: "Hurme";

  border-radius: 8px;
`;
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

const Padding = styled(View)`
  padding: 24px;
  align-items: center;
`;
const ViewImage = styled(TouchableOpacity)`
  width: 100%;
  height: 194px;
  background: #cbe6ff;
  align-items: center;
  justify-content: center;
`;
const FrameImage = styled(Image)`
  width: 72px;
  height: 72px;
`;
const TextImage = styled(Text)`
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: #0133aa;
`;
const LabelTextInput = styled.Text`
  width: 100%;
  font-family: "Hurme";

  font-size: 12px;
  color: #0133aa;
`;
const ButtonBoxFilter = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  height: 48px;
  background: #0133aa;
  border-radius: 8px;
`;
const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
const TextButton = styled.Text`
  font-style: normal;
  font-family: "Hurme";

  font-size: 18px;
  text-align: center;
  color: #ffffff;
`;
const FrameDelete = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 4px;
  top: 4px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;
const FrameEditImag = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 10px;

  position: absolute;
  width: 161px;
  height: 32px;
  left: 16px;
  top: 16px;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 6px;
`;
const TextEditImag = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 13px;

  /* identical to box height, or 123% */
  text-align: center;

  color: #ffffff;

  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
`;
const IconSrcDelete = styled.Image`
  width: 15px;
  height: 15px;
`;
const ImageItem = styled.Image`
  width: ${(Dimensions.get("window").width - 60) / 3};
  height: 98px;
  border-radius: 6px;
`;
const ImageAdd = styled.TouchableOpacity`
  width: ${(Dimensions.get("window").width - 60) / 3};
  height: 98px;
  border-radius: 6px;
  background: #0133aa;
  align-items: center;
  padding-top: 10;
`;
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 40%;
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
  height: 24px;
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
  width: 360px;
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
const ImageButton = styled.Image`
  width: 92%;
  height: 50px;
`;
const ImageDelete = styled.Image`
  width: 20px;
  height: 20px;
`;
const ImageDeleteTouch = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 40px;
  right: 15px;
`;
const TouchEdit = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 25px;
`;
const IconLeft = styled.Image`
  width: 20px;
  height: 20px;
`;
const photo = {
  id: 0,
};
import { manipulateAsync } from "expo-image-manipulator";
import { Camera, CameraType } from 'expo-camera';
import ModalPickerImage from "./ModalPicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddOnMapScreen({ navigation }) {
  const { objectTemplateFc, objectCreateFc, isAddObject, setIsAddObject } =
    useContext(ObjectContext);
  const { saveMarkAddress, setSaveMarkAddress, locationMark, saveMarkInform,setSaveMarkInform } =
    useContext(MapContext);

  const [fullName, setFullName] = useState(null);
  const [addressBig, setAddressBig] = useState([1]);
  const [location, setLocation] = useState([1]);
  const [addressSave, setAddressSave] = useState([""]);
  const [multiImage, setMultiImage] = useState([]);
  const [typeButtom, setTypeButtom] = useState("");
  const [addressObject, setAddressObject] = useState([
    { street_address_line_2: "", information: "" },
  ]);

  let address = [""];
  const [markers, setMarkers] = useState();
  const [image, setImage] = useState(null);
  const [modelVisible, setModelVisible] = useState(false);
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [street_address_line_2, setstreet_address_line_2] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [street_address, setstreet_address] = useState('');

  const [toast, setToast] = useState(false);
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
 if(status === 'granted'){
   // do something

 }else{
  alert("Access denied")
 }
}
  useEffect(() => {
    if (saveMarkInform!=null) {
      let add = addressObject;
      let addIndex = add[0];
      add[0] = {
        ...addIndex,
        ...{
          city: saveMarkInform?.locality,
          street_address: saveMarkInform?.route,
          state: saveMarkInform?.administrative_area_level_1,
          zip_code: saveMarkInform?.postalCode,
        },
      };
      setAddressObject(add);
      setcity(saveMarkInform?.locality)
      setstreet_address( saveMarkInform?.route)
      setzip_code(saveMarkInform?.postalCode)
      setstate(saveMarkInform?.administrative_area_level_1)
      
    }
    console.log('====================================');
    console.log(saveMarkInform);
    console.log('====================================');
  }, [saveMarkInform]);
  useEffect(() => {
    if (isAddObject) {
      setSaveMarkInform(null)
      navigation.navigate("TabOne");
      setIsAddObject(false);
    }
  }, [isAddObject]);
  useEffect(() => {
    objectTemplateFc();
    setSaveMarkAddress("");
    __startCamera();
  }, []);
  useEffect(() => {
    console.log("====================================");
    console.log("addressSave", addressSave);
    console.log("====================================");
  }, [addressSave]);

  const mapRef = React.useRef(null);

  // function onMapPress(e, ids) {
  //   let id = 1;
  //   let lats = e?.nativeEvent?.coordinate.latitude;
  //   let lngs = e?.nativeEvent?.coordinate.longitude;

  //   Geocoder.from(lats, lngs)
  //     .then((json) => {

  //       let formatted_address = json.results[0].formatted_address;
  //       console.log(formatted_address);
  //       let changeAddress = addressBig.map((res, index) => {

  //         if (ids - 1 === index) {
  //           return formatted_address;
  //         } else {
  //           return addressSave[index];
  //         }
  //       });
  //       console.log("changeAddress", changeAddress);
  //       setAddressSave(changeAddress);
  //     })
  //     .catch((error) => console.log(error));
  //   setMarkers({
  //     coordinate: e?.nativeEvent?.coordinate,
  //     key: id++,
  //     color: "red",
  //   });
  //   setLocation({
  //     lat: e?.nativeEvent?.coordinate.latitude,
  //     lng: e?.nativeEvent?.coordinate.longitude,
  //   });

  // }
  useEffect(() => {
    console.log(multiImage);
    setTypeButtom([]);
  }, [multiImage]);
  const pickImageMulti = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      photo.id = photo.id + 1;
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
        { compress: 1 } // from 0 to 1 "1 for best quality"
      );
      setMultiImage([...multiImage, { id: photo.id, image: manipulateResult }]);

      setModelVisible(false);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
        { compress: 1 } // from 0 to 1 "1 for best quality"
      );
      setImage(manipulateResult);
      setModelVisible(false);
    }
  };
  const pickImageCameraMulti = async () => {
   
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      photo.id = photo.id + 1;
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
        { compress: 1 } // from 0 to 1 "1 for best quality"
      );
      setMultiImage([...multiImage, { id: photo.id, image: manipulateResult }]);
      setModelVisible(false);
    }
  };
  const pickImageCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
        { compress: 1 } // from 0 to 1 "1 for best quality"
      );
      console.log(manipulateResult);

      setImage(manipulateResult);
      setModelVisible(false);
    }
  };
  const ModalPicker = () => {
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
            <SpaceH space={35} />
            <TextFilter>Upload photo</TextFilter>
            <SpaceH space={40} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  typeButtom != "multi" ? pickImage() : pickImageMulti();
                }}
              >
                <ImageButton resizeMode={"contain"} source={ButtonOne} />
              </TouchableOpacity>
              <SpaceH space={10} />
              <TouchableOpacity
                onPress={() => {
                  typeButtom != "multi"
                    ? pickImageCamera()
                    : pickImageCameraMulti();
                }}
              >
                <ImageButton resizeMode={"contain"} source={ButtonTwo} />
              </TouchableOpacity>
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
  useEffect(() => {
    let add = addressObject;
    let addIndex = add[0];
    add[0] = {
      ...addIndex,
      ...{
        address_on_map: saveMarkAddress,
        location: {
          lat: locationMark.lat,
          lng: locationMark.lng,
        },
      },
    };
    setAddressObject(add);
    console.log(add);
  }, [saveMarkAddress]);
  const renderInputBig = (value, id) => {
    console.log("renderInputBig", addressSave[id - 1]);

    return (
      <View style={{ width: `100%`, backgroundColor: "#EEF4FC", padding: 15 }}>
        <LabelTextInput>{`Address on map*`}</LabelTextInput>
        <SpaceH space={15} />

        <SpaceH space={15} />

        <InputSearchBig
          editable={false}
          value={saveMarkAddress}
          onChangeText={(e) => {
            setSaveMarkAddress(e);
          }}
        />
        <SpaceH space={15} />
        <ButtonBoxFilter
          onPress={() => {
            navigation.navigate("MapSelect");
          }}
        >
          <TextButton>{"Choose on map"}</TextButton>
          <IconSrc source={IconTick} />
        </ButtonBoxFilter>
        <SpaceH space={15} />
        <LabelTextInput>{"Street Address*"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
        value={street_address}
          onChangeText={(e) => {
            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ street_address: e } };
            setAddressObject(add);
            setstreet_address(e);
            console.log(add);
          }}
        />
        <LabelTextInput>{"Street Address Line 2"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          value={street_address_line_2}
          onChangeText={(e) => {
            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ street_address_line_2: e } };
            setAddressObject(add);
            setstreet_address_line_2(e);
            console.log(add);
          }}
        />
        <SpaceH space={15} />
        <View style={{ flexDirection: "row", width: `100%`, height: 70 }}>
          <View style={{ flex: 1 }}>
            <LabelTextInput style={{ flex: 1 }}>{"City*"}</LabelTextInput>
            <SpaceH space={15} />
            <InputSearch
             value={city}
              onChangeText={(e) => {
                let add = addressObject;
                let addIndex = add[0];
                add[0] = { ...addIndex, ...{ city: e } };
                setAddressObject(add);
                setcity(e);
                console.log(add);
              }}
            />
          </View>
          <SpaceW space={15} />
          <View style={{ flex: 1 }}>
            <LabelTextInput style={{ flex: 1 }}>
              {"State/Province*"}
            </LabelTextInput>
            <SpaceH space={15} />
            <InputSearch
              value={state}
              onChangeText={(e) => {
                let add = addressObject;
                let addIndex = add[0];
                add[0] = { ...addIndex, ...{ state: e } };
                setAddressObject(add);
                setstate(e);
                console.log(add);
              }}
            />
          </View>
        </View>
        <LabelTextInput>{"Postal / Zip Code*"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          value={zip_code}
          onChangeText={(e) => {
            value={zip_code}
            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ zip_code: e } };
            setAddressObject(add);
            setzip_code(e);
            console.log(add);
          }}
        />
        <LabelTextInput>{"Information"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          onChangeText={(e) => {
            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ information: e } };
            setAddressObject(add);
            console.log(add);
          }}
        />
        <SpaceH space={15} />
        {id != 1 ? (
          <ImageDeleteTouch
            onPress={() => {
              let data = addressBig.filter((va) => {
                return va !== value;
              });
              setAddressBig(data);
            }}
          >
            <ImageDelete source={Delete} />
          </ImageDeleteTouch>
        ) : null}
        <SpaceH space={15} />
      </View>
    );
  };
  return (
    <>
          <View  style={{backgroundColor: '#0133aa',width:`100%`,height:`100%`,paddingTop: useSafeAreaInsets ().top-20 }} >

      <BackView>
        <StatusBar hidden />

        <Header>
          <Label>{"Add an object"}</Label>
          <TouchEdit
            onPress={() => {
              setSaveMarkInform(null)

              navigation.goBack();
            }}
          >
            <IconLeft resizeMode={"contain"} source={Arrow} />
          </TouchEdit>
          <TouchSort
            onPress={() => {
              console.log("TouchSort", address[0].length);
              if (
                fullName == null ||
                Object.keys(addressObject[0]).length < 8
              ) {
                setToast(true);
              } else {
                objectCreateFc(
                  fullName,
                  addressObject,
                  location,
                  image,
                  multiImage
                );
              }
            }}
          >
            <IconRight resizeMode={"contain"} source={IconTick} />
          </TouchSort>
        </Header>
        <ViewImage
          onPress={() => {
            setTypeButtom("e");
            setModelVisible(true);
          }}
        >
          {image != null ? (
            <Image
              style={{ width: `100%`, height: `100%` }}
              source={{ uri: image?.uri }}
            />
          ) : (
            <>
              <FrameImage source={FrameImageSrc} />
              <SpaceH space={15} />
              <TextImage>{"Add a symbol photo"}</TextImage>
            </>
          )}
        </ViewImage>
        <Padding>
          <LabelTextInput>{"Full name *"}</LabelTextInput>
          <SpaceH space={15} />
          <InputSearch onChangeText={(e) => setFullName(e)} />
          <SpaceH space={15} />
          {addressBig.map((data, index) => {
            return renderInputBig(data, index + 1);
          })}
          {/* <SpaceH space={15} /> */}
          {/* <ButtonBoxFilter
            onPress={() => {
              address.push("1");
              let value = addressBig.length + 1;
              setAddressBig([...addressBig, value]);
            }}
          >
            <TextButton>{"Add more address"}</TextButton>
            <IconSrc source={IconTick} />
          </ButtonBoxFilter> */}
          <SpaceH space={20} />
          <View style={{ width: `100%` }}>
            <FlatList
              numColumns={3}
              data={[...multiImage,...[{ image: "add" }]]}
              renderItem={({ item, index }) => {
                console.log(index + "" + multiImage.length);

                return (
                  <>
                    {index != multiImage.length  ? (
                      <View
                        style={{
                          width: (Dimensions.get("window").width - 50) / 3,
                          height: 105,
                        }}
                      >
                        <ImageItem source={{ uri: item.image.uri }} />
                        <FrameDelete
                          onPress={() => {
                            let value = multiImage.filter(
                              (res) => res.id != item.id
                            );
                            setMultiImage(value);
                          }}
                        >
                          <IconSrcDelete source={IconDelete} />
                        </FrameDelete>
                      </View>
                    ) : (
                      <ImageAdd
                        onPress={() => {
                          setTypeButtom("multi");

                          setModelVisible(true);
                        }}
                      >
                        <ImageInToAdd
                          resizeMode={"contain"}
                          source={ImageCamera}
                        />
                        <SpaceH space={15} />
                        <TextIcon>{"Add photo"}</TextIcon>
                      </ImageAdd>
                    )}
                  </>
                );
              }}
            />
            <SpaceH space={15} />
          </View>
        </Padding>
        <ModalPickerImage
        pickImage={pickImage}
        pickImageMulti={pickImageMulti}
        pickImageCamera={pickImageCamera}
        pickImageCameraMulti={pickImageCameraMulti}
        typeButtom={typeButtom}
        open={modelVisible} />
        <ToastTwo
          show={"error"}
          onBack={() => {
            setToast(false);
          }}
          text={"All fields must be filled"}
          onToast={toast}
        />
      </BackView>
      </View>
      <ProgressView show={isAddObject} />
      <Toast />
    </>
  );
}
