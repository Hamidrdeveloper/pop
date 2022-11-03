import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToastAndroid } from "react-native";
import { navigationStatic } from "../../utils/main";
// import Toast from '../../components/toast';
import {
  objectAc,
  objectCreate,
  objectCreatePut,
  objectIdAc,
  objectTemplateAc,
  ojectImageAc,
  deleteObjectIdAc,
  ojectMultiImageAc,
  ojectDeleteMultiImageAc,
} from "./Object.action";
import Storage from "../../utils/storeData/index";
import { MapContext } from "../map/Map.context";

interface IObjectContext {
  objectFc: any;
  objectCreateFc: any;
  isRegister: boolean;
  objectCreatePutFc: any;
  objectTemplateFc: any;
  objectImageFc: any;
  objects: any;
  objectIdFc: any;
  objectsDetails: any;
  isShowObject: boolean;
  deleteObjectIdFc: any;
  isAddObject: any;
  ojectMultiImageFc: any;
  isEditObject: any;
  objectTwoIdFc: any;
  isShowObjectTwo: any;
  setIsShowObject: any;
  setIsShowObjectTwo: any;
  setIsAddObject: any;
  setIsEditObject: any;
  loadShowObjectTwo: any;
  ojectDeleteMultiImageFc: any;
  isDeleteImage: any;
  setDeleteImage: any;
}
export const ObjectContext = createContext<IObjectContext>(
  {} as IObjectContext
);
export default function ObjectContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [isDeleteImage, setDeleteImage] = useState(false);

  const [idObject, setIdObject] = useState(0);
  const [objects, setObjects] = useState();
  const [objectsDetails, setObjectsDetails] = useState();
  const [isShowObject, setIsShowObject] = useState(false);
  const [isAddObject, setIsAddObject] = useState(false);
  const [isEditObject, setIsEditObject] = useState(false);

  const [isShowObjectTwo, setIsShowObjectTwo] = useState(false);
  const [loadShowObjectTwo, setLoadIsShowObjectTwo] = useState(false);

  const { MapSearchMapFc } = useContext(MapContext);
  const ojectDeleteMultiImageFc = (_id,_idImage) => {
    setDeleteImage(false)
    ojectDeleteMultiImageAc(_id,_idImage).then((res) => {
      if (res) {
        setDeleteImage(true)
      } else {
        setDeleteImage(false)

        ToastAndroid.show("Request sent unsuccessfully!", ToastAndroid.SHORT);
      }
    });

  };
  const objectIdFc = (id) => {
    setIsShowObject(false);
    objectIdAc(id).then((res) => {
      if (res.object != null) {
        setObjectsDetails(res.object);
        setIsShowObject(true);
      } else {
        ToastAndroid.show("Request sent unsuccessfully!", ToastAndroid.SHORT);
      }
    });
    setIsShowObject(false);
  };
  const objectTwoIdFc = (id) => {
    setIsShowObjectTwo(false);
    setLoadIsShowObjectTwo(true);
    objectIdAc(id).then((res) => {
      if (res.object != null) {
        setObjectsDetails(res.object);
        setIsShowObjectTwo(true);
      } else {
        ToastAndroid.show("Request sent unsuccessfully!", ToastAndroid.SHORT);
      }
    });
    setTimeout(() => {
      setLoadIsShowObjectTwo(false);
    }, 2000);

    setIsShowObjectTwo(false);
  };
  const objectTemplateFc = () => {
    objectTemplateAc().then((res) => {
      setIdObject(res);
    });
  };
  const objectFc = (first: number, two: number) => {
    objectAc(first, two).then((res) => {
      if (res == 401) {
        Storage.removeData("User");
        navigationStatic.navigation.navigate("SignIn");
      }
      setObjects(res?.objects);
    });
  };

  const ojectMultiImageFc = (file, id = idObject, put = false) => {
    ojectMultiImageAc(file, id).then(() => {
      objectFc(1, 100);
      if (put) {
        objectIdFc(objectsDetails?._id);
      }
    });
  };

  const objectImageFc = (file, id = idObject, put = false) => {
    ojectImageAc(file, id).then(() => {
      objectFc(1, 100);
      if (put) {
        objectIdFc(objectsDetails?._id);
      }
    });
  };

  const objectCreateFc = (
    fullName: string,
    address: [],
    location,
    image,
    multiImage
  ) => {
    setIsAddObject(false);
    objectCreate(fullName, address, location, idObject).then((res) => {
      if (image != null) {
        objectImageFc(image);
      }

      multiImage.forEach((element) => {
        if (element.image != "add") {
          setTimeout(() => {
            ojectMultiImageFc(element.image);
          }, 2000);
        }
      });
      if (res == true) {
        setIsAddObject(true);
        objectFc(1, 100);
        if (location.lat != null && location.lat > 9) {
          let lat = location?.lat + "";
          let lng = location?.lat + "";
          // MapSearchMapFc(
          //   lat.substring(0, 2),
          //   lat.substring(0, 2),
          //   lng.substring(0, 2),
          //   100,
          //   90
          // );
        }
      } else {
        ToastAndroid.show("Request sent unsuccessfully!", ToastAndroid.SHORT);
      }
      objectFc(1, 100);
    });
    setIsAddObject(false);
  };
  const objectCreatePutFc = (
    fullName: string,
    address: [],
    location,
    image,
    multiImage,
    checkOwner
  ) => {
    setIsEditObject(false);
    if (checkOwner) {
      objectCreatePut(fullName, address, location, objectsDetails?._id).then(
        (res) => {
          if (image != null) {
            objectImageFc(image, objectsDetails?._id, true);
          }
          multiImage.forEach((element) => {
            if (element.image != "add" && element?.exit == null) {
              setTimeout(() => {
                ojectMultiImageFc(element.image, objectsDetails?._id, true);
              }, 2000);
            }
          });
          if (res == true) {
            objectIdFc(objectsDetails?._id);
            objectFc(1, 100);
            setIsEditObject(true);
            if (location.lat != null && location.lat > 9) {
              let lat = location?.lat + "";
              let lng = location?.lat + "";
              // MapSearchMapFc(
              //   lat.substring(0, 2),
              //   lat.substring(0, 2),
              //   lng.substring(0, 2),
              //   100,
              //   90
              // );
            }
          } else {
            ToastAndroid.show(
              "Request sent unsuccessfully!",
              ToastAndroid.SHORT
            );
          }
        }
      );
    } else {
      if (image != null) {
        objectImageFc(image, objectsDetails?._id, true);
      }
      multiImage.forEach((element,index) => {
        if (element?.exit == null) {
          setTimeout(() => {
            ojectMultiImageFc(element.image, objectsDetails?._id, true);
          }, index*1000);
        }
        
      });
      objectIdFc(objectsDetails?._id);
      objectFc(1, 100);
      setTimeout(() => {
        setIsEditObject(true);
      }, 2000);
    }
    setIsEditObject(false);
  };
  const deleteObjectIdFc = (id) => {
    setIsRegister(false);
    deleteObjectIdAc(id).then(() => {
      setIsRegister(true);
      objectFc(1, 100);
    });
    setIsRegister(false);
  };
  return (
    <ObjectContext.Provider
      value={{
        objectFc,
        isRegister,
        objectCreatePutFc,
        objectCreateFc,
        objectTemplateFc,
        objectImageFc,
        objects,
        objectIdFc,
        objectsDetails,
        isShowObject,
        deleteObjectIdFc,
        isAddObject,
        ojectMultiImageFc,
        isEditObject,
        objectTwoIdFc,
        isShowObjectTwo,
        setIsShowObject,
        setIsShowObjectTwo,
        setIsAddObject,
        setIsEditObject,
        loadShowObjectTwo,
        ojectDeleteMultiImageFc,
        isDeleteImage,
        setDeleteImage,
      }}
    >
      {children}
    </ObjectContext.Provider>
  );
}
