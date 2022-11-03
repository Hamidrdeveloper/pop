import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '../../components/slider'

export default function WelcomeScreen({navigation}) {
  return (
    
    <Slider navigation={navigation} data={[1,2,3,4]}/>
    
  )
}
