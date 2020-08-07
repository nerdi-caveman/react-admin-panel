import React, { useEffect, useState } from "react"
import { useLogin, useQueryStore, useLogout, useNotification } from "rap-core"
import {
  Button,
  AppleButton,
  FacebookButton,
  GoogleButton,
  TwitterButton,
  Switch,
  Input,
  Modal,
  Shimmer,
  LinkButton,
  Row,
  Card,
  Column,
  useThemeMode,
  useTheme,
  FormControl,
  Avatar,
} from "rap-ui"
import img from "./brooks-leibee-562087-unsplash.jpg"

const Login: React.FC<any> = () => {
  const [themeMode, setThemeMode] = useThemeMode()
  const theme = useTheme()
  const queryStore = useQueryStore()
  const [, addNotification] = useNotification()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { data: template, loading } = queryStore.getOne("template", {
    name: "Plain Blue",
  })

  useEffect(() => {
    if (!template) {
      addNotification({
        title: "QueryStore",
        text: "Could not fetch from template",
        icon: "mdiAlert",
        iconColor: "danger",
      })
    }
  }, [template, addNotification])
  // const handleLogin: any = (e: EventListener) => {
  //   login({ username: "log" }, "/")
  // }
  // const handleLogout: any = (e: EventListener) => {
  //   console.log(logout({ username: "dd" }, "/"))
  // }

  return (
    <>
      <Modal
        active={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
        title="Modal Title"
      >
        <div>
          <Avatar alt="avatar" text="LD" size="100px" />
          <p>fjfk</p>
        </div>
      </Modal>

      <Row style={{ width: "100%", height: "100%" }}>
        <Row>
          <Card size="sm">
            <h4>User Interface Controls</h4>
            <Row yPosition="center" xPosition="left">
              <p>Switch theme</p>
              <Switch
                active={themeMode === "darkmode" ? true : false}
                color="success"
                onClick={(value: boolean) => {
                  value ? setThemeMode("darkmode") : setThemeMode("lightmode")
                }}
              />
            </Row>
            <Column gap="10px">
              <Button
                background="info"
                onClick={() => {
                  addNotification({
                    title: "Award Unlocked!",
                    icon: "mdiTrophy",
                    text:
                      Math.floor(Math.random() * 100) +
                      "You have reached level 13 and you have been given free 300 coins and +3XP.",
                  })
                }}
              >
                Push Notification
              </Button>
              <Button
                background="dark"
                onClick={() => {
                  setOpenModal(true)
                }}
                size="md"
              >
                Modal
              </Button>
            </Column>
          </Card>
          <Shimmer loading={loading} size="sm">
            <h4>Login Page</h4>
            <Avatar src={img} size="lg" />

            <FormControl>
              <Input
                type="email"
                id="email"
                color="primary"
                label="Email"
                icon="mdiEmailOutline"
                onChange={(value: string) => {
                  console.log(value)
                }}
                onError={() => {}}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl>
              <Input
                id="password"
                type="password"
                color="primary"
                icon="mdiLock"
                label="Password"
                onChange={(value: string) => {
                  console.log(value)
                }}
                onError={() => {}}
                placeholder="Enter your password"
              />
            </FormControl>
            <Column gap="10px">
              <FacebookButton onClick={() => {}} size="md" />
              <LinkButton to="/" glow size="md">
                Back to Home
              </LinkButton>
            </Column>
          </Shimmer>
        </Row>
      </Row>
    </>
  )
}

export default Login
