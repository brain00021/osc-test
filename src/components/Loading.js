import { useState, useEffect, useRef, useContext, createContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import GlobalContext from "../context.js";

const LoadingDiv = styled.div`
  font-size: 1.5em;
  text-align: center;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  justify-content: center;
  align-items: center;
  background: #fff;
  pointer-events: none;
`;
const Title = styled.h4`
  margin-bottom: 10px;
`;
const LoadingItem = ({ message = "" }) => {
  const { loadingStatus } = useContext(GlobalContext);
  const [loading, setLoading] = loadingStatus;
  return (
    <LoadingDiv
      className={`
        loadingPage
        ${!loading ? "animate__animated" : ""}
        ${!loading ? "animate__fadeOut" : ""}
      `}
    >
      <div>
        <Title>{message}</Title>
        <Spinner />
      </div>
    </LoadingDiv>
  );
};
export default LoadingItem;
