import { styled } from "@stitches/react";
import { violet, blackA, mauve, pink } from "@radix-ui/colors";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import WorkSelect from "./work-select";

const StyledToolbar = styled(ToolbarPrimitive.Root, {
  display: "flex",
  padding: 10,
  width: "fit-content",
  marginTop: "1em",
  minWidth: "max-content",
  borderRadius: 6,
  backgroundColor: "white",
  boxShadow: `0 2px 10px ${blackA.blackA7}`
});

const itemStyles = {
  all: "unset",
  flex: "0 0 auto",
  color: mauve.mauve11,
  height: 25,
  padding: "0 5px",
  borderRadius: 4,
  display: "inline-flex",
  fontSize: 13,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { backgroundColor: violet.violet3, color: violet.violet11 },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${violet.violet7}` }
};

const StyledButton = styled(
  ToolbarPrimitive.Button,
  {
    ...itemStyles,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
    backgroundColor: pink.pink9
  },
  { "&:hover": { color: "white", backgroundColor: pink.pink8 } }
);

const StyledLink = styled(
  ToolbarPrimitive.Link,
  {
    ...itemStyles,
    backgroundColor: "transparent",
    color: mauve.mauve11,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center"
  },
  { "&:hover": { backgroundColor: "transparent", cursor: "pointer" } }
);

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
  width: 1,
  backgroundColor: mauve.mauve6,
  margin: "0 10px"
});

// Exports
const Toolbar = StyledToolbar;
const ToolbarButton = StyledButton;
const ToolbarSeparator = StyledSeparator;
const ToolbarLink = StyledLink;

const ActionsBar = () => {
  return (
    <Toolbar aria-label="Formatting options">
      <ToolbarButton value="go-mall" aria-label="Go to the mall">
        Go to the mall
      </ToolbarButton>
      <ToolbarButton
        value="go-out-tonight"
        aria-label="Prepare to go out tonight"
        css={{ marginLeft: 10 }}
      >
        Prepare to go out tonight
      </ToolbarButton>
      <ToolbarButton
        value="call-a-friend"
        aria-label="Call a friend"
        css={{ marginLeft: 10 }}
      >
        Call a friend
      </ToolbarButton>
      <ToolbarSeparator />
      <WorkSelect />
      <ToolbarSeparator />
      <ToolbarLink target="_blank" css={{ marginRight: 10 }}>
        Monday
      </ToolbarLink>
      <ToolbarLink target="_blank" css={{ marginRight: 10 }}>
        Jan 01, 2022
      </ToolbarLink>
    </Toolbar>
  );
};

export default ActionsBar;
