import React, {createContext, ReactElement, useEffect, useState} from 'react';
import { navigationStatic } from '../../utils/main';
// import Toast from '../../components/toast';
import {
  singUpAc,
  codeAc,
  informationAc,
  loginAc,
  forgotRequestAc,
  forgotCodeAc,
  forgotRequestEmailAc
} from './Auth.action';

interface IAuthContext {
  singUpFc:any;
  codeFc:any;
  isRegister:boolean;
  informationFc:any;
  loginFc:any;
  forgotCodeFc:any;
  forgotRequestFc:any;
  setIsRegister:any;
  isRegisterEmail:any;
  isRegisterCode:any;
  isRegisterLogin:any;
  setIsRegisterLogin:any;
  codeText:any;
  loading:any;
  setIsForgetPassword:any;
  isForgetPassword:any;
  forgotRequestCodeFc:any;
  isValidPassword:any;
  setIsValidPassword:any;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;

}) {
  const [isValidPassword, setIsValidPassword] = useState(false)

  const [isRegister, setIsRegister] = useState(false)
  const [isRegisterEmail, setIsRegisterEmail] = useState(false)
  const [isRegisterCode, setIsRegisterCode] = useState(false)
  const [isRegisterLogin, setIsRegisterLogin] = useState(false)
  const [codeText, setCodeText] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isForgetPassword, setIsForgetPassword] = useState(false)

  
  const forgotRequestCodeFc =(email:string,password:string) =>{
    setIsRegister(false);
    forgotRequestAc(email,password).then(res=>{
      setIsValidPassword(res.loading);
    });
    setIsRegister(false);
   }
  const forgotRequestFc =(email:string)=>{
    setIsRegister(false);
    forgotRequestEmailAc(email).then(res=>{
      setIsForgetPassword(res.loading);
    });
    setIsRegister(false);
   }
   
   const forgotCodeFc =(password:string,code:string)=>{
    setLoading(true)
    setIsRegister(false);
    forgotCodeAc(password,code).then(res=>{
      setIsRegister(res.loading);
    });
    setIsRegister(false);
    setLoading(false)

   }
  const codeFc =(code:string)=>{
    setLoading(true)
    setIsRegisterCode(false);
    codeAc(code).then(res=>{
      setIsRegisterCode(res.loading);
    });
    setLoading(false)

   }
   const informationFc =(password: string,fullName:string)=>{
    setLoading(true)
    setIsRegister(false);
    informationAc(password,fullName).then(res=>{
      setIsRegister(res.loading);
    });
    setLoading(false)

  
   }
   const loginFc =(password: string,userName:string)=>{
    setLoading(true)
    setIsRegisterLogin(false);
    loginAc(password,userName).then(res=>{
      setLoading(false)

      setIsRegisterLogin(res.loading);
    });
    setIsRegisterLogin(false);
    setLoading(false)

   }

   const singUpFc =(email:string)=>{
    setIsRegisterEmail(false);
    setLoading(true)
    singUpAc(email).then(res=>{
      setLoading(false)

      console.log('====================================');
      console.log(res?.data?.message?.message);
      console.log('====================================');
      setCodeText(res?.data?.message?.message)
      setIsRegisterEmail(res.loading);
    
      if(res?.loading==true){
        setTimeout(() => {
          navigationStatic.navigation.navigate("Code")
  
        }, 200);
      }
     
    });
    setIsRegisterEmail(false);
    setLoading(false)

   }
  return (
    <AuthContext.Provider
      value={{
        singUpFc,
        isRegister,
        codeFc,
        setIsRegister,
        informationFc,
        loginFc,
        forgotRequestFc,
        forgotCodeFc,
        isRegisterCode,
        isRegisterEmail,
        isRegisterLogin,
        codeText,
        setIsRegisterLogin,
        loading,
        setIsForgetPassword,
        isForgetPassword,
        isValidPassword,
  setIsValidPassword,
  forgotRequestCodeFc
      }}>
      {children}
    </AuthContext.Provider>
  );
}
