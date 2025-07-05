import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { Scene } from "@shared/api";

type Props = {
  scenes: Scene[];
  remarks: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#121417",
    color: "#FFFFFF",
  },
  titlePage: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  number: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#B2CCE5",
    color: "#121417",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 24,
    marginRight: 8,
  },
  sceneTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  box: {
    backgroundColor: "#1F2124",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  voiceover: {
    fontStyle: "italic",
    color: "#A3ABB2",
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#40474F",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: "#A3ABB2",
  },
});

export function StoryboardPdf({ scenes, remarks }: Props) {
  return (
    <Document>
      <Page size="A4" style={[styles.page, styles.titlePage]}>
        <Text style={{ fontSize: 26, marginBottom: 20 }}>
          Storyboard Presentation
        </Text>
        {remarks ? <Text>{remarks}</Text> : null}
      </Page>
      {scenes.map((scene, idx) => (
        <Page key={scene.id} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.number}>{idx + 1}</Text>
            <Text style={styles.sceneTitle}>{scene.title}</Text>
          </View>
          {scene.image ? (
            <Image src={scene.image} style={styles.image} />
          ) : null}
          <Text style={styles.sectionTitle}>Scene Details</Text>
          <View style={styles.box}>
            <Text>{scene.details}</Text>
          </View>
          <Text style={styles.sectionTitle}>Voiceover Script</Text>
          <View style={styles.box}>
            <Text style={styles.voiceover}>{scene.voiceover}</Text>
          </View>
        </Page>
      ))}
      <Page size="A4" style={[styles.page, styles.titlePage]}>
        <Text>Total Scenes: {scenes.length}</Text>
        <Text style={{ fontSize: 10, marginTop: 10 }}>
          Designed with love by yantramayaa designs
        </Text>
      </Page>
    </Document>
  );
}
