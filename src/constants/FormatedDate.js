export const formatedDate = (date) => {
  const formatedDate = new Date(date.split("T")[0]);
  return formatedDate.toDateString()
};