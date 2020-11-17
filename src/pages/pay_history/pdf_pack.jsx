
import React from "react"
import { PDFDownloadLink, Document, View, Page, Text, StyleSheet } from "@react-pdf/renderer";

export const header = [
  { label: "Payment ID", key: "id" },
  { label: "Fee Name", key: "name" },
  { label: "Amount Paid", key: "amount" },
  { label: "Fee Details", key: "payment_for" },
  { label: "Payment Status", key: "status" },
  { label: "Payment Date", key: "created_at" },
  { label: "Fee ID", key: "fee_id" },
  { label: "Reminder", key: "reminder" },
  { label: "Payment Reference", key: "reference" },
]


export const Melo = ({ data, headers = header }) =>
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






export const style = StyleSheet.create({
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
