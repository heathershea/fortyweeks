import range from "../range";

const generateMenstrualCycleLength = (prevLength: number) => {
  return Math.floor((range(21, 35) + prevLength) / 2);
};

export default generateMenstrualCycleLength;
