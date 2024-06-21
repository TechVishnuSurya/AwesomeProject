import React, { useContext, useState } from 'react';
import { Button, View } from "react-native";


export default function FirstPage({ navigation }) {
    return (
        <View>
            <Button
                title="Writer Or Advocate"
                onPress={() => navigation.navigate('WriterOrAdvocateProfile')}
            />

            <Button
                title="Public"
                onPress={() => navigation.navigate('PublicProfile')}
            />

<Button
                title="Go to Document Details"
                onPress={() => navigation.navigate('DocumentType')}
            />
        </View>
    )


}