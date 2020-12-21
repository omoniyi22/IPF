import React, { Component } from 'react'
import { PDFDownloadLink, Document, View, Page, Text, StyleSheet, Image } from "@react-pdf/renderer";



const style = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  view: {
    marginBottom: 10
  },
  text: {
    paddingHorizontal: "3px",
    paddingVertical: 3,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 12
  },

  ve: {
    marginBottom: "4"
  },
  size: {
    width: "100%"
    // width: "fitContent",
    // maxWidth: "fit-content",
  }

})


export const headers = [
  { label: "Event ID", key: "event_id" },
  { label: "Event Name", key: "event_name" },
  { label: "Event Details", key: "event_details" },
  { label: "Event Date", key: "event_date" },
  { label: "Event Time", key: "event_time" },
  { label: "Set Reminder", key: "set_reminder" },
  { label: "Reminder", key: "reminder" },
  { label: "Status", key: "status" },
  { label: "Banner Image", key: "banner_image" }
]


export const Melo = ({ data }) =>
  <PDFDownloadLink
    document={
      <Document>
        <Page size="A3" style={style.size}>
          <View style={style.view}>
            <View style={style.flex}>
              {headers.map((data) =>
                <Text break style={style.text}>
                  {data.label}
                </Text>
              )}
            </View>
            <View style={style.ve}>
              {data.map((data) =>
                <View style={style.flex}>
                  {Object.values(data).map((data) =>
                    <Text break style={style.text}>
                      {data}
                    </Text>
                  )}
                </View>
              )}
            </View>
            <View>
              <Text break>
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    }>
    PDF
  </PDFDownloadLink >


export const neat = (data) => {
  let first = data.replace("_", " ")

  let sec = Array.from(first)
  let third = []
  let i
  for (i in sec) {
    if (Number(i) > 0 && Number(i) < (sec.length - 1) && sec[Number(i)] === sec[Number(i)].toUpperCase()) {

      third.push(" ")
    }
    third.push(sec[i])
  }
  return third.join("").toString()
}


const s = StyleSheet.create({
  deds: {
    padding: "10",
    width: "100%"

  },
  sstt: {
    paddingVertical: "6",
    fontWeight: "light",
    marginBottom: "30",
    width: "100%"
  },
  picpack: {
    borderStyle: "solid",
    borderWidth: "1",
    paddingVertical: "10"
  },
  picto: {
    marginHorizontal: "auto",
    borderRadius: "50%",
    height: "120",
    width: "120",
    borderWidth: "10px",
    borderColor: "white",
    borderStyle: "solid"
  },
  the_name: {
    fontSize: "16",
    marginTop: "20",
    fontWeight: "bold",
    width: "100%"
  },
  osaml: {
    fontWeight: "light",
    fontSize: "12"
  },
  adfe: {
    marginHorizontal: "auto",
    borderWidth: "1px",
    borderStyle: "solid",
    marginVertical: "auto",
    width: "100%",
    marginTop: "18",
    borderStyle: "solid",
    borderWidth: "1",
  },
  packa: {
    display: "flex",
    flex: "2",
    width: "97%",
    textAlign: "center",
    flexDirection: "column",
    borderStyle: "solid",
    borderBottomWidth: "1",
    flexDirection: "row",
    alignItems: "stretch",
    paddingVertical: "4"

  },
  packaa: {
    flex: 2,
    paddingRight: "10",
    // paddingVertical: "",
    fontSize: "15",


    maxWidth: "50%",
    fontWeight: "bold",
    borderRightWidth: "1",
    borderRightStyle: "solid",
    textOverflow: "ellipsis",
    borderStyle: "solid",
    paddingVertical: "4"

  },

  packab: {
    paddingLeft: "10",
    // paddingVertical: "6",
    fontSize: "15",
    maxWidth: "50%",
    flex: 2,
    fontWeight: "bold",
    borderRightStyle: "solid",
    textOverflow: "ellipsis",
    borderStyle: "solid",
    paddingVertical: "4"

  }
})



export const ProfileModal2 = ({ dat, title }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A3">
            {dat.map(data =>
              <View style={s.deds}>
                <View style={s.sstt}>
                  <View style={s.picpack}>
                    <View style={s.picto}>
                      <Image source={{ uri: data.logo || data.avatar || "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png" }} />
                    </View>
                  </View>

                  <View style={s.the_name}>
                    <Text style={{ textAlign: "center" }}>
                      {data.firstName} {data.lastName}
                    </Text>
                    <View style={{ width: "100%" }}>
                      <Text style={{ textAlign: "center" }}>
                        {data.company_name}
                      </Text>
                    </View>
                  </View>
                  <View style={s.adfe}>
                    {Object.entries(data).filter(dat => (dat[0] !== "tableData") &&
                      (dat[0] !== "company_name") &&
                      (dat[0] !== "firstName") && (dat[0] !== "lastName") &&
                      (dat[0] !== "logo") && (dat[0] !== "memberId") &&
                      (dat[0] !== "member_id") &&
                      (
                        dat[0] !== "password") && (dat[0] !== "default_password"
                      ) && (dat[0] !== "companyId") && (dat[0] !== "company_id") &&
                      (dat[0] !== "avatar")).map(dat =>
                        <View style={s.packa}>
                          <View style={s.packaa}>
                            <Text style={{ textAlign: "right", textTransform: "capitalize" }}>
                              {`${neat(dat[0])}`}
                            </Text>
                          </View>
                          <View style={s.packab}>
                            <Text style={{ textAlign: "left", textTransform: "capitalize" }}>
                              {`${dat[1] || "_____________________"}`}
                            </Text>
                          </View>
                        </View>
                      )
                    }
                  </View>

                </View>
              </View>
            )}
          </Page>
        </Document >
      }>
      {({ blob, url, loading, error }) => (loading ? 'Loading..' : title)}
    </PDFDownloadLink >
  )
}