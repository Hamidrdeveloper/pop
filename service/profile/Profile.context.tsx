import React, {createContext, ReactElement, useEffect, useState} from 'react';
// import Toast from '../../components/toast';
import {
  profileAc,
  userProfileAc,
  userLanguageAc,
  userAvatarAc
} from './Profile.action';

interface IProfileContext {
  profileFc:any;
  userProfileFc:any;
  isRegister:boolean;
  userLanguageFc:any;
  userAvatarFc:any;
  profile:any;
}
export const ProfileContext = createContext<IProfileContext>({} as IProfileContext);
export default function ProfileContextProvider({
  children,
}: {
  children: ReactElement;

}) {
  const [isRegister, setIsRegister] = useState(false)
  const [profile, setProfile] = useState()

  const profileFc =()=>{
    setIsRegister(false);
    profileAc().then((res)=>{
      setProfile(res)
    });
    setIsRegister(false);
   }
   const userProfileFc =(fullName: string,phoneNumber: string)=>{
    setIsRegister(false);
    userProfileAc(fullName,phoneNumber).then(()=>{
      setIsRegister(true);
      profileFc();
    });
    setIsRegister(false);
   }
  const userLanguageFc =(language: string)=>{
    setIsRegister(false);
    userLanguageAc(language).then(()=>{
      setIsRegister(true);
    });
    setIsRegister(false);
   }
   const userAvatarFc =(file)=>{
    setIsRegister(false);
    userAvatarAc(file).then(()=>{
      setIsRegister(true);
      profileFc()
    });
    setIsRegister(false);
   }
   
  return (
    <ProfileContext.Provider
      value={{
        profileFc,
        userProfileFc,
        isRegister,
        userAvatarFc,
        userLanguageFc,
        profile
      }}>
      {children}
    </ProfileContext.Provider>
  );
}
