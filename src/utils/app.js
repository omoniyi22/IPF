export const isEmailValid = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};

export const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(231,233,237)",
};

export const avata = "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png"