import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
    const extraPageValue = parseInt(data.totalPage) || 0;
    const subDivisionValue = parseInt(data.subdivision) || 0;

    data.computerFees = 200 + (extraPageValue > 10 ? (extraPageValue - 10) * 100 : 0);

    if (documentDetail.type === "SaleDeed" || documentDetail.type === "Exchange Deed") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
        data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
    } else if (documentDetail.type === "SaleDeed New Apartment") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
        data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
    } else if (documentDetail.type === "Sale Aggreement" || documentDetail.type === "Trust Deed") {
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
    } else if (documentDetail.type === "Settlement With Family" || documentDetail.type === "Partition With Family" || documentDetail.type === "Release Deed With Family") {
        const stValue = Math.ceil(numericValue * documentDetail.stampDuty);
        const rgFees = Math.ceil(numericValue * documentDetail.regFees);
        data.stampValue = stValue > documentDetail.maxStamp ? documentDetail.maxStamp : stValue;
        data.regFees = rgFees > documentDetail.maxFees ? documentDetail.maxFees : rgFees;
        if (documentDetail.subDivision === "yes") {
            data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
        }
    } else if (documentDetail.type === "Settlement With Non Family" || documentDetail.type === "Partition With Non Family" || documentDetail.type === "Power To Sell Immovable Property With Non Family" || documentDetail.type === "Power To Market Value" || documentDetail.type === "Release Deed With Non Family") {
        data.stampValue = Math.ceil(numericValue * documentDetail.stampDuty);
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
        if (documentDetail.subDivision === "yes") {
            data.subDivisionFees = subDivisionValue * (data.landType === 'rural' ? 400 : 600);
        }
    } else if (documentDetail.type === "Will" || documentDetail.type === "Receipt" || documentDetail.type === "Power To Sell Immovable Property With Family" || documentDetail.type === "Power To Sell Movable Property and other purposes" || documentDetail.type === "Adjudication" || documentDetail.type === "Cancellation Deed") {
        data.stampValue = documentDetail.stampDuty
        data.regFees = documentDetail.regFees
    } else if (documentDetail.type === "Partnership Deed") {
        data.stampValue = numericValue <= 500 ? documentDetail.stampDuty : documentDetail.maxStamp
        data.regFees = Math.ceil(numericValue * documentDetail.regFees);
    } else if (documentDetail.type === "Lease Deed") {
        let stampPercentage = 0;
        if (data.leaseYears === "Below 30 years") {
            stampPercentage = documentDetail.stampDuty[0]
        } else if (data.leaseYears === "Below 99 years") {
            stampPercentage = documentDetail.stampDuty[1]
        } else if (data.leaseYears === "Above 99 years") {
            stampPercentage = documentDetail.stampDuty[2]
        }

        data.stampValue = Math.ceil(numericValue * stampPercentage);
        const rgFees = Math.ceil(numericValue * documentDetail.regFees);
        data.regFees = rgFees > documentDetail.maxFees ? documentDetail.maxFees : rgFees;
    }

    // Assuming cdFees and welfareFees are defined somewhere in the data object
    data.govtFeesTotal = data.stampValue + data.regFees + data.computerFees + (data.cdFees || 0) + (data.subDivisionFees || 0) + (data.welfareFees || 0);


    const navigateDocumentType = () => {

        navigation.navigate("DocumentType", {
            profile: data.profile
        });

    };
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

            {
                documentDetail.type === "Lease Deed" ? (
                    <View>
                        <Text style={styles.txt}>Years</Text>
                        <Picker
                            selectedValue={data.leaseYears}
                            onValueChange={(itemValue) => setData(prevData => ({ ...prevData, leaseYears: itemValue }))}
                            style={styles.picker}
                        >
                            <Picker.Item label="Below 30 years" value="Below 30 years" style={styles.pickerItem} />
                            <Picker.Item label="Below 99 years" value="Below 99 years" style={styles.pickerItem} />
                            <Picker.Item label="Above 99 years" value="Above 99 years" style={styles.pickerItem} />
                        </Picker>
                    </View>
                ) : null
            }


            <Text style={styles.txt}>Total Pages</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, totalPage: text }))}
                value={data.totalPage}
                placeholder="Number of pages"
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
            {
                data.profile === "GenerateBill" ? <View>
                    <Text style={styles.txt1}>Stamp Duty: {`${data.stampValue}`}</Text>
                    <Text style={styles.txt1}>Registration Fees: {`${data.regFees}`}</Text>
                    <Text style={styles.txt1}>Computer Fees: {`${data.computerFees}`}</Text>
                    <Text style={styles.txt1}>CD Fees: {`${data.cdFees}`}</Text>
                    <Text style={styles.txt1}>SubDivision Fees: {`${data.subDivisionFees}`}</Text>
                    <Text style={styles.txt1}>Welfare Fees: {`${data.welfareFees}`}</Text>
                    <Text style={styles.txt1}>Total: {`${data.govtFeesTotal}`}</Text>
                </View> : null
            }

            {
                data.profile === "GenerateBill" ? <Button
                    title="Go to Writer Fees"
                    onPress={() => handleNavigate('WriterOrAdvocateFees')}
                /> : null
            }
            {
                data.profile !== "GenerateBill" ? <Button
                    title="Next"
                    onPress={() => handleNavigate('PDFprint')}
                /> : null
            }

            <Button
                title="Back to Document Type Page"
                onPress={navigateDocumentType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
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
