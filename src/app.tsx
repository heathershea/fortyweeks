import { globalCss, styled } from "@stitches/react";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import ToolbarButton from "./toolbar-button";

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

type CurrentOutfit = "dress" | "skinnyJeansAndTop" | "shortShortsAndTShirt";
const currentOutfits: Record<CurrentOutfit, string> = {
  dress: "dress",
  skinnyJeansAndTop: "skinny jeans and top",
  shortShortsAndTShirt: "short shorts and T-shirt"
};

type CurrentActivity =
  | "default"
  | "goneToTheMall"
  | "calledAFriend"
  | "goToWardrobe"
  | "goToWardrobe:outfit"
  | "lookInMirror"
  | "study"
  | "findAJob"
  | "signup:camgirl"
  | "signup:waitress"
  | "doctorCheckup";

type Occupation = "camgirl" | "waitress";

const occupations: Record<Occupation, string> = {
  camgirl: "camgirl",
  waitress: "waitress"
};
const occupationSignupActivities: Record<Occupation, CurrentActivity> = {
  camgirl: "signup:camgirl",
  waitress: "signup:waitress"
};

const OccupationChoices = styled("ul", {
  display: "flex",
  listStyleType: "none",
  padding: 0
});
const RestaurantText = styled("span", {
  color: "#6DB37F"
});

const App = () => {
  const [date, setDate] = useState(dayjs("2022-01-01 00:00:00"));
  const [currentActivity, setCurrentActivity] =
    useState<CurrentActivity>("default");
  const [currentOutfit, setCurrentOutfit] = useState<CurrentOutfit>("dress");
  const [currentOccupations, setCurrentOccupations] = useState<Occupation[]>(
    []
  );

  const lines = (() => {
    if (currentActivity === "goneToTheMall") {
      return ["You go to the mall (to be written, sorry)"];
    }
    if (currentActivity === "calledAFriend") {
      return ["You call a friend"];
    }
    if (currentActivity === "study") {
      return ["You spend the night studying really hard."];
    }
    if (currentActivity === "findAJob") {
      return [
        "You're a bit strapped for cash lately, you finally decide a job might be what you need.",
        "Hopefully you can manage having a job and still keep up with your studies.",
        "Here's the jobs you manage to find, what would you like to do?",
        <OccupationChoices>
          {(Object.keys(occupations) as Occupation[]).map((occupation) => (
            <li key={occupation}>
              <ToolbarButton
                onClick={() => {
                  setCurrentOccupations((prev) => [...prev, occupation]);
                  setCurrentActivity(occupationSignupActivities[occupation]);
                }}
              >
                {occupation}
              </ToolbarButton>
            </li>
          ))}
        </OccupationChoices>
      ];
    }
    if (currentActivity === "signup:camgirl") {
      return [
        "Luckily the registration process doesn't take much at all. In a few minutes your account is ready to go. You spend some more setting up your cam."
      ];
    }
    if (currentActivity === "signup:waitress") {
      return [
        "While browsing trough the job listings you notice one for a part-time waitress job. With your limited experience, your condition and your school this seems like the best job you could possibly find. You call them and you schedule an interview later in the day.",
        "The job isn't that far away from where you live, so you just need to walk a few city blocks to get there.",
        "While browsing trough the job listings you notice one for a part-time waitress job. With your limited experience and your school this seems like the best job you could possibly find. You call them and you schedule an interview later in the day.",
        "The job isn't that far away from where you live, so you just need to walk a few city blocks to get there.",
        "",
        "The interview goes well and you get the job."
      ];
    }
    if (currentActivity === "goToWardrobe") {
      return (Object.keys(currentOutfits) as CurrentOutfit[]).map((outfit) => (
        <ToolbarButton
          onClick={() => {
            setCurrentActivity("goToWardrobe:outfit");
            setCurrentOutfit(outfit);
          }}
          key={outfit}
        >
          {currentOutfits[outfit]}
        </ToolbarButton>
      ));
    }
    if (currentActivity === "goToWardrobe:outfit") {
      return [`You put on a ${currentOutfits[currentOutfit]}`];
    }
    if (currentActivity === "lookInMirror") {
      return [
        "You look at yourself in the mirror.",
        `You are currently wearing a ${currentOutfits[currentOutfit]} which fits your hot body perfectly.`
      ];
    }
    if (currentActivity === "doctorCheckup") {
      return [
        "You walk to the bus stop, your only mean to go to your doctor's office.",
        "The bus is crowded, you're surrounded by people. All the seats are occupied, forcing you to stand up. God you hate buses.",
        "Not to mention every once in a while some old man bumps into you and touches your butt, making it seem like it was an accident.",
        "Luckily you manage to endure this torture and get to your stop.",
        "The Doctor's office is filled with women of varying ages. The environment feels very sterile and clean, it feels uncomfortable to just stay in the waiting room.",
        "You sit down and read some magazines while you wait to be called.",
        "After around fifteen minutes a nurse comes into the room and calls you in.",
        "",
        "You spend a half an hour getting examined by the doctor.",
        "After asking you a few routine questions about your -special- situation he tells you're perfectly healthy and tells you he wants to see you again next month for another checkup.",
        "You take the bus home and since it's already rather late you decide to spend the night at home."
      ];
    }
    return [
      "You wake up.",
      `Today is ${date.format("dddd")}.`,
      ...(() => {
        if (currentOccupations.includes("waitress") && Math.random() < 0.2) {
          return [
            <RestaurantText>
              You receive a phone call. It's the restaurant, they need you to do
              a shift. You can go to work or skip it, the choice is up to you
            </RestaurantText>
          ];
        }
        return [];
      })(),
      "",
      ...(() => {
        if (![6, 0].includes(date.day())) {
          return [
            "You have to go to school.",
            "You go to school.",
            "You have a normal day at school."
          ];
        }
        return ["It's the weekend!", "You're at your house."];
      })(),
      "You're back at your house, you walk up the stairs and get in your room.",
      "You have the rest of the day free, what do you want to do?"
    ];
  })();

  const hideDefaultActions = (
    [
      "study",
      "doctorCheckup",
      "findAJob",
      "signup:camgirl",
      "signup:waitress"
    ] as CurrentActivity[]
  ).includes(currentActivity);

  return (
    <Container>
      <Header>
        <MainTitle>Forty Weeks</MainTitle>
      </Header>
      <Main>
        <Toolbar>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("goneToTheMall");
            }}
          >
            Go to the mall
          </ToolbarButton>
          <ToolbarButton hide={hideDefaultActions}>
            Prepare to go out tonight
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("calledAFriend");
            }}
          >
            Call a friend
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("study");
            }}
          >
            Study
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("findAJob");
            }}
          >
            Find a job
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              setDate((previousDate) => {
                const nextDate = dayjs(previousDate).add(1, "day");
                return nextDate;
              });
              setCurrentActivity("default");
            }}
          >
            Sleep
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("goToWardrobe");
            }}
          >
            Go to wardrobe
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("lookInMirror");
            }}
          >
            Look in the mirror
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("doctorCheckup");
            }}
          >
            Doctor checkup
          </ToolbarButton>
          <ToolbarButton hide={hideDefaultActions}>
            Get an abortion ($300)
          </ToolbarButton>
          <ToolbarButton hide={hideDefaultActions}>Save</ToolbarButton>
          <ToolbarButton hide={hideDefaultActions}>Load</ToolbarButton>
          <ToolbarButton hide={hideDefaultActions}>Restart</ToolbarButton>
        </Toolbar>
        <StatusBar>
          <ToolbarButton>{date.format("DD MMMM, dddd")}</ToolbarButton>
        </StatusBar>
        <ContentContainer>
          {lines.map((line, i) => (
            <Fragment key={i}>
              {line}
              <br />
            </Fragment>
          ))}
        </ContentContainer>
      </Main>
    </Container>
  );
};

export default App;
