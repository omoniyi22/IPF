import React from 'react'

const SwitchEffect = (
  FormEvent
) => {
  function UrlSwitch() {
    let url
    let urls = ['create-event']
    for (url of urls) {
      if (window.location.href.search(url) != -1) {
        return url
      } else {
        return "Homi"
      }
    }
  }

  switch (UrlSwitch()) {
    case 'create-event':
      return [<FormEvent create={true} />, "form1", "home_port"]
      break;
    case 'Homi':
      return [null]
      break;
  }
}


export default SwitchEffect