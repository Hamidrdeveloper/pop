/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import FontAwesome from "@expo/vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Image, Pressable, Text, View ,TouchableOpacity} from "react-native";
import Map from "../assets/images/mapIcon.png";
import Profile from "../assets/images/profileIcon.png";
import TD from "../assets/images/3d-cube-scan.png";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CodeScreen from "../screens/code";
import DetailPage from "../screens/detailPage";
import EditItemPage from "../screens/editItem";
import EditProfileScreen from "../screens/editProfile";
import MapScreen from "../screens/map";
import AddOnMapScreen from "../screens/map/addOnMap/idex";
import MapSearching from "../screens/map/searchOnMap";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProfileScreen from "../screens/profile";
import RealInScreen from "../screens/realS";
import SignInScreen from "../screens/signIn";
import SignUpScreen from "../screens/signUp";
import SplashScreen from "../screens/splash";
import StartScreen from "../screens/start";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import WelcomeScreen from "../screens/wellcome";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import { useFonts } from "expo-font";
import { useState } from "react";
import { SpaceH } from "../components/space";
import DetailPageTwo from "../screens/detailPageTwo";
import MapSelect from "../screens/map/addOnMap/mapSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CodeForgetScreen from "../screens/code/CodeForgetScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
  <Stack.Screen
        name="MapSearching"
        component={MapSearching}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      
<Stack.Screen
        name="Code"
        component={CodeScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="MapSelect"
        component={MapSelect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddOnMapScreen"
        component={AddOnMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditItemPage"
        component={EditItemPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="DetailPageTwo"
        component={DetailPageTwo}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="RealInScreen"
        component={RealInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
     


      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
         name="CodeForgetScreen"
         component={CodeForgetScreen}
         options={{ headerShown: false }}
       />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [index, setIndex] = useState(0);

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarActiveBackgroundColor: "#fff",
        tabBarInactiveBackgroundColor: "#fff",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor:"#fff",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Hurme",
          color: "#0133AA",
        },

        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={MapScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Map",
         
          tabBarIcon: ({ color, focused }) => {
           
            return (
              <>
              <View
                 style={{
                  width: `100%`,
                  height:  focused?110:90,
            
                  backgroundColor: focused?"#fff":"#fff",
                
 
                
                }}>
              <TouchableOpacity
              onPress={()=>{navigation.navigate("TabOne")}}
                style={{
                  width: `100%`,
                  height:  focused?100:90,
                  alignItems: "center",
                  backgroundColor: focused?"rgba(1,51,170,0.05)":"#fff",
                  borderTopWidth: 2,
                  borderTopColor: focused?"#0133AA":"#fff",
                  paddingTop: 15,
                
                }}
              >
                
                <Image
                  source={Map}
                  resizeMode={"stretch"}
                  style={{ width: 20, height: 20 }}
                />
                <SpaceH space={11} />
                <Text
                  style={{
                    fontFamily: "Hurme",
                    fontSize: 12,
                    color: "#0133AA",
                    width: `100%`,
                    height: `100%`,
                    textAlign: "center",
                    
                  }}
                >
                  Map
                </Text>
              
              </TouchableOpacity>
              </View>
            </>
            );
          },
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            ></Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={RealInScreen}
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          title: "My Objects",
          tabBarShowLabel: false,
          // tabBarItemStyle: {
          //   borderTopWidth: index==1?1:0,
          //   padding: 10,
          //   justifyContent: 'center',
          //   backgroundColor:index==1? 'rgba(0,0,0,0.2)':"#fff"
          // },
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              setIndex(1);
            }
            return (
              <>
               <View
                 style={{
                  width: `100%`,
                  height:  focused?110:90,
            
                  backgroundColor: focused?"#fff":"#fff",
                
 
                
                }}>
              <TouchableOpacity
              onPress={()=>{navigation.navigate("TabTwo")}}
                style={{
                  width: `100%`,
                  height:  focused?100:90,
                  alignItems: "center",
                  backgroundColor: focused?"rgba(1,51,170,0.05)":"#fff",
                  borderTopWidth: 2,
                  borderTopColor: focused?"#0133AA":"#fff",
                  paddingTop: 15,
                
                }}
              >
            
                  <Image
                    source={TD}
                    resizeMode={"stretch"}
                    style={{ width: 23, height: 23 }}
                  />
                  <SpaceH space={8} />
                  <Text
                    style={{
                      fontFamily: "Hurme",
                      fontSize: 12,
                      color: "#0133AA",
                    }}
                  >
                    My Objects
                  </Text>
                </TouchableOpacity>
                </View>
              </>
            );
          },
        })}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"ProfileScreen">) => ({
          title: "Profile",
         
          tabBarIcon: ({ color, focused }) => {
           
            return (
              <>
               <View
                 style={{
                  width: `100%`,
                  height:  focused?110:90,
            
                  backgroundColor: focused?"#fff":"#fff",
                
 
                
                }}>
              <TouchableOpacity
              onPress={()=>{navigation.navigate("ProfileScreen")}}
                style={{
                  width: `100%`,
                  height:  focused?100:90,
                  alignItems: "center",
                  backgroundColor: focused?"rgba(1,51,170,0.05)":"#fff",
                  borderTopWidth: 2,
                  borderTopColor: focused?"#0133AA":"#fff",
                  paddingTop: 15,
                
                }}
              >
                  <Image
                    source={Profile}
                    resizeMode={"stretch"}
                    style={{ width: 23, height: 23 }}
                  />
                  <SpaceH space={8} />
                  <Text
                    style={{
                      fontFamily: "Hurme",
                      fontSize: 12,
                      color: "#0133AA",
                    }}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>
                </View>
              </>
            );
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
