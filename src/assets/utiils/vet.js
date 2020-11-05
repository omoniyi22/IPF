export function vetEvent({
  except,
  event_name,
  event_details,
  event_date,
  event_time,
  banner_image,
  file,
  set_reminder,
  reminder,
  reminder_body
}) {
  if (set_reminder === false) {
    if (
      event_name === "" ||
      event_details === "" ||
      event_date === "" ||
      event_time === ""
    ) {
      return [false, "Please fill in all fields"]
    } else {
      if (file === null) {
        return [false, "Please upload image banner"]
      } else {
        return [true]
      }
    }
  } else {
    if (
      event_name === "" ||
      event_details === "" ||
      event_date === "" ||
      event_time === "" ||
      reminder_body === ""
    ) {
      return [false, "Please fill in all fields"]
    } else {
      if (file === null) {
        return [false, "Please upload banner image"]
      } else {
        if (reminder.length <= 0 && !except) {
          return [false, "Please add your reminder date"]
        } else {
          return [true]
        }
      }
    }
  }
}


export function ReminderFormat(a) {
  a = a.substr(2, (a.length - 4))
  a = a.split('","')
  return a
}


export function EmailVet(mail) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checked = re.test(mail)
  return checked
}
