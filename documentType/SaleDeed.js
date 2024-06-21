import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { MyContext } from '../context/MyContext';

export default function SaleDeed({ route, navigation }) {
    const { data, setData } = useContext(MyContext);
    const { documentDetails } = route.params;
    const [errors, setErrors] = useState({})

    if (!documentDetails || documentDetails.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.txt}>No document details available.</Text>
            </View>
        );
    }

    const validateFields = () => {
        let valid = true;
        let tempErrors = {};
        if (!data.textInputValue || !/^\d+$/.test(data.textInputValue)) {
            tempErrors.textInputValue = 'Value is required and must contain only digits';
            valid = false;
        }
        setErrors(tempErrors);
        return valid;
    }

    const handleNavigate = (screen) => {
        if (validateFields()) {
            navigation.navigate(screen);
        }
    }

    const documentDetail = documentDetails[0];
    const numericValue = parseFloat(data.textInputValue) || 0;
    const extraPageValue = parseInt(data.extraPage) || 0;
    const subDivisionValue = parseInt(data.subdivision) || 0;

    data.computerFees = 200 + (extraPageValue * 100);

    if (documentDetail.type === "SaleDeed" || documentDetail.type === "Exchange Deed") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
        data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
    } else if (documentDetail.type === "SaleDeed New Apartment") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
        data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
    } else if (documentDetail.type === "Sale Aggreement") {
        data.stampValue = Math.ceil(documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
    } else if (documentDetail.type === "Construction Aggreement") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
    } else if (documentDetail.type === "Mod" || documentDetail.type === "Simple Mortgage Without Possession" || documentDetail.type === "Simple Mortgage With possession") {
        const stValue = Math.ceil(numericValue * documentDetail.stampDuty);
        const rgFees = Math.ceil(numericValue * documentDetail.regFees);
        if (documentDetail.maxStamp === 0) {
            data.stampValue = stValue
        } else {
            data.stampValue = stValue > documentDetail.maxStamp ? documentDetail.maxStamp : stValue;
        }
        data.regFees = rgFees > documentDetail.maxFees ? documentDetail.maxFees : rgFees;
    } else if (documentDetail.type === "Settlement With Family" || documentDetail.type === "Partition With Family") {
        const stValue = Math.ceil(numericValue * documentDetail.stampDuty);
        const rgFees = Math.ceil(numericValue * documentDetail.regFees);
        data.stampValue = stValue > documentDetail.maxStamp ? documentDetail.maxStamp : stValue;
        data.regFees = rgFees > documentDetail.maxFees ? documentDetail.maxFees : rgFees;
        if (documentDetail.subDivision === "yes") {
            data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
        }
    } else if (documentDetail.type === "Settlement With Non Family" || documentDetail.type === "Partition With Non Family") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
        if (documentDetail.subDivision === "yes") {
            data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
        }
    } else if (documentDetail.type === "Will" || documentDetail.type === "Receipt") {
        data.stampValue = documentDetail.stampDuty
        data.regFees = documentDetail.regFees
    } else if (documentDetail.type === "Receipt") {
        data.stampValue = documentDetail.stampDuty;
        data.regFees = documentDetail.regFees;
    }

    // Assuming cdFees and welfareFees are defined somewhere in the data object
    data.govtFeesTotal = data.stampValue + data.regFees + data.computerFees + (data.cdFees || 0) + (data.subDivisionFees || 0) + (data.welfareFees || 0);

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Value</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, textInputValue: text }))}
                value={data.textInputValue}
                placeholder="Enter value"
                keyboardType="numeric"
            />
            {errors.textInputValue && <Text style={styles.errorText}>{errors.textInputValue}</Text>}

            <Text style={styles.txt}>Extra Page</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, extraPage: text }))}
                value={data.extraPage}
                placeholder="Above 10 pages are considered as extra pages"
                keyboardType="numeric"
                editable={numericValue > 0}
            />

            {documentDetail.subDivision === "yes" &&
                <View>
                    <Text style={styles.txt}>Land Type</Text>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            value="rural"
                            status={data.landType === 'rural' ? 'checked' : 'unchecked'}
                            onPress={() => setData(prevData => ({ ...prevData, landType: 'rural' }))}
                        />
                        <Text>Rural</Text>
                    </View>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            value="urban"
                            status={data.landType === 'urban' ? 'checked' : 'unchecked'}
                            onPress={() => setData(prevData => ({ ...prevData, landType: 'urban' }))}
                        />
                        <Text>Urban</Text>
                    </View>
                    <Text style={styles.txt}>No of subDivision</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setData(prevData => ({ ...prevData, subdivision: text }))}
                        value={data.subdivision}
                        placeholder="Number of sub division"
                        keyboardType="numeric"
                        editable={numericValue > 0}
                    />
                </View>
            }

            <Text style={styles.txt1}>Stamp Duty: {`${data.stampValue}`}</Text>
            <Text style={styles.txt1}>Registration Fees: {`${data.regFees}`}</Text>
            <Text style={styles.txt1}>Computer Fees: {`${data.computerFees}`}</Text>
            <Text style={styles.txt1}>CD Fees: {`${data.cdFees}`}</Text>
            <Text style={styles.txt1}>SubDivision Fees: {`${data.subDivisionFees}`}</Text>
            <Text style={styles.txt1}>Welfare Fees: {`${data.welfareFees}`}</Text>
            <Text style={styles.txt1}>Total: {`${data.govtFeesTotal}`}</Text>

            <Button
                title="Go to Writer Fees"
                onPress={() => handleNavigate('WriterOrAdvocateFees')}
            />
            <Button
                title="Back to Document Type Page"
                onPress={() => navigation.navigate('DocumentType')}
            />
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
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
    txt1: {
        color: "black",
        fontSize: 15,
        marginBottom: 8,
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
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
    },
});