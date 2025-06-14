import React from "react";

const DateDisplay = ({thisMonth,thisDate,days,thisDay}) => {
  return (
    <div className="h-[7%] py-2 text-center text-3xl border-b-2 border-mainGray">
      <p>
        <span className="mr-4">{thisMonth + "/" + thisDate}</span>
        <span>{days[thisDay]}</span>
      </p>
    </div>
  );
};

export default DateDisplay;
