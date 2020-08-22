export default function fixNumber(number) {
  let num = number;

  if (num && num.substr(0, 4) === "+234" && num.trim().length === 15) {
    let fix = num.substr(4);
    if (fix.substr(0, 1) !== "0") return false;
    return fix;
  }

  if (num && num.substr(0, 4) === "+234" && num.trim().length === 14) {
    return "0" + num.substr(4);
  }

  if (num && num.trim().length === 11) {
    if (num.substr(0, 1) !== "0") return false;
    return num;
  }

  return false;
}

export function fixNg(number) {
  if (number.trim().length === 11 && number.substr(0, 1) === "0") {
    return "+234" + number.substr(1);
  }
  return "+234" + number;
}

export function fixIndian(number) {
  let num = number;
  return "+91" + num;
}

export function refixNG(number) {
  return number.substr(4);
}
