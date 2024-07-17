export const valueData = {
    "saledeed_stampDuty": 0.07,
    "saledeed_regFees": 0.02,
    "subdivision_rural": 400,
    "subdivision_urban": 600
}

export const subDivision = {
    rural: 400,
    urban: 600
}

export const documentType = [
    "SaleDeed",
    "SaleDeed New Apartment",
    "Sale Aggreement",
    "Construction Aggreement",
    "Mod",
    "Settlement With Family",
    "Settlement With Non Family",
    "Will",
    "Simple Mortgage Without Possession",
    "Simple Mortgage With possession",
    "Exchange Deed",
    "Receipt",
    "Partition With Family",
    "Partition With Non Family",
    "Power To Sell Immovable Property With Family",
    "Power To Sell Immovable Property With Non Family",
    "Power To Sell Movable Property and other purposes",
    "Power To Market Value",
    "Adjudication",
    "Release Deed With Family",
    "Release Deed With Non Family",
    "Partnership Deed",
    "Lease Deed",
    "Cancellation Deed",
    "Trust Deed",
    "Sale Certificate",
    "Rectification Deed",
    "Ratification Deed",
]

export const documentDetails = [
    {
        type: "SaleDeed",
        stampDuty: 0.07,
        regFees: 0.02,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "yes",
        description: ""
    },
    // {
    //     type: "SaleDeed New Apartment",
    //     stampDuty: 0.00,
    //     regFees: 0.00,
    //     maxStamp: 0,
    //     maxFees: 0,
    //     subDivision: "yes",
    //     description: ""
    // },
    {
        type: "Sale Aggreement",
        stampDuty: 200,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
    {
        type: "Construction Aggreement",
        stampDuty: 0.01,
        regFees: 0.03,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
    {
        type: "Mod",
        stampDuty: 0.005,
        regFees: 0.01,
        maxStamp: 40000,
        maxFees: 8000,
        subDivision: "no",
        description: ""
    },
    {
        type: "Settlement With Family",
        stampDuty: 0.01,
        regFees: 0.01,
        maxStamp: 40000,
        maxFees: 10000,
        subDivision: "yes",
        description: ""
    },
    {
        type: "Settlement With Non Family",
        stampDuty: 0.07,
        regFees: 0.02,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "yes",
        description: ""
    },
    {
        type: "Will",
        stampDuty: 0,
        regFees: 500,
        maxStamp: 0,
        maxFees: 500,
        subDivision: "no",
        description: ""
    },
    {
        type: "Simple Mortgage Without Possession",
        stampDuty: 0.01,
        regFees: 0.01,
        maxStamp: 50000,
        maxFees: 15000,
        subDivision: "no",
        description: ""
    },
    {
        type: "Simple Mortgage With possession",
        stampDuty: 0.04,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 200000,
        subDivision: "no",
        description: ""
    },
    {
        type: "Exchange Deed",
        stampDuty: 0.07,
        regFees: 0.02,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "yes",
        description: "Maximum value of the property"
    },
    {
        type: "Receipt",
        stampDuty: 1,
        regFees: 200,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
    {
        type: "Partition With Family",
        stampDuty: 0.01,
        regFees: 0.01,
        maxStamp: 40000,
        maxFees: 10000,
        subDivision: "yes",
        description: "Each Share"
    },
    {
        type: "Partition With Non Family",
        stampDuty: 0.04,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "yes",
        description: "Separated Share"
    },
    {
        type: "Power To Sell Immovable Property With Family",
        stampDuty: 1000,
        regFees: 2000,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: "General Power of Attorney to SELL the immovable property (when Power is given to family member)"
    },
    {
        type: "Power To Sell Immovable Property With Non Family",
        stampDuty: 0.01,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: "General Power of Attorney to SELL the immovable property (when power is given to non family member)"
    },
    {
        type: "Power To Sell Movable Property and other purposes",
        stampDuty: 1000,
        regFees: 500,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: "General Power of Attorney to SELL the Movable property & for other purposes"
    },
    {
        type: "Power To Market Value",
        stampDuty: 0.05,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: "General Power of Attorney given for consideration"
    },
    {
        type: "Adjudication",
        stampDuty: 5,
        regFees: 1000,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
    {
        type: "Release Deed With Family",
        stampDuty: 0.01,
        regFees: 0.01,
        maxStamp: 40000,
        maxFees: 10000,
        subDivision: "yes",
        description: ""
    },
    {
        type: "Release Deed With Non Family",
        stampDuty: 0.07,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "yes",
        description: ""
    },
    {
        type: "Partnership Deed",
        stampDuty: 50,
        regFees: 0.01,
        maxStamp: 1000,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
    {
        type: "Lease Deed",
        stampDuty: [0.01, 0.04, 0.07],
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 40000,
        subDivision: "no",
        description: ""
    },
    {
        type: "Cancellation Deed",
        stampDuty: 1000,
        regFees: 500,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
    {
        type: "Trust Deed",
        stampDuty: 1000,
        regFees: 0.01,
        maxStamp: 0,
        maxFees: 0,
        subDivision: "no",
        description: ""
    },
     // {
    //     type: "Sale Certificate",
    //     stampDuty: 0.00,
    //     regFees: 0.00,
    //     maxStamp: 0,
    //     maxFees: 0,
    //     subDivision: "no",
    //     description: ""
    // },
     // {
    //     type: "Rectification Deed",
    //     stampDuty: 0.00,
    //     regFees: 0.00,
    //     maxStamp: 0,
    //     maxFees: 0,
    //     subDivision: "no",
    //     description: ""
    // },
     // {
    //     type: "Ratification Deed",
    //     stampDuty: 0.00,
    //     regFees: 0.00,
    //     maxStamp: 0,
    //     maxFees: 0,
    //     subDivision: "no",
    //     description: ""
    // },
]