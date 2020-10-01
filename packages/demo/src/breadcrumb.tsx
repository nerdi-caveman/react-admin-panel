import React from "react"
import {
  FlexRow,
  Card,
  Breadcrumb,
  Container,
  Grid,
  Tabs,
  FlexColumn,
} from "@rap/ui"
import Icon from "@mdi/react"
import { mdiHomeOutline } from "@mdi/js"

const BreadcrumbPage: React.FC<any> = () => {
  return (
    <FlexColumn style={{ minHeight: "100vh" }}>
      <Container>
        <Grid xsCol="12">
          <Card withBackground={false}>
            <FlexRow gap="7px" yPosition="center" xPosition="left">
              <h3>Breadcrumb</h3>
              <Breadcrumb
                seperator="/"
                item={[
                  { name: <Icon path={mdiHomeOutline} size={0.85} />, to: "/" },
                  { name: "Data", to: "/datatable" },
                  { name: "Crumb", to: "" },
                ]}
              />
            </FlexRow>
          </Card>
        </Grid>
        <Card xsCol="12" smCol="7">
          <Tabs
            color="warning"
            list={[
              {
                title: "Success",
                content: (
                  <Container>
                    <Tabs
                      color="warning"
                      align="center"
                      position="left"
                      list={[
                        {
                          title: "Success",
                          content: (
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Accusantium similique nobis odit
                              qui eos laborum natus at quibusdam, laudantium
                              ipsum quod optio veniam minima pariatur quidem
                              praesentium dolor nostrum magni!
                            </p>
                          ),
                          color: "success",
                        },
                        { title: "Info", content: <p>f</p>, color: "info" },
                        {
                          title: "Danger",
                          content: (
                            <p>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Qui corporis magni architecto
                              neque, recusandae a sapiente accusantium quae
                              vitae modi ea suscipit tempora delectus quo sunt?
                              Autem, quas. Molestias, rerum.
                            </p>
                          ),
                          color: "danger",
                        },
                        {
                          title: "Warning",
                          content: <p>ffmh</p>,
                          color: "warning",
                        },
                      ]}
                    />
                  </Container>
                ),
                color: "success",
              },
              { title: "Info", content: <p>f</p>, color: "info" },
              {
                title: "Danger",
                content: (
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Qui corporis magni architecto neque, recusandae a sapiente
                    accusantium quae vitae modi ea suscipit tempora delectus quo
                    sunt? Autem, quas. Molestias, rerum.
                  </p>
                ),
                color: "danger",
              },
              {
                title: "Warning",
                content: <p>ffmh</p>,
                color: "warning",
              },
            ]}
          />
        </Card>
        <Card size="xs" xsCol="12" mdCol="5" smCol="12">
          <Tabs
            color="warning"
            align="center"
            list={[
              {
                title: "Success",
                content: (
                  <Container>
                    <Tabs
                      color="warning"
                      align="right"
                      position="left"
                      list={[
                        {
                          title: "Success",
                          content: (
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Accusantium similique nobis odit
                              qui eos laborum natus at quibusdam, laudantium
                              ipsum quod optio veniam minima pariatur quidem
                              praesentium dolor nostrum magni!
                            </p>
                          ),
                          color: "success",
                        },
                        { title: "Info", content: <p>f</p>, color: "info" },
                        {
                          title: "Danger",
                          content: (
                            <p>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Qui corporis magni architecto
                              neque, recusandae a sapiente accusantium quae
                              vitae modi ea suscipit tempora delectus quo sunt?
                              Autem, quas. Molestias, rerum.
                            </p>
                          ),
                          color: "danger",
                        },
                        {
                          title: "Warning",
                          content: <p>ffmh</p>,
                          color: "warning",
                        },
                      ]}
                    />
                  </Container>
                ),
                color: "success",
              },
              { title: "Info", content: <p>f</p>, color: "info" },
              {
                title: "Danger",
                content: (
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Qui corporis magni architecto neque, recusandae a sapiente
                    accusantium quae vitae modi ea suscipit tempora delectus quo
                    sunt? Autem, quas. Molestias, rerum.
                  </p>
                ),
                color: "danger",
              },
              {
                title: "Warning",
                content: <p>ffmh</p>,
                color: "warning",
              },
            ]}
          />
        </Card>
      </Container>
    </FlexColumn>
  )
}
export default BreadcrumbPage
