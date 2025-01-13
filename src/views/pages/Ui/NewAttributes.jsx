import React, { useState } from "react";
import { HiMinusCircle } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";

export default function NewAttributes({
  setAttributeCount,
  attributeCount,
  index,
  attributeData,
  setAttributeData
}) {
  const [count, setCount] = useState(1);
  const handleAddAttributeValue = () => {
    setCount((prev) => prev + 1);
  };

  console.log(attributeData);
  const handleRemoveAttributeValue = (valueIndex) => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
    setAttributeData((prev) => {
      const updated = { ...prev };
      if (updated[index]) {
        updated[index].value.splice(valueIndex, 1);
      }
      return updated;
    });
  };
  
  const handleRemoveAttribute = () => {
    if (attributeCount > 1) {
      setAttributeCount((prev) => prev - 1);
  
      setAttributeData((prev) => {
        const updated = { ...prev };
        
        // Remove the attribute at the current `index`
        delete updated[index];
  
        console.log(updated); // Log the updated state for debugging
  
        return updated;
      });
    }
  };
  
  const handleAttributeName = (e) => {
    setAttributeData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        attributeName: e.target.value,
        value: prev[index]?.value || [], 
      },
    }));
  };
  const handleAttributeValue = (e, valueIndex) => {
    setAttributeData((prev) => {
      const updatedAttributeData = { ...prev };
      const attribute = updatedAttributeData[index] || { value: [] };
      const updatedValues = [...(attribute.value || [])];
      updatedValues[valueIndex] = e.target.value;
      updatedAttributeData[index] = {
        ...attribute,
        value: updatedValues,
      };
      return updatedAttributeData;
    });
  };
  return (
    <div className="w-[100%] bg-slate-200 p-4 mt-2 flex gap-x-8 gap-y-4 justify-start items-start">
      <div className="w-[50%] flex flex-col gap-2 justify-start items-start">
        <label htmlFor="attributeName" className="text-lg font-semibold">
          Attribute <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={attributeData[index]?.attributeName || ""}
          onChange={handleAttributeName}
          name="attributeName"
          className="w-[100%] h-[60px] outline-none p-2 border-[1px] border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="w-[40%] flex gap-2 justify-start items-start">
        <div className="w-[100%] flex flex-col gap-2 justify-start items-start">
          <label htmlFor="attributeValues" className="text-lg font-semibold">
            Value <span className="text-red-500">*</span>
          </label>
          {Array.from({ length: count }).map((_, valueIndex) => (
            <div key={valueIndex} className="flex items-center gap-2 w-[100%]">
            <input
 
              value={attributeData[index]?.value[valueIndex] || ""}
              onChange={(e) => handleAttributeValue(e, valueIndex)}
              type="text"
              name={`attributeValue-${valueIndex}`}
              className="w-[100%] h-[60px] outline-none p-2 border-[1px] border-gray-300 rounded-md"
              required
            />
            {count > 1 && (
              <span
                onClick={()=>handleRemoveAttributeValue(valueIndex)}
                className="text-xl font-semibold cursor-pointer"
              >
                <HiMinusCircle />
              </span>
            )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[3%] mt-[2.5rem] flex flex-col gap-2 justify-start items-start">
        <span
          onClick={handleAddAttributeValue}
          className="text-xl font-semibold cursor-pointer"
        >
          <IoIosAddCircle />
        </span>
    
      </div>
      <div
        onClick={handleRemoveAttribute}
        className="w-[20%] mt-[2.5rem] flex flex-col gap-2 justify-start items-start"
      >
        <button
          className={`${
            index === 0 ? "hidden" : "bg-red-500"
          } text-white px-3 py-2 text-md font-semibold`}
        >
          <span>Remove Attribute</span>
        </button>
      </div>
    </div>
  );
}
