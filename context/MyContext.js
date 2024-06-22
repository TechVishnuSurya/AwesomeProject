import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [data, setData] = useState({
        officeName: "",
        phoneNo:"",
        customerName: "",
        subRegisterOffice: "",
        village: "",
        selectedDocumentType: "SaleDeed",
        textInputValue: 0,
        extraPage: 0,
        landType: 'rural',
        subdivision: 0,
        leaseYears: "",
        stampValue: 0,
        regFees: 0,
        computerFees: 200,
        cdFees: 100,
        subDivisionFees: 0,
        welfareFees: 10,
        govtFeesTotal: 0,
        inputs: [{ id: 1, name: '', value: 0 }],
        writerFeesTotal: 0,
        overAllFeesTotal: 0
    });

    return (
        <MyContext.Provider value={{ data, setData }}>
            {children}
        </MyContext.Provider>
    );
};
