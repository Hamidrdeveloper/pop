import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import { AuthContext } from "../../service/register/Auth.context";
import Toast from 'react-native-toast-message';
const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items: center;
`;
const Title = styled.Text`
  width: 310px;

  margin-top: 152px;
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
const LabelRequer = styled.Text`
  width: 310px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 10px;
  color: red;
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
  position: absolute;
  width: 310px;
  height: 48px;
  bottom: 45px;
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
`;
const Line = styled.View`
  width: 128px;
  height: 0px;

  /* Gray/50 */
  border: 1px solid #e9edf5;
`;
const TextBlueOr = styled.Text`
  font-style: normal;
  font-family: "Hurme";

  font-size: 15px;
  color: rgba(87, 114, 142, 1);
`;
export default function StartScreen({navigation}) {
  const {informationFc,isRegister,setIsRegister,loading} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if(isRegister){
      navigation.navigate("Root")
      setIsRegister(false)
    }
    return;
  }, [isRegister])
  return (
    <>
      <BackView>
        <Title>{"Start"}</Title>
        <TitleSmall>{"Please enter your name."}</TitleSmall>
        <View style={{height:200,width:`100%`,alignItems:"center"}}>
        <Label>{"Enter your Full Name"}</Label>
        <TextInput onChangeText={(e)=>{setName(e)}}/>
        <SpaceH space={25} />
        <Label>{"Enter your Password"}</Label>
        <TextInput secureTextEntry={true} onChangeText={(e)=>{setPassword(e)}}/>
        <SpaceH space={5}/>
        <LabelRequer>{"Your password must be 8 digits long\nand use !,@ or ... and uppercase letters"}</LabelRequer>
        <SpaceH space={25} />
        </View>
        <ButtonClick onPress={()=>{
         
          informationFc(password,name)}}>
          <TextButton>{"Submit"}</TextButton>
        </ButtonClick>
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
