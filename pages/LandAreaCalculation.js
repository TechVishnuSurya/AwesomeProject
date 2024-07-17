import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

export default function LandAreaCalculation() {

  const [north, setNorth] = useState('0');
  const [south, setSouth] = useState('0');
  const [east, setEast] = useState('0');
  const [west, setWest] = useState('0');

  const [northEast, setNorthEast] = useState('0');
  const [southEast, setSouthEast] = useState('0');
  const [southWest, setSouthWest] = useState('0');
  const [northWest, setNorthWest] = useState('0');

  let totalSquareFeet = 0;
  let points = "80,40 280,40 280,240 80,240";

  const n = parseInt(north);
  const s = parseInt(south);
  const e = parseInt(east);
  const w = parseInt(west);
  const ne = parseInt(northEast);
  const se = parseInt(southEast);
  const sw = parseInt(southWest);
  const nw = parseInt(northWest);


  if (ne > 0) {
    console.log("northest:", ne)
    const swMid = s * w;
    const splay = (Math.abs(s - n) * Math.abs(w - e)) / 2;
    totalSquareFeet = swMid - splay;
  } else if (se > 0) {
    const nwMid = n * w;
    const splay = (Math.abs(n - s) * Math.abs(w - e)) / 2;
    totalSquareFeet = nwMid - splay;
  } else if (sw > 0) {
    const neMid = n * e;
    const splay = (Math.abs(n - s) * Math.abs(e - w)) / 2;
    totalSquareFeet = neMid - splay;
  } else if (nw > 0) {
    const seMid = s * e;
    const splay = (Math.abs(s - n) * Math.abs(e - w)) / 2;
    totalSquareFeet = seMid - splay;
  } else if (n === s && e === w) {
    totalSquareFeet = n * e;
  } else {
    const nsMid = (n + s) / 2;
    const ewMid = (e + w) / 2;
    totalSquareFeet = nsMid * ewMid;
  }

  if (ne > 0 && n !== s && e !== w) {
    console.log("northeast")
    points = "80,40 280,40 300,60 300,240 80,240";
  }else if (se > 0 && n !== s && e !== w) {
    console.log("northeast")
    points = "80,40 280,40 280,240 260,280 80,280";
  }else if (n === s && e === w) {
    points = "80,40 280,40 280,240 80,240";
  } else if (n < s && w < e) {
    points = "80,40 280,40 280,240 80,200";
  } else if (n > s && e > w) {
    points = "80,40 280,40 280,240 90,200";
  } else if (n < s && e > w) {
    points = "80,40 280,40 280,240 80,200";
  } else if (n > s && e < w) {
    points = "80,40 280,40 280,160 90,240";
  } else if (n < s && e < w) {
    points = "80,40 280,40 280,160 90,240";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Svg height="300" width="350">
        <Polygon
          points={points}
          fill="purple"
          stroke="purple"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        
      </Svg>

      <View style={styles.gridContainer}>
        <Text style={styles.label}>North</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setNorth(text)}
          value={north}
          placeholder="North side Measurement"
          keyboardType="numeric"
        />

        <Text style={styles.label1}>South</Text>
        <TextInput
          style={styles.textInput1}
          onChangeText={(text) => setSouth(text)}
          value={south}
          placeholder="South side Measurement"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.gridContainer}>
        <Text style={styles.label}>East</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEast(text)}
          value={east}
          placeholder="East side Measurement"
          keyboardType="numeric"
        />

        <Text style={styles.label1}>West</Text>
        <TextInput
          style={styles.textInput1}
          onChangeText={(text) => setWest(text)}
          value={west}
          placeholder="West side Measurement"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.gridContainer}>
        <Text style={styles.label}>NorthEast</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setNorthEast(text)}
          value={northEast}
          placeholder="NorthEast side Measurement"
          keyboardType="numeric"
          editable={southEast > 0 || southWest > 0 || northWest > 0 ? false : true}
        />

        <Text style={styles.label1}>SouthEast</Text>
        <TextInput
          style={styles.textInput1}
          onChangeText={(text) => setSouthEast(text)}
          value={southEast}
          placeholder="SouthEast side Measurement"
          keyboardType="numeric"
          editable={northEast > 0 || southWest > 0 || northWest > 0 ? false : true}
        />
      </View>

      <View style={styles.gridContainer}>
        <Text style={styles.label}>SouthWest</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setSouthWest(text)}
          value={southWest}
          placeholder="SouthWest side Measurement"
          keyboardType="numeric"
          editable={northEast > 0 || southEast > 0 || northWest > 0 ? false : true}
        />

        <Text style={styles.label1}>NorthWest</Text>
        <TextInput
          style={styles.textInput1}
          onChangeText={(text) => setNorthWest(text)}
          value={northWest}
          placeholder="NorthWest side Measurement"
          keyboardType="numeric"
          editable={northEast > 0 || southEast > 0 || southWest > 0 ? false : true}
        />
      </View>

      <Text style={styles.label1}>Total Square Feet: {`${totalSquareFeet}`}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "flex-start",
    padding: 16,
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: 15,
    marginBottom: 8,
    right: 10
  },
  label1: {
    color: 'black',
    fontSize: 15,
    marginBottom: 8,
    left: 10
  },
  textInput: {
    height: 40,
    width: '15%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  textInput1: {
    height: 40,
    width: '15%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: 'white',
    marginBottom: 16,
    left: 20
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row"
  }
});
