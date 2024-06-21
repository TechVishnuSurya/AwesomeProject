import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

export default function LandAreaCalculation() {
  const [north, setNorth] = useState(0);
  const [south, setSouth] = useState(0);
  const [east, setEast] = useState(0);
  const [west, setWest] = useState(0);

  const [northEast, setNorthEast] = useState('0');
  const [southEast, setSouthEast] = useState('0');
  const [southWest, setSouthWest] = useState('0');
  const [northWest, setNorthWest] = useState('0');

  let totalSquareFeet = 0
  let points;

  if (north === south && east === west) {
    totalSquareFeet = north * east
  } else if (north !== south || east !== west) {
    const ns = (parseInt(north) + parseInt(south)) / 2
    const ew = (parseInt(east) + parseInt(west)) / 2
    totalSquareFeet = ns * ew
  }



  if (north === south && east === west) {
    points = "80,40 280,40 280,240 80,240"
  } else if (north < south && west < east) {
    points = "80,40 280,40 280,240 80,200"
    // DON'T DELETE points="80,40 240,40 240,240 40,240 40,80"
  } else if (north > south && east > west) {
    points = "80,40 280,40 280,240 90,200"
  } else if (north < south && east > west) {
    points = "80,40 280,40 280,240 80,200"
  } else if (north > south && east < west) {
    points = "80,40 280,40 280,160 90,240"
  } 

  return (
    <View style={styles.container}>
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
        />

        <Text style={styles.label1}>SouthEast</Text>
        <TextInput
          style={styles.textInput1}
          onChangeText={(text) => setSouthEast(text)}
          value={southEast}
          placeholder="SouthEast side Measurement"
          keyboardType="numeric"
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
        />

        <Text style={styles.label1}>NorthWest</Text>
        <TextInput
          style={styles.textInput1}
          onChangeText={(text) => setNorthWest(text)}
          value={northWest}
          placeholder="NorthWest side Measurement"
          keyboardType="numeric"
        />

      </View>

      <Text style={styles.label1}>Total Square Feet: {`${totalSquareFeet}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "flex-start",
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
  measurements: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 10
  },

  gridContainer: {
    display: "flex",
    flexDirection: "row"

  },
  gridItem: {

    maxWidth: "25%", // 100% devided by the number of rows you want
    alignItems: "center",

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff"
  },
  gridItem1: {
    width: "auto",
    backgroundColor: "rgba(249, 180, 45, 0.25)",
  }
});
