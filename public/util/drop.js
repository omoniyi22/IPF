window.onclick = function (event) {
  if (!event.target.matches('#dropas')
    && !event.target.matches('#dropa')
    && !event.target.matches('#drope')
    // && !event.target.matches('#toe')
  ) {
    if (document.getElementById("dropa"))
      document.getElementById("dropa").style.display = "none"
    console.log("Hooola")
  } else {
    if (document.getElementById("dropa"))
      if (document.getElementById("dropa").style.display === "none")
        document.getElementById("dropa").style.display = "block"
      else
        document.getElementById("dropa").style.display = "none"
  }
}