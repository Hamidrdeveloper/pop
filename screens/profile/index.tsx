import React, { useContext, useState } from "react";
import RightIcon from "../../assets/images/setting.png";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Storage from '../../utils/storeData/index'
import Toast from 'react-native-toast-message';
import Profile from "../../assets/images/profile.png";
import Pen from "../../assets/images/pen.png";
import frame from "../../assets/images/frame.png";
import logout from "../../assets/images/logout.png"
import logoutRed from "../../assets/images/logoutred.png"

import privacy from "../../assets/images/shield-keyhole-line.png";
import book from "../../assets/images/u_book-alt.png";
import info from "../../assets/images/fi_info.png";

import { SpaceH, SpaceW } from "../../components/space";
import DropDownPicker from "react-native-dropdown-picker";
import { ProfileContext } from "../../service/profile/Profile.context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../utils/main";

const Padding = styled(View)`
  padding: 24px;
`;

const ViewRow = styled(View)`
  flex-direction: row;
  width: 100%;
`;
const ViewTouch= styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
 
`;
const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
`;
const Header = styled.View`
  width: 100%;
  height: 64px;
  left: 0px;
  padding-top:10px;
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
  top:5px;
`;
const ImageProfile = styled.Image`
  box-sizing: border-box;
  background: rgba(206, 217, 245, 0.24);
  width: 80px;
  height: 80px;
  border: 2px solid #ffffff;
  filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
`;
const ImagePen = styled.Image`
  box-sizing: border-box;
  width: 18px;
  height: 18px;
`;
const TextName = styled.Text`


  font-family: "Hurme";
  font-style: normal;
  
  font-size: 18px;
  display: flex;
  align-items: center;

  color: #003e77;
`;
const TextNameSmall = styled.Text`


  font-family: "Hurme";
  font-style: normal;
  
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #003e77;
`;
const ViewButton = styled.TouchableOpacity`
  box-sizing: border-box;
  align-items: flex-start;
  right: 0;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #0133aa;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  top: 15;
`;
const FrameImage = styled.Image`
  width: 32px;
  height: 32px;

  background: rgba(206, 217, 245, 0.24);
  border-radius: 10px;
`;
const TextNameTools = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  
  font-size: 15px;
  color: #003e77;
`;
const TextIcon = styled.Text`
  width: 52px;
  height: 16px;

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 10px;

  /* identical to box height, or 160% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;
const ButtonBoxFilter = styled.View`
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
  height: 24px;
  font-style: normal;
  
  font-size: 18px;
  text-align: center;
  color: #ffffff;
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
  height: 35%;
  margin-top: auto;
  padding-left: 25;
`;
const TextFilter = styled.Text`

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 20px;
  width: 70%;

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
  width: 90%;
  height: 48px;
  background: #ff001f;
  border-radius: 8px;
`;
const ClickDone = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;

  background: rgba(1, 51, 170, 1);
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
export default function ProfileScreen({navigation}) {
  const [modelVisible, setModelVisible] = useState(false);
  const [modelVisibleSetting, setModelVisibleSetting] = useState(false);
  const {profile,userLanguageFc} = useContext(ProfileContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Germany", value: "de" },
  ]);
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
            <SpaceH space={35} />
            <TextFilter>Are you sure to want to exit?</TextFilter>
            <SpaceH space={60} />
            <View style={{ flexDirection: "row" }}>
              <ClickDelete
                onPress={() => {
                  Storage.removeData("User")
                  navigation.navigate("SignIn")
                  setModelVisible(false);
                }}
              >
                <TextButtonDelete>{"Exit"}</TextButtonDelete>
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
  const ModalFilterDrop = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisibleSetting}
        onRequestClose={() => {
          setModelVisible(false);
        }}
      >
        <Shadow>
          <PopUp>
            <SpaceH space={35} />
            <TextFilter>Setting</TextFilter>
            <SpaceH space={30} />
            
            <SpaceH space={60} />
            <View style={{ flexDirection: "row" }}>
              <ClickDone
                onPress={() => {
                    userLanguageFc(value)
                    setModelVisibleSetting(false);
                }}
              >
                <TextButtonDelete>{"Done"}</TextButtonDelete>
                <SpaceW space={15} />
                {/* <IconSrc source={IconDelete}/> */}
              </ClickDone>
            </View>
            <View style={{width:`90%`,position:'absolute',top:80,left:25}}>
            <DropDownPicker
              placeholder="Select a language"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ borderColor: "rgba(174, 193, 218, 1)", width: `100%` }}
            />
            </View>
            <Click
              onPress={() => {
                setModelVisibleSetting(false);
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

    <BackView>
      <Header>
        <Label>{"Profile"}</Label>
        <TouchSort
          onPress={() => {
            setModelVisibleSetting(true);
          }}
        >
          <IconRight  resizeMode="contain" source={RightIcon} />
        </TouchSort>
      </Header>
      <Padding>
        <ViewRow>
          <ImageProfile  source={{uri:`${BASE_URL}/api/v1/files/${profile.avatar}`}}/>
          <SpaceW space={15} />
          <View>
            <TextName>{profile?.fullName}</TextName>
            <SpaceH space={30} />
            <TextNameSmall>{profile?.email}</TextNameSmall>
            <SpaceH space={5} />
            <TextNameSmall>{profile?.phoneNumber}</TextNameSmall>
            <SpaceH space={5} />
          </View>
          <ViewButton onPress={()=>{navigation.navigate("EditProfileScreen")}}>
            <ImagePen source={Pen} />
          </ViewButton>
        </ViewRow>
        <SpaceH space={40} />
        <ViewRow>
          <FrameImage resizeMode={'contain'} source={info} />
          <SpaceW space={15} />
          <TextNameTools>{"About us"}</TextNameTools>
        </ViewRow>
        <SpaceH space={20} />
        <ViewTouch>
          <FrameImage resizeMode={'contain'} source={book}/>
          <SpaceW space={15} />
          <TextNameTools>{"Roles and Permissions"}</TextNameTools>
        </ViewTouch>
        <SpaceH space={20} />
        <ViewTouch>
          <FrameImage resizeMode={'contain'} source={privacy}/>
          <SpaceW space={15} />
          <TextNameTools>{"Privacy"}</TextNameTools>
        </ViewTouch>
        <SpaceH space={20} />
        <ViewTouch onPress={()=>{setModelVisible(true)}}>
          <FrameImage resizeMode={'contain'} source={logoutRed}/>
          <SpaceW space={15} />
          <TextNameTools>{"Exit"}</TextNameTools>
        </ViewTouch>
      </Padding>
      <StatusBar hidden />
      <ModalFilter />
      <ModalFilterDrop />
      <Toast />
    </BackView>
    </View>
  );
}
