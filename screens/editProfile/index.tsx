import React, { useContext, useEffect, useState,useRef } from "react";
import RightIcon from "../../assets/images/setting.png";
import styled from "styled-components/native";
import styledP from "styled-components/native";
import {manipulateAsync} from 'expo-image-manipulator';

import { StatusBar } from "expo-status-bar";
import { View ,Modal,TouchableOpacity} from "react-native";
import Profile from "../../assets/images/profile.png";
import frame from "../../assets/images/frame.png";
import Toast from 'react-native-toast-message';
import Pen from "../../assets/images/pen.png";
import * as ImagePicker from 'expo-image-picker';
import Arrow from "../../assets/images/arrow.png";
import ButtonOne from "../../assets/images/gallery.png";
import ButtonTwo from "../../assets/images/pickir.png";
import { SpaceH, SpaceW } from "../../components/space";
import { Dimensions } from "react-native";
import { ProfileContext } from "../../service/profile/Profile.context";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const hight = Dimensions.get('screen').height;
const Padding = styled(View)`
  padding: 24px;
  height:${hight-130};
`;

const ViewRow = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items:center;
  justify-content: center;
`;

const BackView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  /* Gray/0 */
  background: #ffffff;
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
  top:10px;

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;

const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const ImageProfile = styled.Image`
  box-sizing: border-box;

  width: 110px;
  height: 110px;
  border: 2px solid #ffffff;
  filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  align-self:center;
  background-color:rgba(206, 217, 245, 0.24);
`;
const ImagePen = styled.Image`
  box-sizing: border-box;
  width: 18px;
  height: 18px;
`;
const TextName = styled.Text`
  height: 24px;

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 18px;
  display: flex;
  align-items: center;

  color: #003e77;
`;
const TextNameSmall = styled.Text`
  height: 24px;

  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #003e77;
`;
const ViewButton = styled.View`
  box-sizing: border-box;
  align-items: flex-start;
  right: 0;
  top:90;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #0133aa;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  align-items: center;
  justify-content: center;

`;
const FrameImage = styled.View`
  width: 32px;
  height: 32px;

  background: rgba(206, 217, 245, 0.24);
  border-radius: 8px;
`;
const TextNameTools = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  
  font-size: 15px;
  color: #003e77;
`;
const LabelEdit = styled.Text`
  width: 310px;

  font-style: normal;
  font-size: 12px;
  color: #0133aa;
  font-family: "Hurme";

`;
const PhoneInputTS = styledP(PhoneInput)`
  box-sizing: border-box;
  width: 310px;
  height: 40px;
  padding:5px;
  margin-top: 10px;
  /* White */
  background: #ffffff;
  font-family: "Hurme";

  /* Gray/500 */
  border: 1px solid #6783a0;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const TextInput = styled.TextInput`
  box-sizing: border-box;
  width: 310px;
  height: 40px;
  padding:5px;
  margin-top: 10px;
  /* White */
  background: #ffffff;
  font-family: "Hurme";

  /* Gray/500 */
  border: 1px solid #6783a0;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const ButtonNextClickDisable = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  position: absolute;
  bottom:0;
  left:24;
  width: 310px;
  height: 48px;
  background:rgba(1, 51, 170,0.3);
  border: 1.5px solid #0133aa;
  border-radius: 8px;
`;
const ButtonNextClick = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  position: absolute;
  bottom:0;
  left:24;
  width: 310px;
  height: 48px;
  background:#0133aa;
  border: 1.5px solid #0133aa;
  border-radius: 8px;
`;
const TextBlue = styled.Text`
  font-style: normal;
  font-size: 15px;
  color: #fff;
  font-family: "Hurme";

`;
const LabelRequer = styled.Text`
  width: 310px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 10px;
  color: red;
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
const ImageButton = styled.Image`
  width: 92%;
  height: 50px;
`;


const TouchSortLeft = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 15px;
  top: 30px;
`;



const ImageHome = styled.Image`
  width: 100%;
  height: 220px;
  backgroundColor:
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
const InputSearchBig = styled.TextInput`
  box-sizing: border-box;

  width: 100%;
  height: 114px;

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
const LabelTextInput = styled.TextInput`
  width: 100%;

  padding:5px;

  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  line-height: 12px;
  font-family: "Hurme";

  /* identical to box height, or 100% */

  color: #0133aa;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
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
  position:absolute;
  top:50px;
  right:15px;
`;
import { Camera, CameraType } from 'expo-camera';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../utils/main";

export default function EditProfileScreen({navigation}) {
  const {userProfileFc,userAvatarFc,profile} = useContext(ProfileContext);
  const [image, setImage] = useState(null);

  const [fullName, setFullName] = useState(profile?.fullName)
  const [formattedValue, setFormattedValue] = useState("")
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
       { compress: 1 } // from 0 to 1 "1 for best quality"
   );
      setImage(manipulateResult.uri);
      userAvatarFc(manipulateResult)
      setModelVisiblePicker(false)
    }
   
  };
  useEffect(() => {
    __startCamera();
  },[])
  const pickImageCamera = async () => {
    __startCamera();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 640, height: 480 } }],
       { compress: 1 } // from 0 to 1 "1 for best quality"
   );
      setImage(manipulateResult.uri);
      userAvatarFc(manipulateResult)
      setModelVisiblePicker(false)

    }
  };
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
 if(status === 'granted'){
   // do something

 }else{
  alert("Access denied")
 }
}
  const [typeButtom, setTypeButtom] = useState('')
  const [modelVisiblePicker, setModelVisiblePicker] = useState(false);3
  const [chackphone, setCheckPhone] = useState(false);
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
              <TouchableOpacity onPress={()=>{pickImage()}}>
              <ImageButton resizeMode={'contain'} source={ButtonOne}/>
              </TouchableOpacity>
              <SpaceH space={10} />
              <TouchableOpacity onPress={()=>{pickImageCamera()}}>
              <ImageButton  resizeMode={'contain'} source={ButtonTwo}/>
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
  return (
    <View  style={{backgroundColor: '#0133aa',width:`100%`,height:`100%`,paddingTop: useSafeAreaInsets ().top-20 }} >

    <View style={{width: '100%', height: '100%',backgroundColor:"#fff"}}>
    <KeyboardAwareScrollView>
    <BackView>
      <Header>
     
        <Label>{"Edit Profile"}</Label>
        <TouchEdit
          onPress={()=>{navigation.goBack()}}>
          <IconLeft resizeMode={"contain"} source={Arrow} />
          </TouchEdit>
      </Header>
      <Padding>
        <ViewRow onPress={()=>setModelVisiblePicker(true)}>
          <ImageProfile source={{uri:image==null?`${BASE_URL}/api/v1/files/${profile.avatar}`:
        image}} />
          <SpaceW space={15} />
          <ViewButton>
            <ImagePen source={Pen} />
          </ViewButton>
        </ViewRow>
        <SpaceH space={40} />
        <LabelEdit>{"First Name"}</LabelEdit>
        <TextInput placeholder={profile.fullName} onChangeText={(e)=>{setFullName(e)}}/>
        <SpaceH space={15} />
        <LabelEdit>{"Email"}</LabelEdit>
        <TextInput placeholder={profile.email} />
        <SpaceH space={15} />
        <LabelEdit>{"Phone Number"}</LabelEdit>
        <PhoneInputTS
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DE"
            autoFocus={false}
            containerStyle={{ boxSizing: 'border-box',
              width: 310,
              height: 50,
              marginTop: 10,
              /* White */
              background: '#ffffff',
              fontFamily: "Hurme",
            
              /* Gray/500 */
              border: '1px solid #6783a0',
            
              /* White BTN */
              borderWidth:1,borderColor:"#6783a0",
              borderRadius: 8}}
              textInputStyle={{ 
              borderRadius: 8,}}
              textContainerStyle={{ 
                borderRadius: 8,}}
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
        <SpaceH space={5}/>
        <LabelRequer>{"Your phone number must be start with + and code country example:+49"}</LabelRequer>
        <SpaceH space={40} />
        <ButtonNextClick onPress={()=>{userProfileFc(fullName,phoneNumber)
        navigation.goBack()}}>
          <TextBlue>{"Done"}</TextBlue>
        </ButtonNextClick>
        
      </Padding>
      <StatusBar hidden />
      <ModalPicker/>
      <Toast />
    </BackView>
    </KeyboardAwareScrollView>
    </View>
    </View>
  );
}
