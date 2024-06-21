import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';
import { RadioButton } from 'react-native-paper';
import { valueData } from '../value';



export default function DocumentDetails() {
    const [officeName, setOfficeName] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [subRegisterOffice, setSubRegisterOffice] = useState("")
    const [village, setVillage] = useState("")
    const [selectedDocumentType, setSelectedDocumentType] = useState("saledeed");
    const [textInputValue, setTextInputValue] = useState("0");
    const [extraPage, setExtraPage] = useState("0");
    const [landType, setLandType] = useState('rural');
    const [subdivision, setSubdivision] = useState("0")
    const [inputs, setInputs] = useState([{ id: 1, name: '', value: 0 }]);

    const addInput = () => {
        setInputs([...inputs, { id: inputs.length + 1, value: 0 }]);
    };

    const handleInputChange = (id, name) => {
        setInputs(inputs.map(input => input.id === id ? { ...input, name: name, } : input));
    };

    const handleInputAmtChange = (id, text) => {
        setInputs(inputs.map(input => input.id === id ? { ...input, value: text } : input));
    };

    const closeInput = () => {
        const newInputs = [...inputs];
        newInputs.pop();
        setInputs(newInputs);
    };

    const handleTextInputChange = (value) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setTextInputValue(value);
        }
    };



    const changeLandType = async (type) => {
        setLandType(type)
    }

    const numericValue = parseFloat(textInputValue) || 0;
    const extraPageValue = parseInt(extraPage) || 0;
    const subDivisionValue = parseInt(subdivision) || 0

    let stampValue = 0;
    let regFees = 0;
    let computerFees = 200 + (extraPageValue * 100);
    let cdFees = 100;
    let subDivisionFees = subDivisionValue
    let welfareFees = 10;

    if (selectedDocumentType === "saledeed" && numericValue > 0 && landType === "rural") {
        stampValue = numericValue * valueData.saledeed_stampDuty;
        regFees = numericValue * valueData.saledeed_regFees;
        subDivisionFees = subDivisionValue * valueData.subdivision_rural
    } else if (selectedDocumentType === "saledeed" && numericValue > 0 && landType === "urban") {
        stampValue = numericValue * 0.07;
        regFees = numericValue * 0.02;
        subDivisionFees = subDivisionValue * 600
    } else if (selectedDocumentType === "mod" && numericValue > 0) {
        stampValue = numericValue * 0.005;
        regFees = 8000;
    }


    const dwFees = inputs.reduce((a, b) => {
        return a + parseInt(b.value)
    }, 0)

    let totalValue = stampValue + regFees + computerFees + cdFees + subDivisionFees + welfareFees + parseInt(dwFees);



    const printHTML = async () => {
        const htmlContent = `
            <html>
                <body>
                    <h1 style="text-align: center;">Document Bill</h1>
                    <p><strong>Office Name:</strong> ${officeName}</p>
                    <p><strong>Customer Name:</strong> ${customerName}</p>
                    <p><strong>Sub Register Office:</strong> ${subRegisterOffice}</p>
                    <p><strong>Village Name:</strong> ${village}</p>
                    <p><strong>Document Type:</strong> ${selectedDocumentType === "saledeed" ? "Sale Deed" : "Mod"}</p>
                    <p><strong>Document Value:</strong> ${textInputValue}</p>
                    <p><strong>Stamp Duty:</strong> ${stampValue.toFixed(2)}</p>
                    <p><strong>Registration Fees:</strong> ${regFees.toFixed(2)}</p>
                    <p><strong>Computer Fees:</strong> ${computerFees.toFixed(2)}</p>
                    <p><strong>SubDivision Fees:</strong> ${subDivisionFees.toFixed(2)}</p>
                    <p><strong>CD Fees:</strong> ${cdFees.toFixed(2)}</p>
                    <p><strong>Welfare Fees:</strong> ${welfareFees.toFixed(2)}</p>
                    <p><strong>Total:</strong> ${totalValue}</p>
                </body>
            </html>
        `;

        try {
            await Print.printAsync({
                html: htmlContent,
            });
        } catch (error) {
            console.error("Error printing document: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Office Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setOfficeName(text)}
                value={officeName}
                placeholder="Enter office Name"
                keyboardType="default"
            />
            <Text style={styles.txt}>Customer Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setCustomerName(text)}
                value={customerName}
                placeholder="Enter customer Name"
                keyboardType="default"
            />
            <Text style={styles.txt}>Sub Register Office</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setSubRegisterOffice(text)}
                value={subRegisterOffice}
                placeholder="Enter reg office"
                keyboardType="default"
            />
            <Text style={styles.txt}>Village</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setVillage(text)}
                value={village}
                placeholder="Enter village"
                keyboardType="default"
            />
            <Text style={styles.txt}>Document type</Text>
            <Picker
                selectedValue={selectedDocumentType}
                onValueChange={(itemValue) => setSelectedDocumentType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Sale Deed" value="saledeed" style={styles.pickerItem} />
                <Picker.Item label="Mod" value="mod" style={styles.pickerItem} />
            </Picker>

            <Text style={styles.txt}>Value</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={handleTextInputChange}
                value={textInputValue}
                placeholder="Enter value"
                keyboardType="numeric"
            />
            <Text style={styles.txt}>Extra Page</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setExtraPage}
                value={extraPage}
                placeholder="Above 10 pages are considered as extra pages"
                keyboardType="numeric"
                editable={numericValue > 0}
            />

            <Text style={styles.txt}>Land Type</Text>
            <View style={styles.radioButtonContainer}>
                <RadioButton
                    value="rural"
                    status={landType === 'rural' ? 'checked' : 'unchecked'}
                    onPress={() => changeLandType('rural')}
                />
                <Text>Rural</Text>
            </View>
            <View style={styles.radioButtonContainer}>
                <RadioButton
                    value="urban"
                    status={landType === 'urban' ? 'checked' : 'unchecked'}
                    onPress={() => changeLandType('urban')}
                />
                <Text>Urban</Text>
            </View>
            <Text style={styles.txt}>No of subDivision</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setSubdivision}
                value={subdivision}
                placeholder="Number of sub division"
                keyboardType="numeric"
                editable={numericValue > 0}
            />
            <Text style={styles.txt1}>Stamp Duty: {`${stampValue.toFixed(2)}`}</Text>
            <Text style={styles.txt1}>Registration Fees: {`${regFees.toFixed(2)}`}</Text>
            <Text style={styles.txt1}>Computer Fees: {`${computerFees.toFixed(2)}`}</Text>
            <Text style={styles.txt1}>CD Fees: {`${cdFees.toFixed(2)}`}</Text>
            <Text style={styles.txt1}>SubDivision Fees: {`${subDivisionFees.toFixed(2)}`}</Text>
            <Text style={styles.txt1}>Welfare Fees: {`${welfareFees.toFixed(2)}`}</Text>

            <Text style={styles.txt1}>Document writer and Other Charges</Text>

            {inputs.map((input, index) => (
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
                    />


                </View>
            ))}
            {
                inputs.length > 1 ? <Button title="-" onPress={closeInput} /> : null
            }
            <Button title="Add Fees" onPress={addInput} />

            <Text style={styles.txt1}>Total: {`${totalValue}`}</Text>

            <Button title="Create PDF" onPress={printHTML} />
            {/* {filePath ? (
                <Text style={styles.filePath}>PDF saved at: {filePath}</Text>
            ) : null} */}
        </View>
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
    txt1: {
        color: "black",
        fontSize: 15,
        marginBottom: 8,
    },
    picker: {
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        height: 50,
        marginBottom: 16,
    },
    pickerItem: {
        fontSize: 18,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: 'white',
        marginBottom: 16,
    },
    textInput1: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 5,
        backgroundColor: 'white',
        marginBottom: 16,
        width: '40%'
    },
    filePath: {
        marginTop: 16,
        color: 'blue',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        width: '100%'
    }
});
