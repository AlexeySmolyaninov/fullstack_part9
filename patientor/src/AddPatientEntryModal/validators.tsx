export const isDateLightCheck = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, date.length);
  return (
    date[4] === "-" &&
    date[7] === "-" &&
    RegExp(/^[0-9]{4}$/).exec(year) &&
    RegExp(/^0[1-9]$|^1[0-2]$/).exec(month) &&
    RegExp(/^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/).exec(day)
  );
};
