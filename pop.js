function EmailVet(mail) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checked = re.test(mail)
  return checked
}

console.log(EmailVet("omon@gmailc.om"))


const data = [
    {
      "id": "4cbdd74a-5e95-4b0e-8f18-6c8a4990a889",
      "member_name": "Seun Seun",
      "member_role": "member",
      "email_address": "seun@techparlons.com",
      "event_id": "25891d17-308c-478b-ac2d-32c04c9216ad",
      "date_sent": "2020-11-04T16:41:20.000Z",
      "date_rejected": null,
      "date_accepted": null,
      "status": "PENDING",
      "created_at": "2020-11-04T16:41:20.000Z",
      "updated_at": "2020-11-04T16:41:20.000Z"
    },
    {
      "id": "66a373e5-97f5-4a3b-b5b7-756ea6f3b374",
      "member_name": "Seun Seun",
      "member_role": "member",
      "email_address": "seun@techparlons.com",
      "event_id": "25891d17-308c-478b-ac2d-32c04c9216ad",
      "date_sent": "2020-11-04T22:15:00.000Z",
      "date_rejected": null,
      "date_accepted": null,
      "status": "PENDING",
      "created_at": "2020-11-04T22:15:00.000Z",
      "updated_at": "2020-11-04T22:15:00.000Z"
    },
    {
      "id": "688d9063-36c6-43e4-8a8a-ff7a6df300fd",
      "member_name": "Seun Seun",
      "member_role": "member",
      "email_address": "seun@techparlons.com",
      "event_id": "25891d17-308c-478b-ac2d-32c04c9216ad",
      "date_sent": "2020-11-04T16:41:19.000Z",
      "date_rejected": null,
      "date_accepted": null,
      "status": "PENDING",
      "created_at": "2020-11-04T16:41:19.000Z",
      "updated_at": "2020-11-04T16:41:19.000Z"
    },
    {
      "id": "fb0365a2-bd26-4aba-b282-4f45261b9586",
      "member_name": "Seun Seun",
      "member_role": "member",
      "email_address": "seun@techparlons.com",
      "event_id": "25891d17-308c-478b-ac2d-32c04c9216ad",
      "date_sent": "2020-11-04T16:40:40.000Z",
      "date_rejected": null,
      "date_accepted": null,
      "status": "PENDING",
      "created_at": "2020-11-04T16:40:40.000Z",
      "updated_at": "2020-11-04T16:40:40.000Z"
    }
  ]

  const dat = data.filter(e=> e.status === "PENDING")
  console.log(dat)