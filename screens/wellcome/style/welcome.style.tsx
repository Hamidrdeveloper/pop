import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light.blue};
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs(()=>{
    
})`
  width: 333px;
  height:452.75px;
  align-items: center;
  justify-content: center;
  font-family: "Hurme";

`;
export const TextLogo = styled.Text.attrs(()=>{
    
})`
  font-size:18px;
  color:${Colors.light.withe};
  
`;