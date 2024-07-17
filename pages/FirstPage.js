import React, { useContext, useState } from 'react';
import { Button, View } from "react-native";
import { MyContext } from '../context/MyContext';

export default function FirstPage({ navigation }) {

    const { data, setData } = useContext(MyContext);

    const GenerateBill = () => {

        navigation.navigate("DocumentType", {
            profile: "GenerateBill"
        });

    };
    const RegistrationCalc = () => {

        navigation.navigate("DocumentType", {
            profile: "Public"
        });

    };


    return (
        <View>


            <Button
                title="Registration Calculation"
                onPress={RegistrationCalc}
            />

            <Button
                title="Generate Bill"
                onPress={GenerateBill}
            />

            <Button
                title="Land Area Calculation"
                onPress={() => navigation.navigate('LandAreaCalculation')}
            />
            {/* <Button
                title="Go to Document Details"
                onPress={() => navigation.navigate('DocumentType')}
            /> */}
        </View>
    )


}