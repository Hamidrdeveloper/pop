import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
export default function Toast({text,show,onToast,onBack}) {
    
    
    useEffect(() => {
      if(onToast){
        _fetchData();
      }
    }, [onToast])
    let dropDownAlertRef = React.useRef();
    const _fetchData = async () => {
   
        // alertWithType parameters: type, title, message, payload, interval.
        // payload object that includes a source property overrides the image source prop. (optional: object)
        // interval takes precedence over the closeInterval prop. (optional: number)
        dropDownAlertRef.alertWithType(show, show, text);
        onBack();
      
    };
    return (
       <>
       <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
       </>
      );
}

