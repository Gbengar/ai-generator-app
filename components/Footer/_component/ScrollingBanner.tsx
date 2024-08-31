import React from "react";

const ScrollingBanner = () => {
  const content = [
    "Subscribe to our newsletter",
    "How it works",
    "Documentation",
    "Join the community",
  ];

  return (
    <div className="overflow-hidden bg-gray-900 text-white ">
      <div className="flex animate-scroll min-w-max">
        {/* Duplicate content to ensure continuous scrolling */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex whitespace-nowrap">
            {content.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <span className="inline-block px-4 text-xs">{item}</span>
                <span className="inline-block px-4 text-xs">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
