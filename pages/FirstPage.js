import React, { useContext, useState } from 'react';
import { Button, View } from "react-native";
import { MyContext } from '../context/MyContext';

export default function FirstPage({ navigation }) {

    const { data, setData } = useContext(MyContext);

    const writerOrAdvocate = () => {

        navigation.navigate("DocumentType", {
            profile: "WriterOrAdvocate"
        });

    };
    const publicProfile = () => {

        navigation.navigate("DocumentType", {
            profile: "Public"
        });

    };


    return (
        <View>
            <Button
                title="Writer Or Advocate"
                onPress={writerOrAdvocate}
            />

            <Button
                title="Public"
                onPress={publicProfile}
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