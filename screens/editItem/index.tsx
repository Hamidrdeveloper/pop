import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import Icon from "../../assets/images/pen.png";
import Arrow from "../../assets/images/arrow.png";
import ImageOne from "../../assets/images/homeOne.png";
import ImageCamera from "../../assets/images/camera.png";
import IconTick from "../../assets/images/tick.png";
import IconDelete from "../../assets/images/fi_trash.png";
import * as ImagePicker from "expo-image-picker";
import ButtonOne from "../../assets/images/gallery.png";
import ButtonTwo from "../../assets/images/pickir.png";
import Toast from "react-native-toast-message";
import { manipulateAsync } from "expo-image-manipulator";

import { SpaceH, SpaceW } from "../../components/space";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import frame from "../../assets/images/frame.png";
import { ObjectContext } from "../../service/object/Object.context";
import Delete from "../../assets/images/u_trash.png";
import { MapContext } from "../../service/map/Map.context";
const ImageButton = styled.Image`
  width: 92%;
  height: 50px;
`;
const BackView = styled.ScrollView`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
`;
const IconRight = styled.Image`
  width: 35px;
  height: 35px;
  top: 5px;
`;
const TouchSortLeft = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 15px;
  top: 30px;
`;
const IconLeft = styled.Image`
  width: 24px;
  height: 24px;
`;
const Label = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;
  padding-left: 30px;
  padding-right: 30px;
  top: 5px;
  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Hurme";

  color: #ffffff;
`;

const Header = styled.View`
  width: 100%;
  height: 74px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const ImageHome = styled.Image`
  width: 100%;
  height: 220px;
  backgroundcolor: ;
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
const AddressText = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;
  color: #0133aa;
`;
const AddressTextSmall = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 14px;
  color: #0133aa;
`;
const Padding = styled.View`
  padding-left: 25px;
  padding-right: 25px;
`;
const Input = styled.TextInput`
  box-sizing: border-box;

  width: 100%;
  height: 40px;

  /* White */
  background: #ffffff;

  /* Gray/500 */
  border: 1px solid #6783a0;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  padding: 5px;
  font-family: "Hurme";
`;
const InputSearch = styled.TextInput`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  padding: 5px;
  background: #ffffff;
  border: 1px solid #aec1da;
  border-radius: 8px;
  font-family: "Hurme";
`;
const InputSearchBig = styled.TextInput`
  box-sizing: border-box;

  width: 100%;
  height: 120px;

  /* White */
  background: #ffffff;

  /* Gray/500 */
  border: 1px solid #6783a0;
  text-align-vertical: top;
  font-family: "Hurme";

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 5px;
`;
const LabelTextInput = styled.Text`
  width: 100%;
  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  padding-left: 5px;

  color: #0133aa;
`;
const ImageInToAdd = styled.Image`
  width: 40px;
  height: 40px;
`;
const TextIcon = styled.Text`
  width: 60px;

  font-family: "Hurme";
  font-style: normal;
  font-size: 10px;

  /* identical to box height, or 160% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
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
const TextButton = styled.Text`
  font-style: normal;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  font-family: "Hurme";
`;
const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
const IconSrcDelete = styled.Image`
  width: 15px;
  height: 15px;
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
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 33%;
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
const Click = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
`;
const ImageFrm = styled.Image`
  width: 50px;
  height: 50px;
`;
const ClickDelete = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 48px;

  background: #ff001f;
  border-radius: 8px;
`;
const ClickCancel = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 48px;
  border: 1.5px solid #445a74;
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
const TextButtonCancel = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #445a74;
`;
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 20px;
`;
const ImageDelete = styled.Image`
  width: 20px;
  height: 20px;
`;
const ImageDeleteTouch = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50px;
  right: 15px;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: `100%`,
    height: 200,
  },
});
import { Camera, CameraType } from "expo-camera";
import ModalPickerImage from "../map/addOnMap/ModalPicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../utils/main";

export default function EditItemPage({ navigation }) {
  const [modelVisible, setModelVisible] = useState(false);
  const {
    objectCreatePutFc,
    isEditObject,
    deleteObjectIdFc,
    objectsDetails,
    setIsEditObject,
    ojectDeleteMultiImageFc,
    isDeleteImage,
    setDeleteImage,
  } = useContext(ObjectContext);
  const [zip_code, setZipcode] = useState("");
  const [street_address_line_2, setStreet_address_line_2] = useState("");
  const [street_address, setStreet_address] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [information, setInformation] = useState("");
  const [addressBig, setAddressBig] = useState(objectsDetails.address);
  const [multiImage, setMultiImage] = useState([]);
  const [addressSave, setAddressSave] = useState([""]);
  const [modelVisiblePicker, setModelVisiblePicker] = useState(false);
  const [modelVisibleDelete, setModelVisibleDelete] = useState(false);

  const [addressObject, setAddressObject] = useState([objectsDetails.address]);

  useEffect(() => {
    if (isDeleteImage) {
      let value = multiImage.filter((res) => res.id != imageId);
      setMultiImage(value);
    }
  }, [isDeleteImage]);
  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      // do something
    } else {
      alert("Access denied");
    }
  };
  const {
    saveMarkAddress,
    setSaveMarkAddress,
    locationMark,
    setLocationMark,
    saveMarkInform,
  } = useContext(MapContext);
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
          address_on_map: saveMarkAddress,
          location: {
            lat: locationMark.lat,
            lng: locationMark.lng,
          },
        },
      };
      setAddressObject(add);
      setCity(saveMarkInform?.locality);
      setStreet_address(saveMarkInform?.route);
      setZipcode(saveMarkInform?.postalCode);
      setState(saveMarkInform?.administrative_area_level_1);
    }
  
  }, [saveMarkInform]);
 
  useEffect(() => {
    if (objectsDetails.address.length > 0) {
      setAddressObject(objectsDetails?.address);
      setSaveMarkAddress(objectsDetails?.address[0]?.address_on_map);
      setLocationMark(objectsDetails?.address[0]?.location);
      setZipcode(objectsDetails?.address[0]?.zip_code);
      setStreet_address_line_2(
        objectsDetails?.address[0]?.street_address_line_2
      );
      setStreet_address(objectsDetails?.address[0].street_address);
      setCity(objectsDetails?.address[0]?.city);
      setInformation(objectsDetails.address[0]?.information);
      setState(objectsDetails.address[0]?.state);
    }
  }, [objectsDetails]);

  const [fullName, setFullName] = useState();
  const [imageId, setImageId] = useState("");

  const address = objectsDetails.address;
  const [location, setLocation] = useState([1]);
  const [markers, setMarkers] = useState();
  const [image, setImage] = useState(null);
  useEffect(() => {
    __startCamera();
    setFullName(objectsDetails.fullName);
    var addressChange = [];
    objectsDetails.address?.map((res) => {
      addressChange.push(res.address);
    });
    setAddressSave(addressChange);
    setLocation({
      lat: objectsDetails?.location?.lat,
      lng: objectsDetails?.location?.lng,
    });
    let data = [];
    objectsDetails?.photoGallery.map((value) => {
      console.log(value.id);
      data.push({
        id: value.id,
        image: {
          uri: `${BASE_URL}/api/v1/files/${value.id}`,
        },
        exit: true,
      });
    });
    setMultiImage(data);
  }, []);

  useEffect(() => {
    if (isEditObject) {
      navigation.goBack();
      setIsEditObject(false);
    }
  }, [isEditObject]);

  function onMapPress(e, ids) {
    let id = 1;
    let lats = e?.nativeEvent?.coordinate.latitude;
    let lngs = e?.nativeEvent?.coordinate.longitude;

    Geocoder.from(lats, lngs)
      .then((json) => {
        let formatted_address = json.results[0].formatted_address;
        console.log(formatted_address);
        let changeAddress = address.map((res, index) => {
          if (ids - 1 === index) {
            return formatted_address;
          } else {
            return addressSave[index];
          }
        });
        console.log("changeAddress", changeAddress);
        setAddressSave(changeAddress);
      })
      .catch((error) => console.log(error));
    setMarkers({
      coordinate: e?.nativeEvent?.coordinate,
      key: id++,
      color: "red",
    });
    setLocation({
      lat: e?.nativeEvent?.coordinate.latitude,
      lng: e?.nativeEvent?.coordinate.longitude,
    });
  }
  useEffect(() => {
    console.log("addressSave", addressBig);
  }, [addressBig]);
  const [typeButtom, setTypeButtom] = useState("");

  const pickImageCameraMulti = async () => {
    __startCamera();
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
      console.log(result);
      console.log(manipulateResult);
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      setMultiImage([...multiImage, {id:rand, image: manipulateResult }]);
      setModelVisible(false);
      setModelVisiblePicker(false);
    }
  };
  const pickImageCamera = async () => {
    __startCamera();
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
      setImage(manipulateResult);
      setModelVisible(false);
      setModelVisiblePicker(false);
    }
  };
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
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
        { compress: 1 } // from 0 to 1 "1 for best quality"
      );
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      setMultiImage([...multiImage, { id:rand,image: manipulateResult }]);
      setModelVisible(false);
      setModelVisiblePicker(false);
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
      setModelVisiblePicker(false);
    }
  };
  const ModalPicker = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisiblePicker}
        onRequestClose={() => {
          setModelVisiblePicker(false);
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
                setModelVisiblePicker(false);
              }}
            >
              <ImageFrm source={frame} />
            </Click>
          </PopUp>
        </Shadow>
      </Modal>
    );
  };
  const ModalFilter = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisibleDelete}
        onRequestClose={() => {
          setModelVisibleDelete(false);
        }}
      >
        <Shadow>
          <PopUp>
            <SpaceH space={35} />
            <TextFilter>{"Are you sure delete\n this photo?"}</TextFilter>
            <SpaceH space={40} />
            <View style={{ flexDirection: "row" }}>
              <ClickCancel
                onPress={() => {
                  setModelVisibleDelete(false);
                }}
              >
                <TextButtonCancel>{"No"}</TextButtonCancel>
              </ClickCancel>
              <SpaceW space={15} />
              <ClickDelete
                onPress={() => {
                  ojectDeleteMultiImageFc(objectsDetails._id, imageId);
                  setModelVisibleDelete(false);
                }}
              >
                <TextButtonDelete>{"Delete"}</TextButtonDelete>
                <SpaceW space={15} />
                <IconSrc source={IconDelete} />
              </ClickDelete>
            </View>

            <Click
              onPress={() => {
                setModelVisibleDelete(false);
              }}
            >
              <ImageFrm source={frame} />
            </Click>
          </PopUp>
        </Shadow>
      </Modal>
    );
  };
  const renderInputBig = (value, id) => {
    console.log("renderInputBig", address);

    return (
      <View style={{ width: `100%`, backgroundColor: "#EEF4FC", padding: 15 }}>
        <LabelTextInput>{`Address on map*`}</LabelTextInput>
        <SpaceH space={15} />

        <SpaceH space={15} />

        <InputSearchBig
          editable={false}
          placeholder={saveMarkAddress}
          placeholderTextColor="gray" 
          onChangeText={(e) => {
            setSaveMarkAddress(e);
          }}
        />
        <SpaceH space={15} />
        {objectsDetails?.owner?
        <ButtonBoxFilter
          onPress={() => {
            navigation.navigate("MapSelect");
          }}
        >
          <TextButton>{"Choose on map"}</TextButton>
          <IconSrc source={IconTick} />
        </ButtonBoxFilter>
        :null}
        <SpaceH space={15} />
        <LabelTextInput>{"Street Address*"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          placeholder={street_address}
          placeholderTextColor="gray" 
          editable={objectsDetails?.owner}
          onChangeText={(e) => {
            setStreet_address(e);
            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ street_address: e } };
            setAddressObject(add);
            console.log(add);
          }}
        />
        <LabelTextInput>{"Street Address Line 2*"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          editable={objectsDetails?.owner}
          placeholder={street_address_line_2}
          placeholderTextColor="gray" 
          onChangeText={(e) => {
            setStreet_address_line_2(e);

            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ street_address_line_2: e } };
            setAddressObject(add);
            console.log(add);
          }}
        />
        <SpaceH space={15} />
        <View style={{ flexDirection: "row", width: `100%`, height: 80 }}>
          <View style={{ flex: 1 }}>
            <LabelTextInput>{"City*"}</LabelTextInput>
            <SpaceH space={15} />
            <InputSearch
              editable={objectsDetails?.owner}
              placeholder={city}
              placeholderTextColor="gray" 
              onChangeText={(e) => {
                setCity(e);
                let add = addressObject;
                let addIndex = add[0];
                add[0] = { ...addIndex, ...{ city: e } };
                setAddressObject(add);
                console.log(add);
              }}
            />
          </View>
          <SpaceW space={15} />
          <View style={{ flex: 1 }}>
            <LabelTextInput>{"State/Province*"}</LabelTextInput>
            <SpaceH space={15} />
            <InputSearch
              editable={objectsDetails?.owner}
              placeholder={state}
              placeholderTextColor="gray" 
              onChangeText={(e) => {
                setState(e);
                let add = addressObject;
                let addIndex = add[0];
                add[0] = { ...addIndex, ...{ state: e } };
                setAddressObject(add);
                console.log(add);
              }}
            />
          </View>
        </View>
        <LabelTextInput>{"Postal / Zip Code*"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          editable={objectsDetails?.owner}
          placeholder={zip_code}
          placeholderTextColor="gray" 
          onChangeText={(e) => {
            setZipcode(e);

            let add = addressObject;
            let addIndex = add[0];
            add[0] = { ...addIndex, ...{ zip_code: e } };
            setAddressObject([{}]);
            setAddressObject(add);
            console.log("setAddressObject", add);
          }}
        />
        <LabelTextInput>{"Information"}</LabelTextInput>
        <SpaceH space={15} />
        <InputSearch
          editable={objectsDetails?.owner}
          placeholder={information}
          placeholderTextColor="gray" 
          onChangeText={(e) => {
            setInformation(e);

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
      <StatusBar hidden />
      <View
        style={{
          backgroundColor: "#0133aa",
          width: `100%`,
          height: `100%`,
          paddingTop: useSafeAreaInsets().top - 20,
        }}
      >
        <BackView>
          <Header>
            <TouchSort
              onPress={() => {
                objectCreatePutFc(
                  fullName,
                  addressObject,
                  location,
                  image,
                  multiImage,
                  objectsDetails?.owner
                );
              }}
            >
              <IconRight resizeMode={"contain"} source={IconTick} />
            </TouchSort>
            <Label numberOfLines={1}>{objectsDetails.fullName}</Label>
            <TouchSortLeft
              onPress={() => {
                navigation.goBack();
              }}
            >
              <IconLeft resizeMode={"contain"} source={Arrow} />
            </TouchSortLeft>
          </Header>
          <View
            style={{ backgroundColor: "#CBE6FF", width: `100%`, height: 220 }}
          >
            {image == null ? (
              <ImageHome
                source={{
                  uri: `${BASE_URL}/api/v1/files/${objectsDetails.symbolPhoto}`,
                }}
              />
            ) : (
              <ImageHome source={{ uri: image?.uri }} />
            )}
            <FrameEditImag
              onPress={() => {
                setTypeButtom(" ");
                setModelVisiblePicker(true);
              }}
            >
              <IconSrcDelete source={Icon} />
              <SpaceW space={10} />
              <TextEditImag>{"Edit symbol photo"}</TextEditImag>
            </FrameEditImag>
          </View>

          <Padding>
            <SpaceH space={20} />
            <LabelTextInput>{"Full name *"}</LabelTextInput>

            <Input
              placeholder={objectsDetails.fullName}
              placeholderTextColor="gray" 
              onChangeText={(e) => setFullName(e)}
            />
            <SpaceH space={20} />
            {addressBig.map((data, index) => {
              return renderInputBig(data, index + 1);
            })}
            <SpaceH space={20} />
            {/* <ButtonBoxFilter
            onPress={() => {
              let value = 5;
              setAddressBig([...addressBig, value]);
              address.push("1");
            }}
          >
            <TextButton>{"Add more address"}</TextButton>
            <IconSrc source={IconTick} />
          </ButtonBoxFilter> */}
            <SpaceH space={20} />
            <View style={{ width: `100%` }}>
              <FlatList
                numColumns={3}
                data={[...multiImage, ...[{ image: "add" }]]}
                renderItem={({ item, index }) => {
                  console.log("multiImage", multiImage);

                  return (
                    <>
                      {index != multiImage.length ? (
                        <View
                          style={{
                            width: (Dimensions.get("window").width - 50) / 3,
                            height: 105,
                          }}
                        >
                          <ImageItem source={{ uri: item.image.uri }} />
                          <FrameDelete
                            onPress={() => {
                              if (item.exit) {
                                setImageId(item.id);
                                setModelVisibleDelete(true);
                              } else {
                                let value = multiImage.filter(
                                  (res) => res.id != item.id
                                );
                                setMultiImage(value);
                              }
                            }}
                          >
                            <IconSrcDelete source={IconDelete} />
                          </FrameDelete>
                        </View>
                      ) : (
                        <ImageAdd
                          onPress={() => {
                            setTypeButtom("multi");
                            setModelVisiblePicker(true);
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
            <SpaceH space={100} />
          </Padding>
          <ModalFilter />
          <ModalPickerImage
            pickImage={pickImage}
            pickImageMulti={pickImageMulti}
            pickImageCamera={pickImageCamera}
            pickImageCameraMulti={pickImageCameraMulti}
            typeButtom={typeButtom}
            open={modelVisiblePicker}
          />
        </BackView>
      </View>
      <Toast />
    </>
  );
}
