import React from "react";

function NepaliCalendarBadge({ 
  width = 'auto', 
  height = 'auto', 
  shadow = true, 
  apiId = "88820250107763",
  className = ""
}) {
  const iframeWidth = width === "responsive" || width === "auto" ? "100%" : `${width}px`;
  const iframeHeight = height === "auto" ? "180px" : `${height}px`;

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="relative w-full overflow-hidden rounded-lg bg-white">
        <iframe
          id="cb_nciframe"
          src={`https://www.ashesh.com.np/nepali-calendar/widget/calendar-badge.php?api=${apiId}`}
          style={{
            border: "none",
            overflow: "hidden",
            width: iframeWidth,
            height: iframeHeight,
            borderRadius: "8px",
          }}
          className={`w-full ${shadow ? "shadow-md" : ""}`}
          scrolling="no"
          frameBorder="0"
          allowTransparency="true"
          title="Nepali Calendar Badge"
        ></iframe>

        {/* Overlay to disable clicks */}
        <div className="absolute inset-0 z-10 cursor-text"></div>
      </div>
    </div>
  );
}

export default NepaliCalendarBadge;