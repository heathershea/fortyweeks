import { globalCss, styled } from "@stitches/react";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
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
  | "prepareToGoOutTonight"
  | "prepareToGoOutTonight:getSomethingToDrink"
  | "prepareToGoOutTonight:goDanceForAWhile"
  | "prepareToGoOutTonight:goDanceForAWhile:followHim"
  | "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim"
  | "prepareToGoOutTonight:goBackHome"
  | "calledAFriend"
  | "goToWardrobe"
  | "goToWardrobe:outfit"
  | "lookInMirror"
  | "study"
  | "findAJob"
  | "signup:camgirl"
  | "signup:waitress"
  | "work:camgirl"
  | "work:waitress"
  | "doctorCheckup"
  | "getAbortion";

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

const enUSCurrencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency"
});

const formatMoney = (amount: number) => {
  return enUSCurrencyFormat.formatToParts(amount).map((part) => {
    switch (part.type) {
      case "currency": {
        return `${part.value} `;
      }
      default: {
        return part.value;
      }
    }
  });
};

const generateMenstrualCycleLength = (prevLength: number) => {
  return Math.floor((range(21, 35) + prevLength) / 2);
};
const generatePeriodLength = (prevLength: number) => {
  return Math.floor(
    (range(1, 10) + range(2, 7) + range(2, 7) + range(3, 8) + prevLength) / 5
  );
};

const range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const initialDate = dayjs().startOf("day");
const prevMenstrualCycleLength = generateMenstrualCycleLength(28);
const initialMenstrualCycleLength = generateMenstrualCycleLength(
  prevMenstrualCycleLength
);

const initialMenstruationStart = initialDate.subtract(
  range(0, initialMenstrualCycleLength),
  "days"
);
const initialPrevMenstruationStart = initialMenstruationStart.subtract(
  initialMenstrualCycleLength,
  "days"
);

const useMenstrualCycle = ({ date }: { date: dayjs.Dayjs }) => {
  const [menstrualCycleLength, setMenstrualCycleLength] = useState(
    initialMenstrualCycleLength
  );
  const [menstruationStart, setMenstruationStart] = useState<dayjs.Dayjs>(
    initialMenstruationStart
  );
  const [previousMenstruationStart, setPreviousMenstruationStart] =
    useState<dayjs.Dayjs>(initialPrevMenstruationStart);
  const nextMenstruationStart = menstruationStart.add(
    menstrualCycleLength,
    "days"
  );

  const [periodLength, setPeriodLength] = useState(generatePeriodLength(4));
  const menstruationEnd = menstruationStart.add(periodLength, "days");
  const amMenstruating =
    (date.isSame(menstruationStart) || date.isAfter(menstruationStart)) &&
    (date.isSame(menstruationEnd) || date.isBefore(menstruationEnd));

  const ovulationStart = menstruationStart.add(10, "days");
  const ovulationEnd = ovulationStart.add(5, "days");

  const amOvulating =
    (date.isSame(ovulationStart) || date.isAfter(ovulationEnd)) &&
    (date.isSame(ovulationEnd) || date.isBefore(ovulationEnd));

  const [conceptionDate, setConceptionDate] = useState<dayjs.Dayjs>();
  const gestationalDate = conceptionDate
    ? previousMenstruationStart
    : undefined;
  const [dueDate, setDueDate] = useState<dayjs.Dayjs>();
  const [amPregnant, setAmPregnant] = useState(false);

  useEffect(() => {
    if (dueDate && !amPregnant) {
      if (
        date.isSame(nextMenstruationStart) ||
        date.isAfter(nextMenstruationStart)
      ) {
        setAmPregnant(true);
      }
    }
  }, [amPregnant, date, dueDate, nextMenstruationStart]);

  useEffect(() => {
    if (date.isSame(nextMenstruationStart) && !amPregnant) {
      // generate next menstrual cycle
      const nextMenstruatrualCycleLength =
        generateMenstrualCycleLength(menstrualCycleLength);
      const nextPeriodLength = generatePeriodLength(periodLength);
      setMenstrualCycleLength(nextMenstruatrualCycleLength);
      setPeriodLength(nextPeriodLength);
      setPreviousMenstruationStart(menstruationStart);
      setMenstruationStart(nextMenstruationStart);
    }
  }, [
    amPregnant,
    date,
    menstrualCycleLength,
    menstruationEnd,
    menstruationStart,
    nextMenstruationStart,
    ovulationEnd,
    ovulationStart,
    periodLength
  ]);

  const becomePregnant = () => {
    const conceptionChance = Math.random();
    if (
      (amOvulating && conceptionChance < 1 / 3) ||
      (amMenstruating && conceptionChance < 0.05) ||
      conceptionChance < 0.01
    ) {
      setDueDate((prev) => {
        if (!prev) {
          return date.add(range(37, 41), "weeks").add(range(0, 6), "days");
        }
        return prev;
      });
      setConceptionDate((prev) => {
        if (!prev) {
          return date;
        }
        return prev;
      });
    }
  };

  const weeksPregnant = gestationalDate
    ? Math.floor(date.diff(gestationalDate, "days") / 7)
    : NaN;

  return {
    amOvulating,
    amMenstruating,
    amPregnant,
    gestationalDate,
    becomePregnant,
    weeksPregnant
  };
};

const App = () => {
  const [date, setDate] = useState(initialDate);
  // average period is 28 days

  const {
    amPregnant,
    amOvulating,
    amMenstruating,
    gestationalDate,
    becomePregnant,
    weeksPregnant
  } = useMenstrualCycle({ date });

  // https://www.calculator.net/bac-calculator.html
  const [bac, setBAC] = useState(0);
  const [money, setMoney] = useState(10);
  const [currentActivity, setCurrentActivity] =
    useState<CurrentActivity>("default");
  const [currentOutfit, setCurrentOutfit] = useState<CurrentOutfit>("dress");
  const [currentOccupations, setCurrentOccupations] = useState<Occupation[]>(
    []
  );
  // Every week home work score is reduced by half
  // If 0 or less, teacher will give detention
  const [homeworkScore, setHomeworkScore] = useState<number>(1);

  const amInebriated = bac > 0.1;
  const amTooDrunk = bac > 0.2;

  const isWeekend = [6, 0].includes(date.day());
  const teacherChecksIfStudied =
    Math.random() > 0.8 && !isWeekend && currentActivity === "default";

  const camgirlTips =
    currentActivity === "work:camgirl"
      ? range(0, 2) === 0
        ? range(0, 150)
        : 0
      : NaN;

  const waitressPay =
    currentActivity === "work:waitress" ? (range(0, 10) > 8 ? 100 : 0) : NaN;

  const [approachedByGuyInClub, setApproachedByGuyInClub] = useState(false);

  const lines = (() => {
    if (currentActivity === "goneToTheMall") {
      return ["You go to the mall (to be written, sorry)"];
    }
    if (currentActivity === "prepareToGoOutTonight") {
      return [
        "You start getting ready to go to a club and have some fun.",
        "After taking a quick shower you go trough your wardrobe to chose some clothes for the night. You ultimately pick some sexy underwear and a skin-tight dress that accentuates your curves. With this you're sure to attract some attention.",
        "",
        "You put on a moderate amount of make-up, take some money and call a cab to go to your favorite night club.",
        "The cab ride is uneventful and you get dropped off in front of the club. As you walk towards the entrance the bouncer looks at you and lets you pass without any problems.",
        "",
        "You are now on the dancefloor, loud music is playing and people around you are dancing, what do you want to do?"
      ];
    }
    if (currentActivity === "prepareToGoOutTonight:getSomethingToDrink") {
      return [
        "You walk up to the bar and order something to drink. As you down it, you look around the club.",
        "You finsh your drink, what do you want to do now?",
        ...(() => {
          if (amTooDrunk) {
            return [
              "You're very drunk, you stumble onto people and have care very little about what happens around you. At this point you probably won't remember much about what happens tonight."
            ];
          }
          if (amInebriated) {
            return [
              "You're pretty drunk, your head is spinning, and you're having a hard time mantaining your balance and composure. Your inihibitions are gone, you might do something stupid if presented the opportunity."
            ];
          }
          return [
            "You're feeling tipsy, your head feels lighter and you have this warm feeling inside of you that makes you happy."
          ];
        })()
      ];
    }
    if (currentActivity === "prepareToGoOutTonight:goBackHome") {
      return [
        "You feel tired from the night out. You decide to get out of the club, get a cab and drive back home."
      ];
    }
    if (currentActivity === "prepareToGoOutTonight:goDanceForAWhile") {
      return [
        "You step on the dancefloor and start moving to the rythm of the music. sensually swaying your hips.",
        ...(() => {
          if (approachedByGuyInClub) {
            return [
              "A guy slowly starts getting closer to you, up to the point where he's basically rubbing onto you, caressing your hips and grabbing your ass. You're flattered of all the attention he's giving you.",
              "You keep dancing for about 30 minutes, rubbing against each other sensually and making out occasionally until he leans close to your hear and aks you to go to a more private place.",
              ...(() => {
                if (amTooDrunk) {
                  return [
                    "Being drunk you don't think too much about it and follow the guy.",
                    "",
                    `As soon as you're in his car, he wastes no time, quickly taking off your ${currentOutfits[currentOutfit]}, while constantly making out with and groping you trough it. You do the same for him until his pants are off and you're left in your sexy underwear.`,
                    "You gingerly remove your panties as he takes off his his underwear, and mount on top of him while he's laying down on the backseat of his car. You slowly start inserting his penis inside of you, moaning as it slides inside your vagina.",
                    "You then start moving your hips forwards and backwards, grinding onto him, moaning in pleasure has he lovingly fondles your breasts.",
                    "This keeps going until your both panting and out of breath, as you get to the brink of orgasm. You hug your lover tightly as he gets ready to cum. You increase your pace as he groans and releases hit hot seed inside of you, you accept it with a massive orgasm, screaming and moaning.",
                    "",
                    "Once done, you hop off the guy and dress up as his cum drips outside of you. You then tell him where you live, and he agrees to bring you back to your house. You drive for a while, until you finally reach your destination. The guy leaves you his number, as you climb out of his car and stumble back inside your house and up the stairs to your room, you suddenly realize you didn't even ask your partner for his name.",
                    "",
                    "You climb into your bed still fully dressed and you drift off to sleep."
                  ];
                }
                return [];
              })()
            ];
          }
          return [
            "You keep dancing. Until you feel tired and decide to take a break."
          ];
        })()
      ];
    }
    if (
      currentActivity === "prepareToGoOutTonight:goDanceForAWhile:followHim"
    ) {
      return [
        `As soon as you're in his car, he wastes no time, quickly taking off your ${currentOutfits[currentOutfit]}, while constantly making out with and groping you trough it. You do the same for him until his pants are off and you're left in your sexy underwear.`,
        "You gingerly remove your panties as he takes off his his underwear, and mount on top of him while he's laying down on the backseat of his car. You slowly start inserting his penis inside of you, moaning as it slides inside your vagina.",
        "You then start moving your hips forwards and backwards, grinding onto him, moaning in pleasure has he lovingly fondles your breasts.",
        "This keeps going until your both panting and out of breath, as you get to the brink of orgasm. You hug your lover tightly as he gets ready to cum. You increase your pace as he groans and releases hit hot seed inside of you, you accept it with a massive orgasm, screaming and moaning.",
        "",
        "Once done, you hop off the guy and dress up as his cum drips outside of you. You then tell him where you live, and he agrees to bring you back to your house. You drive for a while, until you finally reach your destination. The guy leaves you his number, as you climb out of his car and stumble back inside your house and up the stairs to your room, you suddenly realize you didn't even ask your partner for his name.",
        "",
        "You climb into your bed still fully dressed and you drift off to sleep."
      ];
    }
    if (
      currentActivity === "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim"
    ) {
      return [
        "You tell him that you'd rather not follow him. Once he leaves you go back to dancing."
      ];
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
          {(Object.keys(occupations) as Occupation[])
            .filter((occupation) => !currentOccupations.includes(occupation))
            .map((occupation) => (
              <li key={occupation}>
                <ToolbarButton
                  onClick={() => {
                    setCurrentOccupations((prev) => {
                      if (prev.length === Object.keys(occupations).length) {
                        return [...prev];
                      }
                      return [...prev, occupation];
                    });
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
    if (currentActivity === "work:camgirl") {
      return [
        "You start up your camera and get ready for a show.",
        "",
        ...(() => {
          if (camgirlTips > 100) {
            return [
              "You start off with some normal foreplay, slowly massaging your pussy to the camera.",
              "",
              "As you start getting excited, you moan softly, and startt playing with your nipple, feeling your slit getting moister with your love juices.",
              "",
              "You bring your hand to your mouth, sensually lick three fingers and slowly move your hand down towards your vagina. Thanks to both your saliva and your natural lubrication, your fingers slip inside you swiftly, sending waves of pleasure trough your body.",
              "",
              "You keep inserting your fingers inside you, while moaning audibly. Almost unconsciously you reach your other hand from your breast to your clitoris, and start massaging it too.",
              "",
              "In just a few minutes you bring yourself to orgasm, your body shivering with pleasure.",
              "",
              "You end the show."
            ];
          }
          if (camgirlTips > 50) {
            return [
              "You receive enough tips to start a show for the people in the chat.",
              "You take out a bottle of body oil and slowly start dropping some on your tits, letting it slide down to the rest of your body. You close the bottle and move your hands to your breasts, as you start massaging them, your skin glistening and showing goosebumps the more you play with your nipples and flick them between your fingers, making you moan in pleasure.",
              "",
              'You get closer to the camera and whisper to the chat "I wish there was someone here to do this for me"',
              "",
              "Thanks to the lubrification the oil offers you, you just can't help but use your hand to rub your clitoris. You're really getting excited, you're not sure if the oil also was some kind of aphrodisiac or if it's just you, but you just can't help moaning. As you're still rubbing your clit, you can't help but get your other hand down there and slowly start putting fingers inside of yourself.",
              "",
              "You get to the point where you can't just just contain screaming in pleasure.",
              "",
              '"Oh god, yes, yes, god yes!"',
              "",
              "The chat thinks you're just hamming it up, but this is as real as it gets. As you feel yourself getting closer and closer to a massive climax, you arch your back and come like you've never come before. You're completely out of breath. Taking the hand out of your pussy you slowly bring it to your mouth and lick your juices off your fingers."
            ];
          }
          if (camgirlTips > 0) {
            return [
              "You get up and start slowly shaking your ass towards the camera following the tempo of the music.",
              "",
              "You then proceed giving your users a small sensual dance, moving your hips, playing with your pussy and tits and showing off your hot body.",
              "",
              "You run your hands on your flat stomach and gently squeeze your tits together for the pleasure of your viewers."
            ];
          }
          return [
            "You don't get any tips today, guess you'll have better luck next time."
          ];
        })()
      ];
    }
    if (currentActivity === "work:waitress") {
      return [
        "You have a shift at work today, you go out and walk to the restaurant.",
        "",
        "You put on your uniform and start working.",
        "",
        ...(() => {
          if (waitressPay === 0) {
            return [
              "While working you end up dropping a bunch of plates, and your manager calls you into his office to talk to you.",
              "",
              '"Your job performance has been very poor lately, I hope you\'re aware of that. This latest incident is just the last on a long list of mistakes." He says.',
              "",
              "\"I know sir, I'm very sorry for what happened, it won't happen again,\" You respond.",
              "",
              "\"It won't happen again? Really? So what do you think I'm supposed to do to punish your for this situation? Not pay you for the day? Fire you? Can you think of any other way to repay for the damage?\"",
              "",
              '"I don\'t know sir." You tell him.',
              "",
              "\"You won't receive your pay for the day. Don't make me see you fucking up like this again.\" He finishes.",
              "",
              "You don't get any money for working today. In retrospect it could've gone much worse than it did. You could not have not had a job anymore."
            ];
          }
          return range(0, 1) === 0
            ? [
                "You've been assigned to work in the kitchen for today. You don't really get to cook anything, it's mostly just repetitive work and helping the actual chefs. It's honestly just boring.",
                "",
                "You get normal pay."
              ]
            : [
                "After a hard day of work you're left with the task of closing the restaurant.",
                "",
                "You spend one hour cleaning the place up, taking out the garbage and setting the chairs over the tables. It's hard work but you don't really have any choice in doing it."
              ];
        })()
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
        ...(() => {
          if (amPregnant) {
            return [
              "After dressing up the doctor sits you down at his desk with a somewhat concerned look on his face.",
              '"Is there something wrong?" You ask him.',
              '"Well..." He says while looking down at the paperwork.',
              `"You're pregnant." He bluntly says.`,
              "You're somehow taken aback from his words. You stand there watching him for a few minutes without saying anything, letting his words sink in.",
              '"I can\'t be pregnant!" You blurt out.',
              '"Well you can, and you are."',
              `After having a short discussion with your doctor about your menstrual cycle, you learn that you are ${weeksPregnant} weeks pregnant.`,
              '"Oh god... What am I going to do?" You gasp.',
              "\"Well your options are pretty obvious. You can either get an abortion, or have the baby. We won't force you to choose now, take some time and come back to us when you've made your decision.\"",
              "This is a huge shock for you. What can you do? Having a baby is a huge responsibility, and you're way too young for that. But can you really bring yourself to kill it?",
              "You're so distraught that as soon as you get home you just go to bed, unable to think of anything else."
            ];
          }
          return [
            "After asking you a few routine questions about your -special- situation he tells you're perfectly healthy and tells you he wants to see you again next month for another checkup.",
            "You take the bus home and since it's already rather late you decide to spend the night at home."
          ];
        })()
      ];
    }
    if (currentActivity === "getAbortion") {
      return ["You're not pregnant, so you can't get an abortion."];
    }
    return [
      "You wake up.",
      `Today is ${date.format("dddd")}.`,
      ...(() => {
        if (currentOccupations.includes("waitress") && Math.random() < 0.2) {
          return [
            <RestaurantText>
              You receive a phone call. It's the restaurant, they need you to do
              a shift. You can go to work or skip it, the choice is up to you.
            </RestaurantText>,
            <ToolbarButton
              onClick={() => {
                setCurrentActivity("work:waitress");
              }}
            >
              Go to work
            </ToolbarButton>
          ];
        }
        return [];
      })(),
      "",
      ...(() => {
        if (weeksPregnant > 2) {
          return [
            "Your breasts are feeling strangely tender today. Your period seems to be late.",
            ...(() => {
              if (weeksPregnant > 3) {
                return ["You're feeling nauseous."];
              }
              return [];
            })()
          ];
        }
        return [];
      })(),
      "",
      ...(() => {
        if (!isWeekend) {
          return [
            "You have to go to school.",
            "You go to school.",
            ...(() => {
              if (teacherChecksIfStudied) {
                return [
                  "During a lesson the teacher asks you to respond to a question to see if you've been studying.",
                  ...(() => {
                    if (homeworkScore > 0) {
                      return [
                        "",
                        "Luckily you have been studying and was able to answer the question.",
                        "",
                        "The teacher nods his head in approval and continues with the lesson."
                      ];
                    }
                    return [
                      "Unfortunately you've been completely slacking off with your studies and you have no idea how to respond to the question.",
                      "Well well, what a surprise. Maybe after some detention this evening you'll finally start taking your studies a bit more seriously.",
                      "Looks like you'll have to stay in school for the day because of detention. Maybe you should start studying more from now on.",
                      "You spend at least 4 hours helping the teacher moving files and rearranging them. It's very tiring work, especially since this teacher seems to have worked here for at least 30 years, he has stacks over stacks of papers.",
                      "",
                      "By the end of the day you're absolutely exhausted. After coming back home you go straight to bed."
                    ];
                  })()
                ];
              }
              return ["You have a normal day at school."];
            })()
          ];
        }
        return ["It's the weekend!", "You're at your house."];
      })(),
      ...(() => {
        if (amMenstruating && gestationalDate) {
          return ["You're sure you've missed your period."];
        }
        if (amMenstruating) {
          return ["You are having your period."];
        }
        if (amOvulating && !gestationalDate) {
          return [
            "Your breasts feel sore.",
            "You feel like you can smell and taste better.",
            "You feel a dull cramp on one side of your abdomen.",
            "You have a feeling your period might be starting soon."
          ];
        }
        return [];
      })(),
      "You're back at your house, you walk up the stairs and get in your room.",
      "You have the rest of the day free, what do you want to do?"
    ];
  })();

  const hideDefaultActions =
    (
      [
        "prepareToGoOutTonight",
        "prepareToGoOutTonight:getSomethingToDrink",
        "prepareToGoOutTonight:goDanceForAWhile",
        "prepareToGoOutTonight:goDanceForAWhile:followHim",
        "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim",
        "prepareToGoOutTonight:goBackHome",
        "study",
        "doctorCheckup",
        "findAJob",
        "signup:camgirl",
        "signup:waitress",
        "work:camgirl",
        "work:waitress"
      ] as CurrentActivity[]
    ).includes(currentActivity) ||
    (teacherChecksIfStudied && homeworkScore <= 0);

  return (
    <Container>
      <Header>
        <MainTitle>Forty Weeks</MainTitle>
      </Header>
      <Main>
        <Toolbar>
          <ToolbarButton
            hide={
              !(
                currentActivity === "prepareToGoOutTonight:goDanceForAWhile" &&
                approachedByGuyInClub &&
                !amTooDrunk
              )
            }
            onClick={() => {
              setCurrentActivity(
                "prepareToGoOutTonight:goDanceForAWhile:followHim"
              );
              setApproachedByGuyInClub(false);
            }}
          >
            Follow him
          </ToolbarButton>
          <ToolbarButton
            hide={
              !(
                currentActivity === "prepareToGoOutTonight:goDanceForAWhile" &&
                approachedByGuyInClub &&
                !amTooDrunk
              )
            }
            onClick={() => {
              setCurrentActivity(
                "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim"
              );
              setApproachedByGuyInClub(false);
            }}
          >
            Don't follow him
          </ToolbarButton>
          <ToolbarButton
            hide={
              !(
                (currentActivity === "prepareToGoOutTonight:goDanceForAWhile" &&
                  approachedByGuyInClub &&
                  amTooDrunk) ||
                currentActivity ===
                  "prepareToGoOutTonight:goDanceForAWhile:followHim"
              )
            }
            onClick={() => {
              setDate((previousDate) => {
                const nextDate = dayjs(previousDate).add(1, "day");
                return nextDate;
              });
              if (date.day() === 0) {
                // Deduct 2 every week
                setHomeworkScore((prev) => prev - 2);
              }
              becomePregnant();
              setBAC(0);
              setCurrentActivity("default");
              setApproachedByGuyInClub(false);
            }}
          >
            Continue
          </ToolbarButton>
          <ToolbarButton
            hide={
              !(
                (
                  [
                    "prepareToGoOutTonight",
                    "prepareToGoOutTonight:getSomethingToDrink",
                    "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim"
                  ] as CurrentActivity[]
                ).includes(currentActivity) ||
                (currentActivity === "prepareToGoOutTonight:goDanceForAWhile" &&
                  !approachedByGuyInClub)
              )
            }
            onClick={() => {
              setCurrentActivity("prepareToGoOutTonight:getSomethingToDrink");
              setBAC((prev) => {
                return prev + 0.02;
              });
            }}
          >
            Get something to drink
          </ToolbarButton>
          <ToolbarButton
            hide={
              !(
                (
                  [
                    "prepareToGoOutTonight",
                    "prepareToGoOutTonight:getSomethingToDrink",
                    "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim"
                  ] as CurrentActivity[]
                ).includes(currentActivity) ||
                (currentActivity === "prepareToGoOutTonight:goDanceForAWhile" &&
                  !approachedByGuyInClub)
              )
            }
            onClick={() => {
              setApproachedByGuyInClub(Math.random() > 0.7);
              setCurrentActivity("prepareToGoOutTonight:goDanceForAWhile");
            }}
          >
            Go dance for a while
          </ToolbarButton>
          <ToolbarButton
            hide={
              !(
                (
                  [
                    "prepareToGoOutTonight",
                    "prepareToGoOutTonight:getSomethingToDrink",
                    "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim"
                  ] as CurrentActivity[]
                ).includes(currentActivity) ||
                (currentActivity === "prepareToGoOutTonight:goDanceForAWhile" &&
                  !approachedByGuyInClub)
              )
            }
            onClick={() => {
              setBAC(0);
              setCurrentActivity("prepareToGoOutTonight:goBackHome");
            }}
          >
            Go back home
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("goneToTheMall");
            }}
          >
            Go to the mall
          </ToolbarButton>
          <ToolbarButton
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("prepareToGoOutTonight");
            }}
          >
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
              setHomeworkScore((prev) => prev + 1);
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
            hide={hideDefaultActions}
            onClick={() => {
              setCurrentActivity("work:camgirl");
            }}
          >
            Work as a camgirl
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              setDate((previousDate) => {
                const nextDate = dayjs(previousDate).add(1, "day");
                return nextDate;
              });
              if (date.day() === 0) {
                // Deduct 2 every week
                setHomeworkScore((prev) => prev - 2);
              }
              if (!Number.isNaN(camgirlTips) && camgirlTips > 0) {
                setMoney((prev) => prev + camgirlTips);
              }
              setCurrentActivity("default");
            }}
            hide={(
              [
                "prepareToGoOutTonight",
                "prepareToGoOutTonight:getSomethingToDrink",
                "prepareToGoOutTonight:goDanceForAWhile",
                "prepareToGoOutTonight:goDanceForAWhile:dontFollowHim",
                "prepareToGoOutTonight:goDanceForAWhile:followHim"
              ] as CurrentActivity[]
            ).includes(currentActivity)}
          >
            {hideDefaultActions ? "Continue" : "Sleep"}
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
          <ToolbarButton>{formatMoney(money)}</ToolbarButton>
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
