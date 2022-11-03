import React from "react";
import styled from "styled-components/native";
const ViewW = styled.View.attrs(({ size }: { size: number }) => {
  return {
    width: size,
  };
})``;
const ViewH = styled.View.attrs(({ size }: { size: number }) => {
  return {
    height: size,
  };
})``;
export function SpaceW({ space }: { space: number }) {
  return <ViewW size={space} />;
}
export function SpaceH({ space }: { space: number }) {
  return <ViewH size={space} />;
}
