import React, { useRef, useEffect } from "react"
import { ButtonProps } from "../types"
import styled from "styled-components"
import { lighten, rgba, darken } from "polished"
import Icon from "@mdi/react"
import * as path from "@mdi/js"
import { useTheme } from "../theme"
/**
 * How it works!!
 * background - if border is true set background to transparent else check if backgroundGradient is set or background is set
 * border - if outline is true set border to borderColor or background else set to none
 */

const Button1: any = styled.button`
font-family: Nunito sans;
  position:relative;
  background: ${(props: any) =>
    props.outline
      ? "transparent"
      : props.backgroundGradient || props.background};
  color: ${(props: any) =>
    props.outline ? props.background : props.textColor};
  font-size: 14px;
  padding: ${(props: any) =>
    !props.iconOnly ? props.padding : props.iconPadding};
  border-radius: ${(props: any) => props.borderRadius};
  cursor: pointer;
  display:flex;
  align-items: center;
  justify-content:center;
  flex-direction ${(props: any) => (props.iconRight ? "row-reverse" : "row")};
  transition: all 0.35s ease;
  border: ${(props: any) =>
    props.outline
      ? "1px solid " + (props.borderColor || props.background)
      : "none"};
  box-shadow: 0 8px 35px -6px ${(props: any) =>
    props.glow ? darken(0.13, props.background) : "transparent"};
  overflow:hidden;
  box-sizing: border-box;

  &:disabled {
    background: ${(props: any) =>
      !props.border ? lighten(0.1, props.background) : "transparent"};
    cursor:not-allowed;
  }

  &:hover, &:focus{
    ${(props: any) =>
      props.outline
        ? `background: ${props.background};
      color: ${props.textColor};`
        : "background:" +
          (!props.backgroundgradient && darken(0.05, props.background)) +
          ";"}
  }

  &:focus{
    outline:none;
  }

  span:not(.text){
    position:absolute;
    background:${(props: any) => rgba(lighten(0.5, props.background), 0.4)};
    width:100px;
    height:100px;
    margin-top: -50px;
    margin-left: -50px;
    opacity: 0;
    animation: ripple 1s;
    border-radius:100px;
    z-index:1;
  }

  &:focus:not(:active)::after {
    display: block;
  }
  
  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }
    to {
      opacity: 0;
      transform: scale(5);
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .text{
    color: ${(props: any) =>
      props.outline ? props.background : props.textColor};
    }

  &.loading{
    background: ${(props: any) => lighten(0.1, props.background)};
    .rap-core, .text, svg{
      visibility:hidden;
    }
    
    .rap-cus-loa{
      visibility:visible;
      position:absolute;
      display:flex;
      justify-content:center;
      align-items:center;

      svg{
        position: absolute;
        visibility:visible;
      }
    }
    .rap-loa {
      animation: spin .45s linear infinite;
      visibility:visible;
      position:absolute;

      *{
        visibility:visible;
      }
    }
  }
`

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconOnly = false,
  corners = "box",
  background = "primary",
  hoverColor,
  iconColor = "#ffffff",
  textColor = "#ffffff",
  iconRight = false,
  gradient = false,
  size = "md",
  loadingIcon,
  loading = false,
  ...props
}) => {
  const refs: any = useRef()

  const Theme = useTheme()

  // create ripple effects when button clicked
  useEffect(() => {
    const button: HTMLElement = refs.current
    let onButtonClick: any

    onButtonClick = button.addEventListener<"click">(
      "click",
      (e: MouseEvent): void => {
        let x = e.clientX - button.getBoundingClientRect().left
        let y = e.clientY - button.getBoundingClientRect().top

        const span: HTMLSpanElement = document.createElement("span")
        span.style.top = y + "px"
        span.style.left = x + "px"
        button.append(span)

        setTimeout(() => {
          button.removeChild(span)
        }, 1000)
      }
    )
    return () => {
      button.removeEventListener("click", onButtonClick, false)
    }
  }, [])

  const getStyleFromCornersProps: Function = (): any => {
    switch (corners) {
      case "rounded":
        return { borderRadius: "50px" }
      case "box":
        return { borderRadius: "5px" }
      default:
        throw new Error("corners only accepts 'box, and rounded' as values")
    }
  }

  const getStyleFromSizeProps: Function = (): any => {
    switch (size) {
      case "xs":
        return { padding: "5px", iconPadding: "5px" }
      case "sm":
        return { padding: "8px 20px", iconPadding: "8px" }
      case "md":
        return { padding: "9.5px 28px", iconPadding: "9.5px" }
      case "lg":
        return { padding: "15px 35px", iconPadding: "15px" }
      default:
        throw new Error("corners only accepts 'box, and rounded' as values")
    }
  }

  const getStyleFromBackgroundProps: Function = (): any => {
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
    if (supportedColors.includes(background.trim())) {
      return {
        backgroundGradient:
          gradient &&
          `linear-gradient(138deg,${Theme.colors[background.trim()]}, ${rgba(
            Theme.colors[background.trim()],
            0.6
          )})`,
        background: Theme.colors[background.trim()],
      }
    } else {
      return {
        backgroundGradient:
          gradient &&
          `linear-gradient(138deg,${background.trim()}, ${rgba(
            background.trim(),
            0.6
          )})`,
        background,
      }
    }
  }

  const isObject: Function = (object: any): boolean =>
    typeof object === "object"

  const updateProps: Function = (value: any): any => {
    if (value && isObject(value)) {
      return (props = Object.assign(props, value))
    }
    throw new Error("value must be an object")
  }
  const getIconStyle: Function = (): any => {
    if (iconOnly) return { margin: "0", padding: "1px" }
    return iconRight ? { marginLeft: "4px" } : { marginRight: "4px" }
  }

  updateProps(getStyleFromCornersProps())
  updateProps(getStyleFromSizeProps())
  updateProps(getStyleFromBackgroundProps())
  if (background === "white" && textColor === "#ffffff") {
    updateProps({ textColor: "#222222" })
  }
  updateProps({ textColor: textColor, iconRight, iconOnly })

  return (
    <Button1 {...props} ref={refs} className={loading ? "loading" : ""}>
      {loading &&
        (loadingIcon ? (
          <div className="rap-cus-loa">{loadingIcon}</div>
        ) : (
          <Icon
            className="rap-loa"
            path={path.mdiLoading}
            color={iconColor}
            size={0.75}
            style={getIconStyle()}
          />
        ))}
      {icon && (
        <Icon
          className="rap-ico"
          path={path[icon]}
          color={iconColor}
          size={0.75}
          style={getIconStyle()}
        />
      )}
      {!iconOnly && <span className="text">{children}</span>}
    </Button1>
  )
}

export default Button
