import React from "react";

const KYCStepper = ({ steps = [], currentStep }) => {
  return (
    <div className="flex items-center justify-center space-x-8 flex-wrap">
      {steps.map((step, index) => {
        // Color logic
        let circleColor = "bg-gray-300";
        let lineColor = "bg-gray-300";

        if (index < currentStep) {
          circleColor = "bg-green-500";
          lineColor = "bg-green-500";
        } else if (index === currentStep) {
          circleColor = step === "KYC Rejected" ? "bg-red-500" : "bg-green-500";
        }

        return (
          <div key={index} className="flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${circleColor} text-white font-bold text-lg transition-all duration-500`}
            >
              {index + 1}
            </div>

            {/* Step Name */}
            <span className="mt-2 text-center text-sm w-28">
              {step}
            </span>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="absolute top-6 left-full w-24 h-1">
                <div
                  className={`h-full ${index < currentStep ? lineColor : "bg-gray-300"} transition-all duration-500`}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default KYCStepper;
