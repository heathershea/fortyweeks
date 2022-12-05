import { styled } from "@stitches/react";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

const beforeAndAfter = {
  borderRadius: "4px",
  boxShadow: "0 1px 4px #ffced0",
  content: "",
  height: "100%",
  position: "absolute",
  width: "100%"
};

const Container = styled("button", {
  position: "relative",
  display: "inline-block",
  textAlign: "center",
  textDecoration: "none",
  margin: "3px",
  padding: "8px 25px 8px 25px",
  background: "none",
  fontSize: "100%",
  color: "#f08080",
  border: "solid 2px #ffced0",
  borderRadius: "3em .5em 2em .5em/.4em 2em .5em 3em",
  cursor: "pointer",
  "&:before": { ...beforeAndAfter },
  "&::before": {
    backgroundColor: "#ffced0",
    left: 0,
    top: "4px",
    zIndex: "-1"
  },
  "&::after": {
    ...beforeAndAfter,
    backgroundColor: "#ffced0",
    top: "5px",
    left: "5px",
    zIndex: "-2"
  },
  "&:hover": {
    backgroundColor: "#ffced0"
  }
});

const ToolbarButton: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    hide?: boolean;
  }
> = ({ hide, ...props }) => {
  return (
    <Container
      type="button"
      {...props}
      css={{ display: hide ? "none" : "unset" }}
    />
  );
};

export default ToolbarButton;
