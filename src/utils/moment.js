import moment from "moment";

export function returnToFromNow(date) {
  let _newDate = moment(date).format("LL");
  return _newDate;
}

export function returnTimeFromDate(date) {
  let _date = date;
  if (!date || typeof date !== "string") {
    _date = moment();
  }
  let time = moment(_date).format("hh:mm a");

  return time;
}
