import dayjs from "dayjs";
import { useEffect, useState } from "react";
import generateMenstrualCycleLength from "../generate-menstrual-cycle-length";

import range from "../range";

const generatePeriodLength = (prevLength: number) => {
  return Math.floor(
    (range(1, 10) + range(2, 7) + range(2, 7) + range(3, 8) + prevLength) / 5
  );
};

const useMenstrualCycle = ({
  date,
  initialMenstrualCycleLength,
  initialMenstruationStart,
  initialPrevMenstruationStart
}: {
  date: dayjs.Dayjs;
  initialMenstrualCycleLength: number;
  initialPrevMenstruationStart: dayjs.Dayjs;
  initialMenstruationStart: dayjs.Dayjs;
}) => {
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

export default useMenstrualCycle;
