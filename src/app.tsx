import { globalCss, styled } from "@stitches/react";
import * as Toolbar from "@radix-ui/react-toolbar";
import ActionsBar from "./components/actions-bar";

const globalStyles = globalCss({
  body: { fontFamily: "sans-serif", margin: 0 },
  h1: { margin: 0 }
});

globalStyles();

const Container = styled("div", {
  background: "rgba(255, 243, 245, 1)",
  minHeight: "100vh",
  minWidth: "100vw",
  height: "100%",
  padding: "2em",
  width: "100%"
});

const ContentContainer = styled("div", {
  background: "white",
  borderRadius: "5px",
  height: "50%",
  padding: "1em",
  width: "50%"
});

const MainTitle = styled("h1", {
  margin: "0 0 1em 0"
});

const Content = () => {
  return (
    <ContentContainer>
      You wake up. Today is Tuesday. You have to go to school. You go to school.
      You have a normal day at school. You're back at your house, you walk up
      the stairs and get in your room. You have the rest of the day free, what
      do you want to do?
    </ContentContainer>
  );
};

const App = () => {
  return (
    <Container>
      <header>
        <MainTitle>Forty Weeks</MainTitle>
      </header>
      <main>
        <Content />
        <ActionsBar />
      </main>
    </Container>
  );
};

export default App;
