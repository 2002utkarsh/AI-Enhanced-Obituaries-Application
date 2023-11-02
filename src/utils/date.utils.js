export function convertDate(dateString) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const formattedDate = new Date(dateString)
  return (
    days[formattedDate.getDay()] +
    " " +
    months[formattedDate.getMonth()] +
    " " +
    formattedDate.getDate() +
    " " +
    formattedDate.getFullYear()
  ) 
}
