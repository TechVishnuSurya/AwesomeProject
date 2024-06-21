import React, { useContext } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { MyContext } from '../context/MyContext';

export default function DocumentDetails({ navigation }) {
    const { data, setData } = useContext(MyContext);

    const addInput = () => {
        setData(prevData => ({
            ...prevData,
            inputs: [...prevData.inputs, { id: prevData.inputs.length + 1, name: '', value: '0' }]
        }));
    };

    const handleInputChange = (id, name) => {
        setData(prevData => ({
            ...prevData,
            inputs: prevData.inputs.map(input =>
                input.id === id ? { ...input, name } : input
            )
        }));
    };

    const handleInputAmtChange = (id, text) => {
        setData(prevData => ({
            ...prevData,
            inputs: prevData.inputs.map(input =>
                input.id === id ? { ...input, value: text } : input
            )
        }));
    };

    const closeInput = () => {
        setData(prevData => ({
            ...prevData,
            inputs: prevData.inputs.slice(0, -1)
        }));
    };

    data.writerFeesTotal = data.inputs.reduce((total, input) => {
        const value = parseInt(input.value, 10);
        return total + (isNaN(value) ? 0 : value);
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.txt1}>Document writer and Other Charges</Text>

            {data.inputs.map((input, index) => (
                <View key={input.id} style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput1}
                        placeholder="Enter Fees Name"
                        value={input.name}
                        onChangeText={name => handleInputChange(input.id, name)}
                    />
                    <TextInput
                        style={styles.textInput1}
                        placeholder="Enter amount"
                        value={input.value}
                        onChangeText={text => handleInputAmtChange(input.id, text)}
                        keyboardType="numeric"
                    />
                </View>
            ))}

            {data.inputs.length > 1 && <Button title="-" onPress={closeInput} />}
            <Button title="Add Fees" onPress={addInput} />

            <Text style={styles.txt1}>Total: { data.writerFeesTotal}</Text>

            <Button
                title="Pdf print"
                onPress={() => navigation.navigate('PDFprint')}
            />
            <Button
                title="Back to Government Value Page"
                onPress={() => navigation.navigate('Government Value')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    txt1: {
        color: 'black',
        fontSize: 15,
        marginBottom: 8,
    },
    textInput1: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 5,
        backgroundColor: 'white',
        marginBottom: 16,
        width: '40%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        width: '100%',
    },
});
