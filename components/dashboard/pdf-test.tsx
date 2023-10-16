'use client';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
export default function PdfParty() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const styles = StyleSheet.create({
    page: {
      width: '16rem',
      height: '64%',
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
    },
  });
  return (
    <>
      {isClient ? (
        <div className="flex gap-x-2 w-full h-full">
          <div className="w-64 h-[40%] rounded-sm border border-slate-300">
            <Document style={{ width: '100%', height: '100%' }}>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text>Section #1</Text>
                </View>
              </Page>
            </Document>
          </div>
        </div>
      ) : null}
    </>
  );
}
