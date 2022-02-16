import React from 'react';

import {
  Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink
} from '@react-pdf/renderer';

const BORDER_COLOR = '#AFAFAF';
const BORDER_STYLE = 'solid';
const COL0_WIDTH = 5;
const COL1_WIDTH = 40;
const COL2_WIDTH = 8;
const COLN_WIDTH = (100 - COL1_WIDTH - COL0_WIDTH - COL2_WIDTH) / 3;

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 18,
    marginBottom: 18,
  },
  subtitle2: {
    fontSize: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 50,
  },
  space: {
    height: '40px',
  },
  center: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  legal: {
    position: 'absolute',
    fontSize: 12,
    bottom: 80,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  sectionP: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionL: {
    fontSize: 24,
  },
  sectionR: {
    fontSize: 12
  },
  section3: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  table2: {
    display: 'table',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCol0Header: {
    width: `${COL0_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol1Header: {
    width: `${COL1_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol2Header: {
    width: `${COL2_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColHeader: {
    width: `${COLN_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColid: {
    width: `${COL1_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol0: {
    width: `${COL0_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol1: {
    width: `${COL1_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol2: {
    width: `${COL2_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol3: {
    width: '120px',
  },
  tableCol4: {
    width: '60px',
  },
  tableCol: {
    width: `${COLN_WIDTH }%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
});

const Quixote = ({ product, user }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.sectionP}>
        <View style={styles.sectionL}>
          <Text>Order n°: 12345 </Text>
        </View>

        <View style={styles.sectionR}>
          <Text>{product.date}</Text>
        </View>
      </View>

      <Text style={styles.subtitle2}>{`${user.fname} ${user.lname}`}</Text>
      <Text style={styles.subtitle2}>{product.address}</Text>
      <Text style={styles.subtitle2}>{`${product.zipCode} ${product.zipArea}`}</Text>
      <Text style={styles.subtitle2}>{`${product.country}`}</Text>

      <View style={styles.space} />
      <Text style={styles.subtitle}>Product List</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol0Header}>
            <Text style={styles.tableCellHeader}>#</Text>
          </View>
          <View style={styles.tableCol2Header}>
            <Text style={styles.tableCellHeader}>IDP</Text>
          </View>
          <View style={styles.tableCol1Header}>
            <Text style={styles.tableCellHeader}>Product</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>QTY</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>SUBTOTAL</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>TOTAL</Text>
          </View>
        </View>
        {
          product.products.map((val, i) => (
            <View style={styles.tableRow} key={`${i + 1}`}>
              <View style={styles.tableCol0}>
                <Text style={styles.tableCell}>{i}</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>{`${val.color || '0'}${val.size || '0'}${val.id}`}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>{val.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{val.qty}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{val.prix}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{val.prix * val.qty}</Text>
              </View>
            </View>
          ))
        }
      </View>

      <View style={styles.space} />

      <View style={styles.section3}>
        <View style={styles.table2}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>Shipping Cost:</Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCell}>{`${product.shippingCost} ${product?.currency}`}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>Products Cost:</Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCell}>{`${product.total} ${product?.currency}`}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>Total: </Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCell}>{`${product.total + product.shippingCost} ${product?.currency}`}</Text>
            </View>
          </View>
        </View>
      </View>


      <Text style={styles.legal}>
        <Text style={styles.subtitle2}>partie legal</Text>
      </Text>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )}
        fixed
      />

    </Page>
  </Document>
);

export default Quixote;
