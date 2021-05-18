export const formatedDate = (date) => {
  const formatedDate = new Date(date.split("T")[0]);
  return formatedDate.toDateString()
};

export const formatedDate2 = (date) => {
  const dateStr = date.toString()
  return dateStr.slice(0, 15)
}