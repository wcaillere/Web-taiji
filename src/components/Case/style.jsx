import styled from "styled-components";

export const CaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  width: 35px;
  height: 35px;
  font-size: 8px;
  background: ${(props) => (props.isClicked ? "white" : "")};
  color: black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    background: ${(props) =>
      props.isClicked ? "" : "rgb(255, 255, 255, 0.6)"};
  }
`;

export const CaseBorder = styled.div`
  border: white solid 2px;
  margin: 2px;
`;
