import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View ,TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import Navigation from "../../navigation";
import { AuthContext } from "../../service/register/Auth.context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from "../../assets/images/frame.png";
import IconMessage from "../../assets/images/sms-tracking.png";

const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items:center; 
`;
const Title = styled.Text`
width: 310px;

  margin-top: 100px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 40px;

  align-items: center;
  color: #003e77;
`;
const TitleSmall = styled.Text`
  width: 310px;
  height: 48px;
  margin-top: 10px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 16px;
  line-height: 24px;

  /* or 150% */
  display: flex;
  align-items: center;

  color: #0133aa;
`;
const Label = styled.Text`
  width: 310px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 12px;
  color: #0133aa;
`;
const LabelButtonFor = styled.Text`
  margin-top: 20px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 15px;
  color: #0133aa;
`;
const TextBlue = styled.Text`
  font-style: normal;
  font-family: "Hurme";

  font-size: 15px;
  color: #0133aa;
`;
const ButtonClick = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  margin-top: 30px;
  gap: 8px;
  width: 310px;
  height: 48px;
  background: #0133aa;
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
  gap: 8px;
  width: 310px;
  height: 48px;
  border: 1.5px solid #0133aa;
  border-radius: 8px;
`;
const TextInput = styled.TextInput`
  box-sizing: border-box;
  width: 310px;
  height: 40px;
  margin-top: 10px;
  /* White */
  background: #ffffff;
  padding:5px;
  font-family: "Hurme";

  /* Gray/500 */
  border: 1px solid #6783a0;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const TextButton = styled.Text`
  width: 100px;
 
  font-style: normal;
  font-family: "Hurme";

  font-size: 18px;


  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  flex-grow: 0;
`;
const Frame = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
height: 50px;
gap: 8px;
width: 310px;
display: flex;

`
const Line = styled.View`

width: 128px;
height: 0px;

/* Gray/50 */
border: 1px solid #E9EDF5;
`
const TextBlueOr = styled.Text`
  font-style: normal;
  font-family: "Hurme";

  font-size: 15px;
  color:rgba(87, 114, 142, 1);
`;
import Toast from 'react-native-toast-message';
import { BoxImageModal, IconSrc, ImageModal, Modal, TitleModal, ViewModal, ViewModalShadow, ViewRow } from "../code";

export default function SignInScreen({navigation}) {  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loginFc,isRegisterLogin,setIsRegisterLogin,loading,forgotRequestFc,isForgetPassword,setIsForgetPassword} = useContext(AuthContext)
  
  const [isforgetPassword, setForgetPassword] = useState(false)
  useEffect(() => {
    if(isRegisterLogin){
      navigation.navigate("Root")
      setIsRegisterLogin(false);
    }
    return;
  }, [isRegisterLogin])
  useEffect(() => {
    if(isForgetPassword){
      setIsForgetPassword(false)
      navigation.navigate("CodeForgetScreen")
      
    }
    return;
  }, [isForgetPassword])
  return (
    <>

      <BackView>
      <KeyboardAwareScrollView>
        <Title>{"Login"}</Title>
        <TitleSmall>
          {"Please enter your Email and you receive a code."}
        </TitleSmall>
        {}
        <SpaceH space={10}/>
       
        <Label>{"Enter your Email"}</Label>
        <TextInput onChangeText={(e)=>{setEmail(e)}}/>
        <SpaceH space={25}/>
        <Label>{"Enter your Password"}</Label>
        <TextInput secureTextEntry={true} onChangeText={(e)=>{setPassword(e)}}/>
        <SpaceH space={25}/>
        <ButtonClick
        onPress={()=>{
          
          loginFc(password,email)}}>
          <TextButton>{"Login"}</TextButton>
        </ButtonClick>
        <TouchableOpacity
       onPress={()=>{setForgetPassword(true)}}>
        <LabelButtonFor>{"Forget password"}</LabelButtonFor>
        </TouchableOpacity>
        <SpaceH space={30}/>

        <Frame>
        <Line/>
        <SpaceW space={10}/>
        <TextBlueOr>{"OR"}</TextBlueOr>
        <SpaceW space={10}/>
        <Line/>
        </Frame>
        <ButtonNextClick onPress={()=>{navigation.navigate("SignUp")}}>
          <TextBlue>{"SignUp"}</TextBlue>
        </ButtonNextClick>
        <SpaceH space={25}/>
        <Modal visible={isforgetPassword} transparent>
          <ViewModalShadow>
            <ViewModal>
              <ViewRow>
                <TitleModal>{"Reset Password"}</TitleModal>
                <BoxImageModal
                  onPress={() => {
                    setForgetPassword(false);
                  }}
                >
                <ImageModal source={Icon} />
                </BoxImageModal>
              </ViewRow>
              <Label>{"Enter your Email"}</Label>
              <TextInput 
              onChangeText={(e)=>{setEmail(e)}}/>
              <SpaceH space={10} />
              <ButtonClick
              onPress={()=>{
                setForgetPassword(false);
                forgotRequestFc(email)
              }}>
                <TextButton>{"Reset"}</TextButton>
                
                  <IconSrc
                    onPress={() => {
                      setForgetPassword(false);
                    }}
                    source={IconMessage}
                  />
              </ButtonClick>
            </ViewModal>
          </ViewModalShadow>
        </Modal>
        </KeyboardAwareScrollView>
      </BackView>
      {loading?
      <View style={{position:'absolute',width:'100%',height:'100%',top:80,}}>
        <ActivityIndicator color={"#0133aa"}/>
      </View>
      :null}
          <Toast />
    </>
  );
}
