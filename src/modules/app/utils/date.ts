/* eslint-disable import/prefer-default-export */
export const generateCurrentDate = (): string => {
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 >= 10
      ? currentDate.getMonth() + 1
      : `0${currentDate.getMonth() + 1}`
  }-${
    currentDate.getDate() >= 10
      ? currentDate.getDate()
      : `0${currentDate.getDate()}`
  } ${
    currentDate.getHours() >= 10
      ? currentDate.getHours()
      : `0${currentDate.getHours()}`
  }:${
    currentDate.getMinutes() >= 10
      ? currentDate.getMinutes()
      : `0${currentDate.getMinutes()}`
  }:${
    currentDate.getSeconds() >= 10
      ? currentDate.getSeconds()
      : `0${currentDate.getSeconds()}`
  }`;

  return dateString;
};
