import { useState } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
  
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fcfcfc'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      textAlign: 'center',
      fontSize: '13px',
    },
    text: {
        marginTop: '13px',
    }
  })

const ShoppingListPdf = ({List}) => {

  return (

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      {List && Object.keys(List).map((key) => {
            return (<Text style={styles.text}>{List[key] + ' ' + key}
            </Text>
            )
          })}
        
        </View>
    </Page>
  </Document>
)

}

export default ShoppingListPdf
