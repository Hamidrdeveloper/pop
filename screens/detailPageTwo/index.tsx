import React, { useContext } from "react";
import styled from "styled-components/native";
import Icon from "../../assets/images/pen.png";
import Arrow from "../../assets/images/arrow.png";
import ImageOne from "../../assets/images/homeOne.png";
import { SpaceH } from "../../components/space";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { ObjectContext } from "../../service/object/Object.context";
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../utils/main";
const BackView = styled.ScrollView`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const TouchEditRight = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 30px;
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
const Label = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;
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
`;
const ImageItem = styled.Image`
  width: ${(Dimensions.get("window").width - 60) / 3};
  height: 98px;
  border-radius: 6px;
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
`;
const Map = styled.View`
  padding-left: 25px;
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
    borderRadius: 8,
  },
});
export default function DetailPageTwo({ navigation }) {
  const { objectsDetails } = useContext(ObjectContext);
  const addressRender = (item, index) => {
    return (
      <>
        <SpaceH space={10} />
        <AddressText>{`${index}nd Address`}</AddressText>
        <SpaceH space={10} />

        {typeof item?.address_on_map == "string" ? (
          <AddressTextSmall>{item?.address_on_map}</AddressTextSmall>
        ) : (
          <AddressTextSmall>{item?.address_on_map}</AddressTextSmall>
        )}
      </>
    );
  };
  
  return (
    <>
                <View  style={{backgroundColor: '#0133aa',width:`100%`,height:`100%`,paddingTop: useSafeAreaInsets ().top-20 }} >

      <StatusBar hidden />
      <BackView>
        <Header>
          <Label numberOfLines={1}>{objectsDetails.fullName}</Label>
          <TouchEdit
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconLeft resizeMode={"contain"} source={Arrow} />
          </TouchEdit>
        </Header>
        <ImageHome
          source={{
            uri: `${BASE_URL}/api/v1/files/${objectsDetails.symbolPhoto}`,
          }}
        />
        <Padding>
          {objectsDetails.address.map((res, index) => {
            return addressRender(res, index + 1);
          })}
          <SpaceH space={25} />
          <FlatList
            numColumns={3}
            data={objectsDetails?.photoGallery}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: (Dimensions.get("window").width - 50) / 3,
                    height: 105,
                  }}
                >
                  <ImageItem
                    source={{
                      uri: `${BASE_URL}/api/v1/files/${item?.id}`,
                    }}
                  />
                </View>
              );
            }}
          />
          <View style={{width:`92%`,overflow: 'hidden', height:200,borderRadius:15}}>
             <MapView
        region={{
          latitude: objectsDetails?.address[0]?.location?.lat,
          longitude: objectsDetails?.address[0]?.location?.lng,
          latitudeDelta: 3,
          longitudeDelta: 4,
        }}
        style={styles.map}
        showsUserLocation
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
      >
        {objectsDetails?.address[0]?.location!=null?
         <MapView.Marker
              coordinate={{
                latitude:objectsDetails?.address[0]?.location?.lat!=null ?objectsDetails?.address[0]?.location?.lat:0,
                longitude: objectsDetails?.address[0]?.location?.lng!=null ?objectsDetails?.address[0]?.location?.lng:0,
              }}
              
            />
          :null}
        {/* {productsFiltered.map((data) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              title={data.name}
              description={data.description}
              onPress={() => {
                handleOpenProductModal(data);
              }}
            />
          );
        })} */}
       
      </MapView>
      </View>
          <SpaceH space={25} />
        </Padding>
      </BackView>
      </View>
      <Toast />
    </>
  );
}
