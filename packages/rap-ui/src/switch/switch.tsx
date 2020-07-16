import React, { useState } from "react"
import { SwitchProps } from "../types"
import styled from "styled-components"
import { colors } from "../default.json"
import { rgba, lighten } from "polished"

const SwitchButton: any = styled.button`
  position: relative;
  min-width: 42px;
  height: 22px;
  display: flex;
  font-size: 11px;
  font-family: Nunito sans;
  align-items: center;
  justify-content: ${(props: any) =>
    props.active ? "flex-end" : "flex-start"};
  cursor: pointer;
  border-radius: 40px;
  border: none;
  transition: all 0.35s;
  background: ${(props: any) => (props.active ? props.color : "#eaeaea")};
  outline: none;

  &:disabled {
    cursor: not-allowed;
  }
`

const SwitchInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 200;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  left: 0;

  &:checked {
    + .circle {
      right: calc(100% - 4px);
      transform: translate(100%, -50%);
    }
  }
`

const Circle = styled.span`
  position: absolute;
  height: 17px;
  width: 17px;
  background: #ffffff;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 30px;
  right: 4px;
  box-shadow: 0 2px 7px ${rgba("#000", 0.6)};
  transition: all 0.35s;
`

const Text: any = styled.span`
  text-align: right;
  align-self: right;
  color: ${(props: any) => (props.active ? "#ffffff" : "222222")};
  padding-left: ${(props: any) => (props.active ? "22px" : "3px")};
  padding-right: ${(props: any) => (!props.active ? "22px" : "3px")};
`

const Switch: React.FC<SwitchProps> = ({
  id,
  color = "info",
  active = false,
  disabled = false,
  onText,
  offText,
  onClick,
}) => {
  const [isActive, setIsActive] = useState<boolean>(active)

  const getColor: Function = (): any => {
    const supportedColors = [
      "primary",
      "success",
      "info",
      "danger",
      "warning",
      "transparent",
      "white",
      "dark",
    ]
    if (supportedColors.includes(color.trim())) {
      if (disabled) {
        return rgba(lighten(0.28, colors[color]), 0.4)
      }
      return colors[color]
    } else {
      if (disabled) {
        return rgba(lighten(0.28, color), 0.4)
      }
      return color
    }
  }

  return (
    <SwitchButton color={getColor()} active={isActive} id={id}>
      <SwitchInput
        type="checkbox"
        disabled={disabled}
        checked={isActive}
        onChange={e => {
          !e.target.disabled && setIsActive(!isActive)
          onClick(!isActive)
        }}
      />
      <Circle className="circle"></Circle>
      <Text active={isActive}>{isActive ? <>{onText}</> : <>{offText}</>}</Text>
    </SwitchButton>
  )
}
export default Switch