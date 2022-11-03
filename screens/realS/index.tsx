import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import Navigation from "../../navigation";
import RightIcon from "../../assets/images/rightIcon.png";
import ImageReal from "../../assets/images/realHome.jpg";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import Icon from "../../assets/images/tick.png";
import frame from "../../assets/images/frame.png";
import { ObjectContext } from "../../service/object/Object.context";
import Toast from 'react-native-toast-message';
import nullImage from "../../assets/images/nullImage.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../utils/main";
const width = Dimensions.get("screen").width;

const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items: center;
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

const Header = styled.View`
  width: 100%;
  height: 64px;
  left: 0px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const Frame = styled.TouchableOpacity`
  box-sizing: border-box;

  width: ${width - 30};
  height: 115px;

  background: #ffffff;
  border: 1px solid #eaedf2;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
`;
const ImageCard = styled.Image`
  position: absolute;
  width: 99px;
  height: 99px;
  left: 5px;
  top: 5px;
  border-radius: 8px;
`;
const Title = styled.Text`
  position: absolute;
  width: 178px;
  left: 120px;
  top: 18px;

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 14px;
  line-height: 16px;

  /* identical to box height, or 114% */
  display: flex;
  align-items: center;

  color: #003e77;
`;

const TitleSmall = styled.Text`
  position: absolute;
  width: 219px;
  left: 120px;
  top: 50px;

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 12px;
  line-height: 16px;

  /* or 133% */
  display: flex;
  align-items: center;

  color: #7b93af;
`;
const ViewFlat = styled.View`
  padding: 15px;
  padding-top: 30px;

  width: 100%;
  height: 93%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 45%;
  margin-top: auto;
  padding-left: 25;
`;
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const TextFilter = styled.Text`
  width: 144px;
 
  font-family: "Hurme";
  font-style: normal;
  
  font-size: 20px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const BoxFilter = styled.View`
  box-sizing: border-box;
  /* Gray/200 */
  border: 1.5px solid #b2c2d6;
  border-radius: 4px;
  width: 25;
  hight: 10;
`;
const TextBoxFilter = styled.Text`
  width: 102px;


  font-family: "Hurme";
  font-style: normal;
  
  font-size: 16px;


  /* identical to box height, or 150% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const ButtonBoxFilter = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 310px;
  height: 48px;
  background: #0133aa;
  border-radius: 8px;
`;
const TextButton = styled.Text`
  width: 100px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 18px;
  text-align: center;
  color: #ffffff;
`;
const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
const ImageFrm = styled.Image`
  width: 50px;
  height: 50px;
`;
const Click = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
`;
export default function RealInScreen({ navigation }) {
  const [modelVisible, setModelVisible] = useState(false);
  const {objects,objectIdFc,isShowObject,setIsShowObject} = useContext(ObjectContext);
  
  useEffect(() => {
    if(isShowObject){
      navigation.navigate("DetailPage")
      setIsShowObject(false)
    }
    return;
  }, [isShowObject])
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
            <TextFilter>Sort objects by</TextFilter>
            <SpaceH space={8} />
            <View style={{ flexDirection: "row" }}>
              <BoxFilter />
              <SpaceW space={8} />
              <TextBoxFilter>Date Created</TextBoxFilter>
            </View>
            <SpaceH space={8} />
            <View style={{ flexDirection: "row" }}>
              <BoxFilter />
              <SpaceW space={8} />
              <TextBoxFilter>Last eddited</TextBoxFilter>
            </View>
            <SpaceH space={8} />
            <View style={{ flexDirection: "row" }}>
              <BoxFilter />
              <SpaceW space={8} />
              <TextBoxFilter>Last opened</TextBoxFilter>
            </View>
            <SpaceH space={35} />
            <ButtonBoxFilter>
              <TextButton>{"Send code"}</TextButton>
              <IconSrc source={Icon} />
            </ButtonBoxFilter>
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
  const _renderItems = ({item}) => {
    
    return (
      <>
        <Frame
        onPress={()=>{
          // navigation.navigate("DetailPage")
          objectIdFc(item._id)
          }}>
            {item?.symbolPhoto == "" ? (
                      <ImageCard source={nullImage} />
                    ) : (
          <ImageCard source={{uri:`${BASE_URL}/api/v1/files/${item.symbolPhoto}`}} />
                    )}
          <Title>{item?.fullName}</Title>
           { item?.address?.length>0? 
                      <TitleSmall>{item?.address[0]?.address_on_map}</TitleSmall>
                    :<TitleSmall>{item?.address[0]?.address_on_map}</TitleSmall>}
        </Frame>
        <SpaceH space={10} />
      </>
    );
  };
  return (
    <>
    <View  style={{backgroundColor: '#0133aa',width:`100%`,height:`100%`,paddingTop: useSafeAreaInsets ().top-20 }} >

      <BackView>
        <Header>
          <Label>{"My Objects"}</Label>
          {/* <TouchSort
          onPress={()=>{setModelVisible(true)}}>
          <IconRight source={RightIcon} />
          </TouchSort> */}
        </Header>
        <ViewFlat>
          <FlatList data={objects} renderItem={(data) => _renderItems(data)} />
        </ViewFlat>
        <ModalFilter />
      </BackView>
      <StatusBar hidden />
      </View>
      <Toast />
    </>
  );
}
