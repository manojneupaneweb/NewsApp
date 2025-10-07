import { useState, useEffect } from "react";
import NepaliDate from "nepali-date-converter";

export function DateAndTime() {
  const [dateTime, setDateTime] = useState({
    nepali: "",
    english: "",
    weekNp: "",
    weekEn: "",
    time: "",
  });

  const toNepaliNumber = (num) => {
    const nepaliDigits = ["०","१","२","३","४","५","६","७","८","९"];
    return num.toString().split("").map(d => nepaliDigits[+d] || d).join("");
  };

  const nepaliMonths = [
    "बैशाख", "जेठ", "असार", "साउन", "भदौ", "आश्विन",
    "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुन", "चैत्र"
  ];

  const dayOfWeekNepali = [
    "आइतबार",
    "सोमबार",
    "मंगलबार",
    "बुधबार",
    "बिहीबार",
    "शुक्रबार",
    "शनिबार",
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const nepaliDate = new NepaliDate(now);

      const nepaliFormatted = `${toNepaliNumber(nepaliDate.getDate())} ${nepaliMonths[nepaliDate.getMonth()]} ${toNepaliNumber(nepaliDate.getYear())}`;

      const englishFormatted = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const hours = toNepaliNumber(now.getHours());
      const minutes = toNepaliNumber(now.getMinutes());
      const seconds = toNepaliNumber(now.getSeconds());
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      setDateTime({
        nepali: nepaliFormatted,
        english: englishFormatted,
        weekNp: dayOfWeekNepali[now.getDay()],
        weekEn: now.toLocaleDateString("en-US", { weekday: "long" }),
        time: formattedTime,
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-semibold text-center flex flex-col items-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg"
        alt="Nepal Flag"
        className="w-10 h-10 mb-2"
      />
      <p>{dateTime.nepali} {dateTime.weekNp}</p>
      <p>{dateTime.english}</p>
      <p>{dateTime.time}</p>
    </div>
  );
}
