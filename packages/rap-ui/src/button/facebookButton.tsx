import React from "react"
import { FacebookSocialButton } from "../types"
import Button from "./button"

/**
 * How it works!!
 * background - if border is true set background to transparent else check if backgroundGradient is set or background is set
 * border - if outline is true set border to borderColor or background else set to none
 */

const FacebookButton: React.FC<FacebookSocialButton> = ({
  text = "Sign in with Facebook",
  color = "blue",
  corners = "box",
  onClick,
  iconOnly = false,
  gradient = false,
  style = {},
  size = "sm",
  children,
}) => {
  let textColor: string = ""
  let background: string = ""

  // set textColor and background according to color theme
  switch (color) {
    case "blue": {
      textColor = "#fff"
      background = "#3c5eff"
      break
    }
    default: {
      textColor = "#3c5eff"
      background = "#fff"
    }
  }

  Object.assign(style, {
    fontFamily: "Roboto",
    fontSize: "15px",
    lineHeight: "19px",
  })
  return (
    <Button
      background={background}
      size={size}
      iconColor={textColor}
      corners={corners}
      gradient={gradient}
      iconOnly={iconOnly}
      icon="mdiFacebook"
      textColor={textColor}
      style={style}
      onClick={onClick}
    >
      {children || text}
    </Button>
  )
}

export default FacebookButton