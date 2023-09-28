export const submenu = {
    monitoring : [{
        name : "Transaction Monitoring",
        link : "/Monitoring/Transaction",
        key : "0"
    },
    {
        name : "Alert Acquirer",
        link : "/Monitoring/AlertAcquirer",
        key : "1"
    },
    {
        name : "Alert Issuer",
        link : "/Monitoring/AlertIssuer",
        key : "1"
    },
],

    list : [{
        name : "Fraud List",
        link : "/List-Management/FraudList",
        key : "0"
    },
    {
        name : "White List",
        link : "/List-Management/WhiteList",
        key : "1"
    },
    {
        name : "Black List",
        link : "/List-Management/BlackList",
        key : "2"
    },
],

        fraud : [{
            name : "Fraud List Data",
            link : "/Fraud/FraudListData",
            key : "0",
        },
        {
            name : "Fraud List Value Data",
            link : "/Fraud/FraudValue",
            key : "1"
        },
],

        scenario : [{
            name : "Scenario Studio",
            link : "/Scenario/ScenarioStudio",
            key : "0",
        },
        {
            name : "Scenario Group",
            link : "/Scenario/ScenarioGroup",
            key : "1"
        },
        {
            name : "Aggregating",
            link : "/Scenario/Aggregating",
            key : "2"
        },
],
        dictionaries : [{
            name : "ISO8583",
            link : "/Dictionaries/ISO8583",
            key : "0",
        },
],
        notification : [{
            name : "Notification Template",
            link : "/Notification/NotificationTemplate",
            key : "0",
        },
        {
            name : "Contact Setup",
            link : "/Notification/ContactSetup",
            key : "1"
        },
        {
            name : "Contact Group",
            link : "/Notification/ContactGroup",
            key : "2"
        },
],

        sefis : [
        // {
        //     name : "Transaction Management",
        //     link : "/Sefis/TransactionManagement",
        //     key : "0",
        // },
        {
            name : "Transaction Type",
            link : "/Sefis/TransactionType",
            key : "1"
        },
        // {
        //     name : "Messaging Data",
        //     link : "/Sefis/MessagingData",
        //     key : "2"
        // },
        // {
        //     name : "Aid Parameter",
        //     link : "/Sefis/AidParameter",
        //     key : "3"
        // },  
],

        user : [{
            name : "User",
            link : "/User-Management/User",
            key : "0",
        },
        {
            name : "Institution",
            link : "/User-Management/Institution",
            key : "1"
        },
        {
            name : "Group",
            link : "/User-Management/Group",
            key : "2"
        },
        {
            name : "Role",
            link : "/User-Management/Role",
            key : "4"
        }, 
        {
            name : "Audit",
            link : "/User-Management/Audit",
            key : "3"
        },  
],
}