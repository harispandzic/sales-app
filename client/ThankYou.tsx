import React, { useState, useEffect } from 'react'

const ThankYou = () => {
    const [messageTo, setMessageTo] = useState("");

    useEffect(() => {
        setMessageTo("Tarek");
    });

    console.log("We will still get bored with the questions :)")

    const ThankYouMessage = `${messageTo}, Thank you so much for your time
        and effort to teach us something. Your patience is endless and your
        passion is so evident. Thanks a million! 
        
        -Praktikanti`

    return (
        <>
            <h1>Thank you message</h1>
            <p>{ThankYouMessage}</p>
        </>
    )
}

export default ThankYou;

