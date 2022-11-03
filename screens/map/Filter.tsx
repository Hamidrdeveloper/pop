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
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import { MapContext } from "../../service/map/Map.context";

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
import frame from "../../assets/images/frame.png";

export const ModalFilterTwo = ({ open, culTwob, culb, culTwo, cul,onClose }) => {
  const [modelVisible, setModelVisible] = useState(false);
  const [isPicture, setPicture] = useState(false);
  const [unPicture, setUnPicture] = useState(false);
  const {signalFc, objectCreateFilter,setUnP,setIsP,setObjectCreate,setObjectCreateFilter ,setMapObjects} = useContext(MapContext);
  useEffect(() => {
    setModelVisible(open);
  }, [open]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modelVisible}
      onRequestClose={() => {
        setModelVisible(false);
        onClose()
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
                  setUnP(false)
                  setIsP(false)
                  setObjectCreateFilter({
                    ...objectCreateFilter,
                    ...{
                      pictured: false,
                      unPictured: false,
                    },
                  });
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
                  setUnP(false)
                  setIsP(true)
                  setObjectCreateFilter({
                    ...objectCreateFilter,
                    ...{
                      pictured: true,
                      unPictured: false,
                    },
                  });
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
            {unPicture ? (
              <TouchableOpacity
                onPress={() => {
                  setPicture(false);
                  setUnPicture(false);
                  setUnP(false)
                  setIsP(false)
                  setObjectCreateFilter({
                    ...objectCreateFilter,
                    ...{
                      pictured: false,
                      unPictured: false,
                    },
                  });
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
                  setUnP(true)
                  setIsP(false)
                  setObjectCreateFilter({
                    ...objectCreateFilter,
                    ...{
                      pictured: false,
                      unPictured: true,
                    },
                  });
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
                signalFc();
                setMapObjects([]);
                setTimeout(() => {
                  setObjectCreate({
                    ...objectCreateFilter
                  });
                  onClose()
                  setModelVisible(false);
                }, 100);
               
               
              }}
            >
              <TextButtonDelete>{"Done"}</TextButtonDelete>
              <SpaceW space={15} />
              {/* <IconSrc source={IconDelete}/> */}
            </ClickDelete>
          </View>

          <Click
            onPress={() => {
              onClose()
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
