import { globalCss, styled } from "@stitches/react";

import ToolbarButton from "./components/toolbar-button";
// @ts-ignore
import startPage from "./pages/start.html";

const globalStyles = globalCss({
  body: { fontFamily: "sans-serif", margin: 0 },
  h1: { margin: 0 }
});

globalStyles();

const SIDE_PADDING = "10px";
const MIN_CONTENT_WIDTH = "350px";

const Container = styled("div", {
  background: "#FFE8E9",
  minHeight: "100vh",
  height: "100%",
  padding: SIDE_PADDING,
  minWidth: MIN_CONTENT_WIDTH,
  width: `calc(100vw - ${SIDE_PADDING} * 2)`
});

const Header = styled("header", {
  minWidth: "inherit",
  width: "inherit"
});

const Main = styled("main", {
  minWidth: "inherit",
  width: "inherit"
});

const ContentContainer = styled("div", {
  border: "solid 2px #FFCED0",
  borderRadius: "3em .2em 2em .5em/.1em 2em .5em 3em",
  fontSize: "16px",
  minWidth: MIN_CONTENT_WIDTH,
  maxWidth: "768px",
  padding: `calc(${SIDE_PADDING} * 2)`
});

const MainTitle = styled("h1", {
  margin: `0 0 ${SIDE_PADDING} 0`
});

const StatusBar = styled("div", {
  background: "#FFE8E9",
  borderRadius: "3em .2em 2em .5em/.1em 2em .5em 3em",
  margin: "1em 0"
});

const Toolbar = styled("div", {
  padding: SIDE_PADDING
});

const App = () => {
  return (
    <Container>
      <Header>
        <MainTitle>Forty Weeks</MainTitle>
      </Header>
      <Main>
        <Toolbar data-testid="toolbar">
          <ToolbarButton hide={false}>Save</ToolbarButton>
          <ToolbarButton hide={false}>Load</ToolbarButton>
          <ToolbarButton hide={false}>Restart</ToolbarButton>
        </Toolbar>
        <StatusBar>
          <ToolbarButton>Date here</ToolbarButton>
        </StatusBar>
        <ContentContainer>
          <iframe src={startPage} title="Content" />
        </ContentContainer>
      </Main>
    </Container>
  );
};

export default App;
