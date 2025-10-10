import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const { resultImage, image } = useContext(AppContext);
  const [resultURL, setResultURL] = useState("");

  // Safely generate object URL for result image
  useEffect(() => {
    if (!resultImage) return;

    try {
      if (resultImage instanceof Blob) {
        // if backend sent Blob
        const objectURL = URL.createObjectURL(resultImage);
        setResultURL(objectURL);
        return () => URL.revokeObjectURL(objectURL);
      } else if (typeof resultImage === "string") {
        // if backend sent base64 string
        setResultURL(resultImage);
      } else {
        console.warn("⚠️ Unknown resultImage type:", typeof resultImage);
      }
    } catch (err) {
      console.error("❌ Error creating image URL:", err);
    }
  }, [resultImage]);

  // For the original image (uploaded one)
  const originalURL = image ? URL.createObjectURL(image) : "";

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[55vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        {/* -----Image Container----- */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/* ---Left Side: Original Image--- */}
          <div>
            <p className="text-center font-semibold text-gray-600 mb-2">
              Original
            </p>
            {image && (
              <img
                src={originalURL}
                alt="Original"
                className="rounded-md border"
              />
            )}
          </div>

          {/* ---Right Side: Background Removed Image--- */}
          <div className="flex flex-col">
            <p className="text-center font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {resultURL ? (
                <img
                  src={resultURL}
                  alt="Result"
                  className="rounded-md border"
                />
              ) : image ? (
                // Loader when processing
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* -----Buttons Container----- */}
        {resultURL && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700"
            >
              Try another image
            </button>

            <a
              href={resultURL}
              download="cleancut_result.png"
              className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
            >
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
