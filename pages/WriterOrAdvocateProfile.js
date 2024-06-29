import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { MyContext } from '../context/MyContext';

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
        if (!data.phoneNo || !/^\d{10}$/.test(data.phoneNo)) {
            tempErrors.phoneNo = 'Phone No is required and must be 10 digits';
            valid = false;
        }
        if (!data.email) {
            tempErrors.email = 'Office Email is required';
            valid = false;
        }
        if (!data.address) {
            tempErrors.address = 'Office Address is required';
            valid = false;
        }
        if (!data.password) {
            tempErrors.password = 'Password is required';
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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    onChangeText={(text) => setData(prevData => ({ ...prevData, phoneNo: text }))}
                    value={data.phoneNo}
                    placeholder="Enter Office Phone No"
                    keyboardType="numeric"
                />
                {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}

                <Text style={styles.txt}>Office Email</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setData(prevData => ({ ...prevData, email: text }))}
                    value={data.email}
                    placeholder="Enter Office Email"
                    keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <Text style={styles.txt}>Office Address</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setData(prevData => ({ ...prevData, address: text }))}
                    value={data.address}
                    placeholder="Enter Office Address"
                    keyboardType="default"
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                <Text style={styles.txt}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setData(prevData => ({ ...prevData, password: text }))}
                    value={data.password}
                    placeholder="Enter password"
                    secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Button title="Register" onPress={() => handleNavigate('NextScreen')} />
                <Text style={{ marginVertical: 10 }}>
                    Already have an account? Login here
                </Text>
                <Button
                    title="Go to Document Details"
                    onPress={() => handleNavigate('DocumentType')}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 16,
    },
    txt: {
        color: "black",
        fontSize: 20,
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
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});
