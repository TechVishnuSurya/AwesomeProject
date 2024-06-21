import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';


export default function PublicProfile({ navigation }) {
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.txt}>Name</Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    txt: {
        color: "black",
        fontSize: 20,
        marginBottom: 8,
    },
  
});
