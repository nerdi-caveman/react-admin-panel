import React, {
  useRef,
  useEffect,
  useState,
  ReactElement,
  useCallback,
} from "react"
import { DropdownComponent } from "../types"
import styled from "styled-components"
import { useTheme, useThemeMode } from "../theme"
import { rgba, darken, lighten } from "polished"
import { FlexRow } from "../layout"
import Icon from "@mdi/react"
import { mdiChevronDown } from "@mdi/js"
import { Link } from "react-router-dom"

const DropdownElement: any = styled.span`
  position: absolute;
  width: max-content;
  max-width: 11rem;
  min-width: 3rem;
  z-index: 99;
  background: ${(props: any) => props.background};
  color: ${(props: any) => props.color};
  padding: 5px 6px;
  border-radius: 3px;
  opacity: 0;
  transition: 0.25s all ${(props: any) => props.delay};
  font-size: 16px;
  visibility: hidden;
  ${(props: any) => props.position}
  box-shadow: 0px 2px 5px ${rgba("#000", 0.25)};

  &.active {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    width: 10px;
    content: "";
    height: 10px;
    position: absolute;
    z-index: 999;
    width: 0;
    height: 0;
    border-radius: 2px;
  }
`

const DropdownContainer: any = styled.div`
  position: relative;
`

const DropdownGroupContainer: any = styled.div`
  position: relative;
`

const DropdownGroup: any = styled.div`
  position: relative;
`

const DropdownItem: any = styled.div`
  position: relative;
`

const DropdownList: any = styled.ul`
  position: relative;

  li {
    display: block;
    padding: 3px;
    a {
      text-decoration: none;
    }
  }
`

const TargetElement: any = styled.div`
  position: relative;
  cursor: default;
  display: flex;
`

const Dropdown: React.FC<DropdownComponent> = ({
  text,
  listener = "hover",
  children,
  list = [<Link to="">List 1</Link>, "list 2", "list 3"],
  ...props
}) => {
  const theme = useTheme()
  const [themeMode] = useThemeMode()

  const refs = useRef<HTMLDivElement>()
  let indicatorColor = "#444444"
  const [position, setPosition] = useState<"top" | "bottom">("top")

  let indicatorBackground = lighten(0.2, theme[themeMode].background)
  if (themeMode === "darkmode") {
    indicatorBackground = darken(0.065, theme[themeMode].background)
    indicatorColor = "#f4f4f4"
  }

  useEffect(() => {
    const DOMNode = refs.current

    const setELementPosition = (): void => {
      const elementTop: number = DOMNode.querySelector(
        ".dp-trgt"
      ).getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop > windowHeight / 2) {
        setPosition("top")
      } else {
        setPosition("bottom")
      }
    }
    setELementPosition()
    const blur = e => {
      if (listener === "click") {
        const target = DOMNode.querySelector(".dp")
        const dpTarget = DOMNode.querySelector(".dp-trgt")

        if (!dpTarget.contains(e.target) && !target.contains(e.target)) {
          handleBlur()
        }
      }
    }

    window.addEventListener("scroll", () => {
      setELementPosition()
    })

    window.addEventListener("click", e => {
      blur(e)
    })

    return (): void => {
      window.removeEventListener("scroll", () => {
        setELementPosition()
      })
      window.removeEventListener("click", e => {
        blur(e)
      })
    }
  }, [refs])

  const getPosition = () => {
    switch (position) {
      case "top": {
        return `
        top:-13px;
        right:0;
        transform:translate(0, -90%);

        &.active{
            transform:translate(0, -100%);
        }

        &::after{
            bottom: -6px;
            right:12px;
            border-top: 6px solid ${indicatorBackground};
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        `
      }
      case "bottom": {
        return `
        bottom:-13px;
        right:0;
        transform:translate(0%, 90%);

        &.active{
            transform:translate(0%, 100%);
        }

        &::after{    
            top: -6px;
            right:12px;    
            border-bottom: 6px solid ${indicatorBackground};
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        `
      }
      default: {
        return `
        top:-10px;
        transform:translateY(-100%);
        `
      }
    }
  }

  const handleHover = () => {
    const DOMNode = refs.current
    if (DOMNode) {
      const Element = DOMNode.querySelector(".dp")
      Element.classList.add("active")
    }
  }

  const handleBlur = useCallback(() => {
    const DOMNode = refs.current
    if (DOMNode) {
      const Element = DOMNode.querySelector(".dp")
      Element.classList.remove("active")
    }
  }, [refs])

  const renderChildren: React.FC<any> = children => {
    if (typeof children === "string") {
      return (
        <button
          style={{
            background: "transparent",
            fontSize: "initial",
            border: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        >
          <FlexRow gap="7px" yPosition="bottom">
            {children}
            <Icon path={mdiChevronDown} size={0.7} color={indicatorColor} />
          </FlexRow>
        </button>
      )
    }
    return <>{children}</>
  }

  const renderList: React.FC<any> = list => {
    if (list === undefined || list.length < 0) {
      return (
        <DropdownList>
          <li></li>
        </DropdownList>
      )
    }
    return (
      <DropdownList>
        {list.map((item, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </DropdownList>
    )
  }

  return (
    <DropdownContainer ref={refs} {...props}>
      <DropdownElement
        position={getPosition()}
        background={indicatorBackground}
        color={indicatorColor}
        className="dp"
        onMouseEnter={() => {
          if (listener === "hover") {
            handleHover()
          }
        }}
        onMouseLeave={() => {
          if (listener === "hover") {
            handleBlur()
          }
        }}
      >
        {renderList(list)}
      </DropdownElement>
      <TargetElement
        className="dp-trgt"
        onMouseEnter={e => {
          if (listener === "hover") {
            handleHover()
          }
        }}
        onClick={e => {
          if (listener === "click") {
            handleHover()
          }
        }}
        onMouseLeave={e => {
          if (listener === "hover") {
            handleBlur()
          }
        }}
      >
        {renderChildren(children)}
      </TargetElement>
    </DropdownContainer>
  )
}
export default Dropdown