import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Image
} from '@react-pdf/renderer';

// import imagine1 from '@/assets/img/logoMeisterPDF.png';

const imagine1 = '/static/images/logoMeisterPDF.png';

const BORDER_COLOR = '#AFAFAF';
const BORDER_COLOR_BLACK = '#000000';
const BORDER_STYLE = 'solid';
const COL0_WIDTH = 5;
const COL1_WIDTH = 40;
const COL2_WIDTH = 8;
const COLN_WIDTH = (100 - COL1_WIDTH - COL0_WIDTH - COL2_WIDTH) / 3;
const COLNWIDTHTotal = 50;
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
    marginBottom: 5,
  },
  subtitle3: {
    fontSize: 12,
    marginTop: 18,
    marginBottom: 18,
  },
  subtitle2: {
    fontSize: 12,
  },
  subtitle4: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  divider: {
    paddingTop: '1px solid black'
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
  smallSpace: {
    height: '20px',
  },
  verySmallSpace: {
    height: '10px',
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
    borderColor: 'red',
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  table2: {
    display: 'table',
  },
  tableFacture: {
    display: 'table',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: BORDER_COLOR_BLACK,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,

  },
  tableRowLine: {
    flexDirection: 'row'
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableRowFooter: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableRowFooter1: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableRow2: {
    margin: 'auto',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: BORDER_COLOR,

  },
  tableCol0Header: {
    width: `${COL0_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
  },
  tableCol1Header: {
    width: `${COL1_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',

  },
  tableCol2Header: {
    width: `${COL2_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',

  },
  tableColHeader: {
    width: `${COLN_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',

  },
  tableColid: {
    width: `${COL1_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    // borderTopWidth: 1
  },
  tableTotal1: {
    width: `${COLNWIDTHTotal}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  tableTotal2: {
    width: `${COLNWIDTHTotal}%`,
    textAlign: 'right',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  tableTotal3: {
    width: '100%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    paddingTop: '10px'
  },
  tableCol0: {
    width: `${COL0_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,

  //  borderTopWidth: 1
  },
  tableCol1: {
    width: `${COL1_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  //  borderTopWidth: 1
  },
  tableCol2: {
    width: `${COL2_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,

  //  borderTopWidth: 1
  },
  // iciii
  tableCol3: {
    width: '130px',
  },
  tableCol4: {
    width: '130px',
  },
  tableCol: {
    width: `${COLN_WIDTH}%`,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  //  borderTopWidth: 1
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
  tableCellFooter: {
    margin: 5,
    fontSize: 10,
  },
  imageNew: {
    objectFit: 'cover',
  },
  imageView: {
    width: '100%',
    height: '15%',
    backgroundColor: 'white',
  },
  tableCol0Footer: {
    width: '25%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    height: '30px',
  },
  tableCol1Footer: {
    width: '30%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    textAlign: 'center',

  },
  tableCol2Footer: {
    width: '50%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    textAlign: 'right',

  },
  tableCol3Footer: {
    width: '40%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
  },
  tableCol4Footer: {

    width: '60%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    textAlign: 'right',

  },
  test: {
    height: '50px',
    vertical: 'top'
  }
});

function capitalize(string = '') {
  return string.charAt(0).toUpperCase() + `${string.slice(1)}`.toLowerCase();
}

const Quixote = ({
  product, user, delivery
}) => (
  <Document>
    <Page style={styles.body}>

      <View style={styles.imageView}>
        <Image style={styles.imageNew} src={imagine1} alt="images" />
      </View>

      <View style={styles.sectionP}>
        <View style={styles.sectionL}>
          <Text style={styles.subtitle4}>
            Meister Engineering Sàrl
          </Text>
        </View>
        <View style={styles.sectionR}>
          <Text style={styles.subtitle2}>{`${capitalize(user.fname)} ${capitalize(user.lname)}`}</Text>
        </View>
      </View>

      <View style={styles.space} />
      <View style={styles.space} />
      <Text style={styles.subtitle}>Facture RE-00001</Text>

      <View style={styles.section3}>
        <View style={styles.tableFacture}>

          <View style={styles.tableRowLine}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCell}>Date :</Text>
              </View>
              <View style={styles.tableCol4}>
                <Text style={styles.tableCell}>{product.date}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCell}>Votre interlocuteur :</Text>
              </View>
              <View style={styles.tableCol4}>
                <Text style={styles.tableCell}>Meister Antoine</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableRowLine}>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCell}>Payable à:</Text>
              </View>
              <View style={styles.tableCol4}>
                <Text style={styles.tableCell}>{new Date(product?.payment?.payDate).toLocaleDateString('en-EN', { year: 'numeric', day: '2-digit', month: '2-digit' })}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCell}>Numéro client :</Text>
              </View>
              <View style={styles.tableCol4}>
                <Text style={styles.tableCell}>00004</Text>
              </View>
            </View>

          </View>

        </View>
      </View>

      <View style={styles.smallSpace} />

      <Text style={styles.tableCell}>Chers Messieurs</Text>

      <Text style={styles.tableCell}>
        Nous nous permettons de vous facturer comme suit:
      </Text>

      <View style={styles.smallSpace} />

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol0Header}>
            <Text style={styles.tableCell}>pos.</Text>
          </View>
          <View style={styles.tableCol2Header}>
            <Text style={styles.tableCell}>PID</Text>
          </View>
          <View style={styles.tableCol1Header}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Quantité</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Prix à la pièce</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>
              {`Prix net : ${product?.currency}`}
            </Text>
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
                <Text style={styles.tableCell}>{(val?.price * (1 + product.TVA)).toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{((val?.price * val.qty) * (1 + product.TVA)).toFixed(2)}</Text>
              </View>
            </View>
          ))
        }
        <View style={styles.verySmallSpace} />

        <View style={styles.tableRow}>
          <View style={styles.tableTotal1}>
            <Text style={styles.tableCell}>Delivery costs</Text>
            <Text style={styles.tableCell}>Invoice amount including VAT</Text>
          </View>
          <View style={styles.tableTotal2}>
            <Text style={styles.tableCell}>{`${product?.shippingCost} ${product?.currency}`}</Text>
            <Text style={styles.tableCell}>{`${([...product.products.map((val) => ((val?.price * val.qty) + ((val?.price * val.qty) * product.TVA))), 0, 0].reduce((a, b) => a + b) + product?.shippingCost).toFixed(2)} ${product?.currency}`}</Text>
          </View>
        </View>
        <View style={styles.tableTotal3} />
      </View>

      <Text style={styles.tableCell}>{`Delivery expected between ${delivery}`}</Text>

      <View style={styles.space} />

      <View style={styles.smallSpace} />

      <Text style={styles.tableCell}>We are at your disposal for any questions.</Text>

      <Text style={styles.tableCell}>
        Best regards
      </Text>

      <View style={styles.smallSpace} />
      <View style={styles.smallSpace} />

      <View style={styles.test}>

        <View style={styles.tableRowFooter1}>
          <View style={styles.tableCol0Footer}>
            <Text style={styles.tableCellFooter}>Téléphone: 0793366129</Text>
          </View>
          <View style={styles.tableCol1Footer}>
            <Text style={styles.tableCellFooter}>Banque: UBS Switzerland AG</Text>
          </View>
          <View style={styles.tableCol2Footer}>
            <Text style={styles.tableCellFooter}>Titulaire du compte: Meister Engineering Sàrl</Text>
          </View>
        </View>

        <View style={styles.tableRowFooter}>
          <View style={styles.tableCol3Footer}>
            <Text style={styles.tableCellFooter}>BIC: UBSWCHZH80A</Text>
          </View>
          <View style={styles.tableCol4Footer}>
            <Text style={styles.tableCellFooter}>IBAN: CH20 0024 0240 9633 8701 G</Text>
          </View>
        </View>

      </View>

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
