import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import SMSVerifyCode from "react-native-sms-verifycode";
import Icon from "../../assets/images/frame.png";
import IconMessage from "../../assets/images/sms-tracking.png";
import { useFonts } from "expo-font";
import Tick from "../../assets/images/tick.png";
import { AuthContext } from "../../service/register/Auth.context";
import  ToastTwo from "../../components/toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator, View } from "react-native";
import Toast from 'react-native-toast-message';
export  const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items: center;
`;
export const BackViewCode = styled.View`
  width: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items: center;
  padding: 20px;
`;
export const Title = styled.Text`
  width: 310px;
  margin-top: 152px;
  font-style: normal;
  font-size: 40px;
  align-items: center;
  color: #003e77;
  font-family: 'Hurme';
`;
export  const TitleSmall = styled.Text`
  width: 310px;
  height: 48px;
  margin-top: 10px;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  font-family: "Hurme";

  /* or 150% */
  display: flex;
  align-items: center;

  color: #0133aa;
`;
export const ButtonClick = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
 
  gap: 8px;
  width: 310px;
  height: 48px;
  background: #0133aa;
  border-radius: 8px;
`;
export const TextButton = styled.Text`
  
  font-style: normal;
  font-size: 18px;

  font-family: "Hurme";

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #ffffff;

  /* Inside auto layout */
  flex: none;r
  flex-grow: 0;
`;
export const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
export  const ButtonNextClick = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: 310px;
  height: 48px;
 
  border: 1.5px solid #fff;
  border-radius: 8px;
`;
export  const TextBlue = styled.Text`
  font-style: normal;
  font-size: 15px;
  color: #0133aa;
  font-family: "Hurme";

`;
export const Modal = styled.Modal`
  width: 100%;
  height: 100%;
  border: 1.5px solid #fff;
`;
export const ViewModalShadow = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;
export  const ViewModal = styled.View`
width: 100%;
height:290px;
border-radius:25px
position:absolute;
bottom:0px;
background-color:#fff;
align-items: center;
`;
export  const TitleModal = styled.Text`
  width: 162px;
  left: 32px;
  top: 44px;
  font-family: "Hurme";
  font-style: normal;
  font-size: 20px;


  /* identical to box height, or 120% */
  display: flex;
  align-items: center;
`;
export  const ImageModal = styled.Image`
  width: 50px;
  height: 50px;
 
`;
const TextInput = styled.TextInput`
  box-sizing: border-box;
  width: 310px;
  height: 40px;
  margin-top: 10px;
  /* White */
  background: #ffffff;
  padding:5px;
  /* Gray/500 */
  border: 1px solid #6783a0;
  font-family: "Hurme";

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const Label = styled.Text`
  width: 310px;
  height: 12px;
  font-style: normal;
  font-size: 12px;
  color: #0133aa;
  font-family: "Hurme";

`;
export  const ViewRow = styled.View`
  flex-direction: row;
  height: 100px;
  width: 100%;
`;
export  const BoxImageModal = styled.TouchableOpacity`
width: 50px;
  height: 50px;
  position: absolute;
  right: 40px;
  top: 30;
  
`;
export default function CodeScreen({navigation}) {
  const [sendCode, setSendCode] = useState(false);
  const [sendCodeString, setSendCodeString] = useState('');
  const [toast, setToast] = useState(true)

  const {codeFc,isRegisterCode,codeText,loading} = useContext(AuthContext)
  useEffect(() => {
    if(isRegisterCode){
      navigation.navigate("Start")

    }
    return ;
  }, [isRegisterCode])
  let [fontsLoaded] = useFonts({
    'hurme': require('../../assets/fonts/Hurme-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
    <KeyboardAwareScrollView style={{backgroundColor:"#fff"}}>
      <BackView>
      
        <Title style={{fontFamily:'Hurme'}}>{"Enter code"}</Title>
        <TitleSmall>{"Please enter a received a code."}</TitleSmall>
        <BackViewCode>
          <SpaceH space={25} />
          <SMSVerifyCode
            verifyCodeLength={5}
            codeViewWidth={55}
            containerPaddingRight={20}
            containerPaddingLeft={20}
            codeFontSize={26}
            coverColor={"#000"}
            codeColor={"#000"}
            focusedCodeViewBackgroundColor={"#000"}
            codeViewBorderColor="#0133aa"
            focusedCodeViewBorderColor="#0000FF"
            codeViewBorderWidth={1}
            codeViewBorderRadius={16}
            onInputCompleted={() => {
              codeFc(sendCodeString);
            }}
            onInputChangeText={(e)=>{
              setSendCodeString(e)} }
          />
        </BackViewCode>
        <SpaceH space={100} />
        <ButtonClick onPress={() => {
            codeFc(sendCodeString);
          }}>
          <TextButton>{"Submit"}</TextButton>
          <SpaceW space={10}/>
          <IconSrc resizeMode={'center'} source={Tick} />
        </ButtonClick>
        <ButtonNextClick
          onPress={() => {
            setSendCode(true);
          }}
        >
          <TextBlue>{"Didn’t receive a code?"}</TextBlue>
        </ButtonNextClick>
        <SpaceH space={15}/>
        <ButtonNextClick onPress={()=>{navigation.navigate("SignIn")}}>
          <TextBlue>{"SignIn"}</TextBlue>
        </ButtonNextClick>

        <Modal visible={sendCode} transparent>
          <ViewModalShadow>
            <ViewModal>
              <ViewRow>
                <TitleModal>{"Send code again"}</TitleModal>
                <BoxImageModal
                  onPress={() => {
                    setSendCode(false);
                  }}
                >
                <ImageModal source={Icon} />
                </BoxImageModal>
              </ViewRow>
              {/* <Label>{"Enter your Email"}</Label> */}
              {/* <TextInput /> */}
              <SpaceH space={35} />
              <ButtonClick
              onPress={()=>{setToast(true)
              setSendCode(false);}}>
                <TextButton>{"Send code"}</TextButton>
                
                  <IconSrc
                    onPress={() => {
                      setSendCode(false);
                    }}
                    source={IconMessage}
                  />
              </ButtonClick>
            </ViewModal>
          </ViewModalShadow>
        </Modal>
      </BackView>
      </KeyboardAwareScrollView>
      <ToastTwo show={'Info'} onBack={()=>{setToast(false)}} text={"Check Your Email"} onToast={toast}/>
      {loading?
      <View style={{position:'absolute',width:'100%',height:'100%',top:80,}}>
        <ActivityIndicator color={"#0133aa"}/>
      </View>
      :null}
         <Toast />
    </>
  );
}
