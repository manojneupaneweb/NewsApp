import React, { useState, useEffect } from "react";
import NepaliDate from "nepali-date-converter"; // Ensure this package is installed

export function DateAndTime() {
    const [nepaliDateTime, setNepaliDateTime] = useState({
        date: "",
        time: "",
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const nepaliDate = new NepaliDate(now);
            const dayOfWeek = [
                "आइतबार",
                "सोमबार",
                "मंगलबार",
                "बुधबार",
                "बिहीबार",
                "शुक्रबार",
                "शनिबार",
            ];

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds}`;

            setNepaliDateTime({
                date: `${nepaliDate.format("YYYY/MM/DD")}`,
                week: `${dayOfWeek[now.getDay()]}`,
                time: formattedTime,
            });
        };

        updateDateTime(); // Initial call
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-semibold">
            <p>{nepaliDateTime.date}</p>
            <p>{nepaliDateTime.week}</p>
            <p>{nepaliDateTime.time}</p>
        </div>
    );
}
