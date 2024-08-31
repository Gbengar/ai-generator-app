import React from "react";

const ScrollingBanner = () => {
  const content = [
    "Subscribe to our newsletter",
    "How it works",
    "Documentation",
    "Join the community",
  ];

  return (
    <div className="overflow-hidden bg-gray-900 text-white py-2">
      <div className="flex animate-scroll">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex whitespace-nowrap">
            {content.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <span className="inline-block px-4">{item}</span>
                <span className="inline-block px-4">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
