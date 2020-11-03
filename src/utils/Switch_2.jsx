import React from 'react'

const SwitchEffect = (
  EditForm, FormInvite
) => {
  function UrlSwitch() {
    let url
    let urls = ['invite', 'edit_event']
    for (url of urls) {
      if (window.location.href.search(url) != -1) {
        return url
      }
    }
  }
  switch (UrlSwitch()) {
    case 'invite':
      return [<FormInvite />, "form1", "home_port"]
      break;
    case 'edit_event':
      return [<EditForm edit={true} title={true} />, "form1", "home_port"]
      break;
    default:
      return [null]
      break;
  }
}


export default SwitchEffect