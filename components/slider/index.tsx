import React from "react";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import Title from "../../assets/images/Title.png";
import imageTwo from "../../assets/images/imageTwo.png";
import layer3 from "../../assets/images/layer3.png";
import Vector from "../../assets/images/Vector.png";

import { AppIntroSlider } from "../introSlide";
import { Dimensions, View } from "react-native";
import { useState } from "react";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Type {
  data: Array<any>;
  onDone: () => void;
  goNextIndex: () => void;
  doneLabel: string;
  onSlideChange: () => void;
  navigation:any;
}
export default function Slider({ data ,navigation}: Type) {
  const insets = useSafeAreaInsets();
  const sampel =``
  const dataLocal =[
    {id:1,text:"Find an Object & sending data",detail:" ",image:imageTwo},
  {id:1,text:"Unpictured objects",detail:" ",image:Title},
  {id:1,text:"Take a picture",detail:" ",image:layer3}]
  const [slideIndex, setSlideIndex] = useState(0);
  const [indexPage, setIndexPage] = useState(0);
  const renderPaginationCostume = i => {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return (
      <>
        <View style={{flexDirection: 'row', justifyContent: 'center',paddingTop:40}}>
          {dataLocal.map((t, index) => {
            if (index != dataLocal.length) {
              return (
                <View
                  style={{
                    backgroundColor:
                      index == i
                        ? "#003E77"
                        : `#fff`,
                    marginLeft: 3,
                    borderColor:  index != i
                    ? "#003E77"
                    : `#fff`,
                    borderWidth:1,
                    borderRadius: index == i ? 35 : 12,
                    height: 12,
                    width: index == i ? 20 : 12,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: index == i ? 0.8 : 0,
                    shadowRadius: index == i ? 2 : 0,
                    elevation: index == i ? 5 : 0,
                  }}
                />
              );
            }
          })}
        </View>
      </>
    );
  };
  const onNext = () => {
    if (slideIndex == dataLocal.length - 1) {
      navigation.navigate("SignIn");
    } else {
      setIndexPage(slideIndex + 1);
    }
  };
  const hi = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  const _renderItem = ({item}:{item:any}) => {
    console.log("+++++++++++++++++++++>>>>>>>>>>.",item);
    
    return (
      <ViewTop>
        
        <View style={{height:hi-250,justifyContent:'center'}}>
        <ImagTop resizeMode={'stretch'}source={item.image} />
        </View>
        <ViewBottom
          style={{ width:width,height:250,backgroundColor: "#ffff", position: "absolute", bottom:0 }}
        >
          <ViewBottom
          style={{ width:width,height:`100%`,backgroundColor: "#ffff", bottom: Math.max(insets.bottom, 16), }}
        >
          <TextBlue>{item.text}</TextBlue>
          <TextGry>{sampel}</TextGry>
          {slideIndex<2?
          <>
          <ViewBottonBox onPress={()=>{navigation.navigate("SignIn")}}>
            <TextBottonBox>Skip</TextBottonBox>
            </ViewBottonBox>
          <ButtonBlue onPress={()=>{onNext()}}><TextBottonBoxBlue>{"Next >"}</TextBottonBoxBlue></ButtonBlue>
          </>:
          <View style={{position: "absolute",width:width,paddingLeft:25,paddingRight:25,top:192,alignItems:'center',justifyContent:'center'}}>
            <ButtonStart onPress={()=>{onNext()}}>
              <TextLastIndex>Start</TextLastIndex>
            <ImageRight  resizeMode={'stretch'} source={Vector}/>
            </ButtonStart>
            </View>
          }
          </ViewBottom>
        </ViewBottom>
      
      
      </ViewTop>
    );
  };
  return (
    <AppIntroSlider
      style={{ width: width, height: `100%` }}
      keyExtractor={(item)=> item.id}
      onSlideChange={(newIndex) => {
  
          setSlideIndex(newIndex);
      }}
      renderPagination={renderPaginationCostume}
      renderItem={(data)=> _renderItem(data)}
      data={dataLocal}
      goNextIndex={indexPage}
    
      nextLabel=""
      doneLabel={''}
    />
  );
}
const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;
const ViewTop = styled.View`
  width: ${Dimensions.get("window").width};
  height: 100%;
  background-color: ${Colors.light.greenLight};
  align-items: center;

`;
const ImagTop = styled.Image`
  width: 280px;
  height: 280px;
`;
const TextBlue = styled.Text`
top: 48px;
font-size: 18px;
font-size: 18px;
line-height: 24px;
font-family: "Hurme";

/* identical to box height, or 133% */
display: flex;
align-items: center;
text-align: center;

color: #003E77;
`
const TextGry =styled.Text`
position: absolute;
width: 327px;
height: 72px;
top: 88px;
font-family: "Hurme";

font-style: normal;
font-size: 14px;
line-height: 24px;

/* or 171% */
display: flex;
align-items: center;
text-align: center;

/* Gray / 400 */
color: #7B93AF;
`
const ButtonBlue = styled.Pressable`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
width: 187px;
height: 48px;
left: 163px;
top: 192px;

background: #0133AA;
border-radius: 8px;
`
const ViewBottom =styled.View`
position: absolute;
width: 390px;
height: 294px;
left: 0px;
bottom: 0px;
align-items: center;
background: #FFFFFF;`
const TextBottonBox =styled.Text`
width: 100%;
font-style: normal;
font-size: 18px;
text-align: center;
text-align-vertical: center;
color: #0133AA;
font-family: "Hurme";
text-align-vertical: center;

`
const TextBottonBoxBlue =styled.Text`
width: 100%;
font-style: normal;
font-size: 18px;
text-align: center;
text-align-vertical: center;
color: #fff;
font-family: "Hurme";


`
const ViewBottonBox =styled.Pressable`

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 16px;
alignItems: center;
position: absolute;
width: 107px;
height: 48px;
left: 40px;
top: 192px;

border: 1.5px solid #0133AA;
border-radius: 8px;
`

const ButtonStart = styled.Pressable`
justify-content: center;
align-items: center;
flex-direction: row;
position: absolute;
width: 100%;
height: 48px;


background: #0133AA;
border-radius: 8px;
`
const ImageRight = styled.Image`
justify-content: center;
align-items: center;
width: 15px;
height: 15px;
left:15px;
top:2px;
`
const TextLastIndex = styled.Text`
justify-content: center;
align-items: center;
color:#fff;
text-align-vertical: center;
font-size:18px;
font-family: "Hurme";



`