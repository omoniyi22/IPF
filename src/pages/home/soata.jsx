import React, { Component } from 'react'
import { PDFDownloadLink, Document, View, Page, Text, StyleSheet } from "@react-pdf/renderer";



const style = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  view: {
    marginBottom: 10
  },
  text: {
    paddingHorizontal: 3,
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


