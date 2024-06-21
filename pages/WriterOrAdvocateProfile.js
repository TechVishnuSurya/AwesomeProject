import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { MyContext } from '../context/MyContext';
import { documentDetails } from '../value';

export default function WriterOrAdvocateProfile({ navigation }) {
    const { data, setData } = useContext(MyContext);
    const [errors, setErrors] = useState({});

    

    const validateFields = () => {
        let valid = true;
        let tempErrors = {};

        if (!data.officeName) {
            tempErrors.officeName = 'Office Name is required';
            valid = false;
        }
        if (!data.officePhoneNo || !/^\d{10}$/.test(data.officePhoneNo)) {
            tempErrors.officePhoneNo = 'Phone No is required and must be 10 digits';
            valid = false;
        }
        if (!data.officeEmail) {
            tempErrors.officeEmail = 'Office Email is required';
            valid = false;
        }
        if (!data.officeAddress) {
            tempErrors.officeAddress = 'Office Address is required';
            valid = false;
        }
        if (!data.password) {
            tempErrors.password = 'password is required';
            valid = false;
        }
       

        setErrors(tempErrors);
        return valid;
    };

    const handleNavigate = (screen) => {
        if (validateFields()) {
            navigation.navigate(screen);
        } else {
            Alert.alert('Validation Error', 'Please correct the errors before proceeding.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.txt}>Office Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, officeName: text }))}
                value={data.officeName}
                placeholder="Enter office Name"
                keyboardType="default"
            />
            {errors.officeName && <Text style={styles.errorText}>{errors.officeName}</Text>}

            <Text style={styles.txt}>Office Phone No</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, officePhoneNo: text }))}
                value={data.officePhoneNo}
                placeholder="Enter Office Phone No"
                keyboardType="numeric"
            />
            {errors.officePhoneNo && <Text style={styles.errorText}>{errors.officePhoneNo}</Text>}

            <Text style={styles.txt}>Office Email</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, officeEmail: text }))}
                value={data.officeEmail}
                placeholder="Enter Office Email"
                keyboardType="default"
            />
            {errors.officeEmail && <Text style={styles.errorText}>{errors.officeEmail}</Text>}

            <Text style={styles.txt}>Office Address</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, officeAddress: text }))}
                value={data.officeAddress}
                placeholder="Enter Office Address"
                keyboardType="default"
            />
            {errors.officeAddress && <Text style={styles.errorText}>{errors.officeAddress}</Text>}

            <Text style={styles.txt}>Password</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setData(prevData => ({ ...prevData, password: text }))}
                value={data.password}
                placeholder="Enter password"
                keyboardType="default"
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

           
            <Button
                title="Go to Document Details"
                onPress={() => handleNavigate('DocumentType')}
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
