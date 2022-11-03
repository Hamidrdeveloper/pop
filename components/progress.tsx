import React from 'react'
import { TouchableOpacity ,ActivityIndicator} from 'react-native'

export default function ProgressView({show}) {
   
  return (
    <>
    {show?
    <TouchableOpacity style={{alignItems:'center',position: 'absolute',top:90,width: `100%`,height: `100%`}}>
    <ActivityIndicator color="#0133aa" size={'large'}/>
    </TouchableOpacity>
    :null}
    </>
  )
}
