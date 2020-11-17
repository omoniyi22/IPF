window.onclick = function (event) {
  if (!event.target.matches('#dropas')
    && !event.target.matches('#dropa')
    && !event.target.matches('#drope')
    // && !event.target.matches('#toe')
  ) {
    if (document.querySelector("#dropa"))
      document.querySelector("#dropa").style.display = "none"
    console.log("Hooola")
  } else {
    if (document.querySelector("#dropa"))
      if (document.querySelector("#dropa").style.display === "none")
        document.querySelector("#dropa").style.display = "block"
      else
        document.querySelector("#dropa").style.display = "none"
  }
}