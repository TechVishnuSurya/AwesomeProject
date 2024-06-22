import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Print from 'expo-print';
import { MyContext } from '../context/MyContext';



export default function PDFprint({ navigation }) {

    const { data, setData } = useContext(MyContext)



    const printHTML = async () => {
        const inputsHTML = data.inputs.map(input => `
            <p><strong>${input.name}:</strong> ${input.value}</p>
        `).join('');

        let checkLeaseYears;
        if (data.leaseYears !== "") {
            checkLeaseYears = `<p><strong>Lease Years:</strong> ${data.leaseYears}</p>`
        }

        const htmlContent = `
            <html>
                <body style="text-align: center;">
                    <div style="background-color: orange; padding:0.2px; border: 0.5px solid black">
                       <h1 style="text-align: center; color: white">Document Bill</h1>
                    </div>
                    <p><strong>Office Name:</strong> ${data.officeName}</p>
                    <p><strong>Phone No:</strong> ${data.phoneNo}</p>
                    <p><strong>Customer Name:</strong> ${data.customerName}</p>
                    <p><strong>Sub Register Office:</strong> ${data.subRegisterOffice}</p>
                    <p><strong>Village Name:</strong> ${data.village}</p>
                    <p><strong>Document Type:</strong> ${data.selectedDocumentType === "saledeed" ? "Sale Deed" : "Mod"}</p>
                    <p><strong>Document Value:</strong> ${data.textInputValue}</p>
                   
                    <div style="background-color: orange; padding:0.2px; border: 0.5px solid black">
                        <h2 style="text-align: center; color: white;">Government Fees</h2>
                    </div>
                   
                    ${checkLeaseYears}

                    <p><strong>Stamp Duty:</strong> ${data.stampValue}</p>
                    <p><strong>Registration Fees:</strong> ${data.regFees}</p>
                    <p><strong>Computer Fees:</strong> ${data.computerFees}</p>
                    <p><strong>SubDivision Fees:</strong> ${data.subDivisionFees}</p>
                    <p><strong>CD Fees:</strong> ${data.cdFees}</p>
                    <p><strong>Welfare Fees:</strong> ${data.welfareFees}</p>
                   
                    <div style="background-color: orange; padding:0.2px; border: 0.5px solid black">
                        <h2 style="text-align: center; color: white;">Document Writer And Other Charges</h2>
                    </div> 

                    ${inputsHTML}
                   
                    <div style="background-color: orange; padding:0.2px; border: 0.5px solid black">
                       <h2 style="text-align: center; color: white;">Total Fees</h2>
                    </div>

                    <p><strong>Total Government Fees:</strong> ${data.govtFeesTotal}</p>
                    <p><strong>Total Writer Fees:</strong> ${data.writerFeesTotal}</p>
                    <p><strong>Total Overall Fees:</strong> ${(data.govtFeesTotal + data.writerFeesTotal)}</p>
                   
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

            <Text style={styles.txt1}>Office Name: {`${data.officeName}`}</Text>
            <Text style={styles.txt1}>Phone No: {`${data.phoneNo}`}</Text>
            <Text style={styles.txt1}>Customer Name: {`${data.customerName}`}</Text>
            <Text style={styles.txt1}>Sub Register Office: {`${data.subRegisterOffice}`}</Text>
            <Text style={styles.txt1}>Village: {`${data.village}`}</Text>
            <Text style={styles.txt1}>Document Type: {`${data.selectedDocumentType}`}</Text>
            <Text style={styles.txt1}>Value: {`${data.textInputValue}`}</Text>

            {
                data.leaseYears !== "" ? <Text style={styles.txt1}>Lease Years: {`${data.leaseYears}`}</Text> : null
            }

            <Text style={styles.txt1}>Stamp Duty: {`${data.stampValue}`}</Text>
            <Text style={styles.txt1}>Registration Fees: {`${data.regFees}`}</Text>
            <Text style={styles.txt1}>Computer Fees: {`${data.computerFees}`}</Text>
            <Text style={styles.txt1}>CD Fees: {`${data.cdFees}`}</Text>
            <Text style={styles.txt1}>SubDivision Fees: {`${data.subDivisionFees}`}</Text>
            <Text style={styles.txt1}>Welfare Fees: {`${data.welfareFees}`}</Text>

            <Text style={styles.txt1}>Total Government Fees: {`${data.govtFeesTotal}`}</Text>

            <Text style={styles.txt1}>Document writer and Other Charges</Text>
            {
                data.inputs.map((input, index) => {
                    return (
                        <View key={input.id} style={styles.inputContainer}>
                            <Text style={styles.txt1}>{`${input.name} : ${input.value}`}</Text>
                        </View>
                    );
                })
            }

            <Text style={styles.txt1}>Total Writer Fees: {`${data.writerFeesTotal}`}</Text>

            <Text style={styles.txt1}>Total Overall Fees: {`${data.govtFeesTotal + data.writerFeesTotal}`}</Text>

            <Button title="Create PDF" onPress={printHTML} />
            <Button
                title="Back to Writer Fees Page"
                onPress={() => navigation.navigate('WriterOrAdvocateFees')}
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
