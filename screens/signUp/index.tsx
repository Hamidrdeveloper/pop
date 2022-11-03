import React, { useContext, useEffect, useState } from 'react'
import { SpaceH, SpaceW } from '../../components/space';
import styled from "styled-components/native";
import Icon from '../../assets/images/sms-tracking.png'
import { AuthContext } from '../../service/register/Auth.context';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items:center;
`;
const IconSrc = styled.Image`
  width: 20px;
  height: 20px;

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
  width:100%;
  text-align:center;
  font-size: 15px;
  color: #0133aa;
`;
const ButtonClick = styled.TouchableOpacity`
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
  font-family: "Hurme";

  /* Gray/500 */
  border: 1px solid #6783a0;
  padding:5px;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const TextButton = styled.Text`
  padding-right:10;

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

width: 100%;
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
export default function SignUpScreen({navigation}) {
  const {singUpFc,isRegisterEmail,codeText,loading} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if(isRegisterEmail){
      setToast(true)
    
    }
    return;
  }, [isRegisterEmail])
  return (
    <>
      <BackView>
        <Title>{"SignUp"}</Title>
        <TitleSmall>
          {"Please enter your Email and you receive a code."}
        </TitleSmall>
        <SpaceH space={10}/>
        
        <Label>{"Enter your Email"}</Label>
        <SpaceH space={10}/>
        <TextInput 
        onChangeText={(e)=> setEmail(e)}/>
        <SpaceH space={85}/>
        <ButtonClick
        onPress={()=>{
       
          singUpFc(email)
          // navigation.navigate("Code")
        }}
        >
       
          <TextButton>{"Send code"}</TextButton>
          <IconSrc source={Icon}/>
        </ButtonClick>
        <SpaceH space={40}/>

        <Frame>
        <Line/>
        <SpaceW space={10}/>
        <TextBlueOr>{"OR"}</TextBlueOr>
        <SpaceW space={10}/>

        <Line/>
        </Frame>
        <ButtonNextClick onPress={()=>{
          navigation.navigate("SignIn")
        }
          }>
          <TextBlue>{"Login"}</TextBlue>
        </ButtonNextClick>
      </BackView>
      {loading?
      <View style={{position:'absolute',width:'100%',height:'100%',top:80,}}>
        <ActivityIndicator color={"#0133aa"}/>
      </View>
      :null}
         <Toast />
    </>
  )
}
