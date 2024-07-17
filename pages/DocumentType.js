import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MyContext } from '../context/MyContext';
import { documentDetails, documentType } from '../value';

export default function DocumentType({ route, navigation }) {
    const { data, setData } = useContext(MyContext);
    const { profile } = route.params
    const [errors, setErrors] = useState({});

    const getSelectedData = documentDetails.filter(i => {
        return i.type === data.selectedDocumentType;
    });

    const validateFields = () => {
        let valid = true;
        let tempErrors = {};

        if (!data.officeName && profile === "GenerateBill") {
            tempErrors.officeName = 'Office Name is required';
            valid = false;
            console.log("officeName:")
        }
        if (!data.phoneNo && profile === "GenerateBill") {

            if (!/^\d{10}$/.test(data.phoneNo)) {
                tempErrors.phoneNo = 'Phone No is required and must be 10 digits';
                valid = false;
                console.log("phoneNo:")
            }
        }
        if (!data.customerName && profile === "GenerateBill") {
            tempErrors.customerName = 'Customer Name is required';
            valid = false;
            console.log("customerName:")
        }
        if (!data.subRegisterOffice) {
            tempErrors.subRegisterOffice = 'Sub Register Office is required';
            valid = false;
        }
        if (!data.village) {
            tempErrors.village = 'Village is required';
            valid = false;
        }
        if (!data.selectedDocumentType) {
            tempErrors.selectedDocumentType = 'Document type is required';
            valid = false;
        }

        setErrors(tempErrors);
        console.log("valid:", valid)
        console.log("data:", data)
        return valid;
    };

    const handleNavigate = () => {
        if (validateFields()) {
            setData({ ...data, profile: profile })
            navigation.navigate("Government Value", {
                documentDetails: getSelectedData
            });
        } else {
            Alert.alert('Validation Error', 'Please correct the errors before proceeding.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                profile === "GenerateBill" ? <View>

                    <Text style={styles.txt}>Office Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setData(prevData => ({ ...prevData, officeName: text }))}
                        value={data.officeName}
                        placeholder="Enter office Name"
                        keyboardType="default"
                    />
                    {errors.officeName && <Text style={styles.errorText}>{errors.officeName}</Text>}

                    <Text style={styles.txt}>Phone No</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setData(prevData => ({ ...prevData, phoneNo: text }))}
                        value={data.phoneNo}
                        placeholder="Enter Phone No"
                        keyboardType="numeric"
                    />
                    {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}

                    <Text style={styles.txt}>Customer Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setData(prevData => ({ ...prevData, customerName: text }))}
                        value={data.customerName}
                        placeholder="Enter customer Name"
                        keyboardType="default"
                    />
                    {errors.customerName && <Text style={styles.errorText}>{errors.customerName}</Text>}
                </View> : null
            }
            <Text style={styles.txt}>Sub Register Office</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, subRegisterOffice: text }))}
                value={data.subRegisterOffice}
                placeholder="Enter reg office"
                keyboardType="default"
            />
            {errors.subRegisterOffice && <Text style={styles.errorText}>{errors.subRegisterOffice}</Text>}

            <Text style={styles.txt}>Village</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, village: text }))}
                value={data.village}
                placeholder="Enter village"
                keyboardType="default"
            />
            {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}

            <Text style={styles.txt}>Document type</Text>
            <Picker
                selectedValue={data.selectedDocumentType}
                onValueChange={(itemValue) => setData(prevData => ({ ...prevData, selectedDocumentType: itemValue }))}
                style={styles.picker}
            >
                {
                    documentDetails.map(name => (
                        <Picker.Item key={name.type} label={name.type} value={name.type} style={styles.pickerItem} />
                    ))
                }
            </Picker>
            {errors.selectedDocumentType && <Text style={styles.errorText}>{errors.selectedDocumentType}</Text>}

            <Button
                title="Go to Government Value"
                onPress={handleNavigate}
            />


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
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});
