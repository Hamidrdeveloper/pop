import React, {createContext, ReactElement, useEffect, useState} from 'react';
// import Toast from '../../components/toast';
import {
  abortAc,
  ojectSearchAc,
  ojectSearchMapAc,
  signalAc,
} from './Map.action';
import { useDebounce } from './useDebounce';

interface IMapContext {
  MapFc:any;
  isRegister:boolean;
  MapSearchMapFc:any;
  mapObjects:Array<undefined>;
  mapObjectsSearch:any;
  saveMarkAddress:any;
  setSaveMarkAddress:any;
  locationMark:any;
  setLocationMark:any;
  setSaveMarkInform:any;
  saveMarkInform:any;
  unP:any;isP:any;setUnP:any;setIsP:any;
  isLoadingMap:any;
  numberPage:any;
  stopLoopRequest:any;
  setObjectCreate:any;
  setStopLoopRequest:any;
  objectCreate:any;
  setObjectCreateFilter:any;
  objectCreateFilter:any;
  setMapObjects:any;
}
export const MapContext = createContext<IMapContext>({} as IMapContext);
export default function MapContextProvider({
  children,
}: {
  children: ReactElement;

}) {
  const [unP, setUnP] = useState(false)
  const [isP, setIsP] = useState(false)
  const [isRegister, setRegister] = useState(false)
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [mapObjects, setMapObjects] = useState([])
  const [mapObjectsSearch, setMapObjectsSearch] = useState([])
  const [saveMarkAddress, setSaveMarkAddress] = useState("")
  const [locationMark, setLocationMark] = useState({lat:0,lon:0})
  const [saveMarkInform, setSaveMarkInform] = useState({})
  const [numberPage, setNumberPage] = useState({ current: 0, pages: 0 });
  const [stopLoopRequest, setStopLoopRequest] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [objectCreateFilter, setObjectCreateFilter] = useState({
   
    screenX1: 0,
    screenY1: 0,
    screenX2: 0,
    screenY2: 0,
    skip: 1,
    limit: 100,
    pictured:false,unPictured:false
  });
  const [objectCreate, setObjectCreate] = useState({
   
    screenX1: 0,
    screenY1: 0,
    screenX2: 0,
    screenY2: 0,
    skip: 1,
    limit: 30,
    pictured:false,unPictured:false
  });
  const [objectCreatePage, setObjectCreatePage] = useState({

    screenX1: 0,
    screenY1: 0,
    screenX2: 0,
    screenY2: 0,
    skip: 1,
    limit: 100,
    pictured:false,unPictured:false
  });
  const MapFc =(first:number,two:number,object:string)=>{
    
    ojectSearchAc(first, two,object).then((res)=>{
      setMapObjectsSearch(res?.objects)
    });
  
   }
   const debouncedSearchTerm = useDebounce(objectCreate, 100);

   // Effect for API call
   useEffect(
     () => {
       if (debouncedSearchTerm) {
         console.log(objectCreate);
         setMapObjects([]);
         setTimeout(() => {
           MapSearchMapFc();
         }, 100);
        
       } else {
       }
     },
     [debouncedSearchTerm] // Only call effect if debounced search term changes
   );
   const MapSearchMapFc =()=>{
    setIsLoadingMap(true);
    setStopLoopRequest(false)
    
    ojectSearchMapAc(objectCreate).then((res)=>{
      setIsLoadingMap(false);
      // console.log("====================================");
      // console.log(res);
      // console.log("====================================");
      setNumberPage(res?.page);
     
        if (res?.page?.pages > 1) {
          setTimeout(() => {
            MapSearchMapPageFc(2, res?.objects);

          }, 2000);

          // Promise.all(promises).then(() => console.log(users));
        }else{
          setMapObjects(res?.objects);
        }
     
    });
    
   }
   const MapSearchMapPageFc = (i, array) => {
    setIsLoadingMap(true);

    // requestInProgress came from redux so it will re-render when the value is updated
    // console.log("================MapSearchMapPageFc============array========"+mapObjects);

    if(mapObjects){
      setMapObjects([...mapObjects, ...array]);

    }else{
      setMapObjects(array);

    }
    setNextPage(i);

    // setIsLoadingMap(false);
  };
  useEffect(() => {
    
    setTimeout(() => {
      let obj = {
        ...objectCreate,
        ...{
          skip: nextPage,
        },
      };
    ojectSearchMapAc(obj).then((res) => {
      setIsLoadingMap(false);
      // console.log("================MapSearchMapPageFc====================");
      // console.log(res);
      // console.log("===============MapSearchMapPageFc=====================");
      setNumberPage(res?.page);
      // console.log("arrayMap", mapObjects);

      if (res?.page?.current < res?.page?.pages &&stopLoopRequest==false) {
        MapSearchMapPageFc(res?.page?.current + 1, res?.objects);
      }

      // setMapObjects([...mapObjects, ...res?.objects]);
    });
  }, 3000);
  }, [nextPage])
  const abortFc =()=>{
    abortAc()
  }
  const signalFc =()=>{
    signalAc()
  }
  return (
    <MapContext.Provider
      value={{
        MapFc,
        unP,isP,setUnP,setIsP,
        isRegister,
        MapSearchMapFc,
        mapObjects,
        mapObjectsSearch,
        saveMarkAddress,
        setSaveMarkAddress,
        locationMark,
  setLocationMark,
  setSaveMarkInform,
  saveMarkInform,
  isLoadingMap,
  numberPage,
  stopLoopRequest,
  setObjectCreate,
  objectCreate,
  setStopLoopRequest,
  setObjectCreateFilter,
  objectCreateFilter,
  setMapObjects, abortFc,
  signalFc
      }}>
      {children}
    </MapContext.Provider>
  );
}
