import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { HiMinusCircle } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";

export default function AttributeUi({
  setAttributeCount,
  attributeCount,
  index,
  attributeData,
  setAttributeData,
  isEdit
}) {
  const [count, setCount] = useState(2);
const queryClient = useQueryClient()
  const handleAddAttributeValue = () => {
    setCount((prev) => prev + 1);
    setAttributeData((prev) => {
      const updated = { ...prev };
      if (!updated[index]?.values) {
        updated[index] = { ...updated[index], values: [] };
      }
      updated[index].values.push(""); 
      return updated;
    });
  };

  const handleRemoveAttributeValue = (valueIndex) => {
    setAttributeData((prev) => {
      const updated = { ...prev };
      if (updated[index]?.values) {
        updated[index].values = updated[index].values.filter((_, i) => i !== valueIndex);
      }
      return updated;
    });
  };

  const handleRemoveAttribute = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/attribute/${id}`);
      if (response.status === 200) {
    
        setAttributeData((prev) => {
          const updated = { ...prev };
          delete updated[index]; 
          return updated;
        });
        setAttributeCount((prev) => prev - 1);
        queryClient.invalidateQueries({queryKey:['attribute']})
      }
    } catch (error) {

      console.error("Delete attribute error:", error);
    }
  };

  const handleAttributeName = (e) => {
    setAttributeData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        attributeName: e.target.value,
        values: prev[index]?.values || [],
      },
    }));
  };

  const handleAttributeValue = (e, valueIndex) => {
    const newValue = e.target.value;
    setAttributeData((prev) => {
      const updated = { ...prev };
      const attribute = updated[index] || { values: [] };
      const updatedValues = [...attribute.values];
      updatedValues[valueIndex] = { ...updatedValues[valueIndex], value: newValue };

      updated[index] = { ...attribute, values: updatedValues };
      return updated;
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

      <div className="w-[40%] flex flex-col gap-2 justify-start items-start">
        <label htmlFor="attributeValues" className="text-lg font-semibold">
          Value <span className="text-red-500">*</span>
        </label>
        {attributeData[index]?.values?.map((val, valueIndex) => (
          <div key={valueIndex} className="flex items-center gap-2 w-[100%]">
            <input
              value={val.value || ""} 
              onChange={(e) => handleAttributeValue(e, valueIndex)}
              type="text"
              name={`attributeValue-${valueIndex}`}
              className="w-[100%] h-[60px] outline-none p-2 border-[1px] border-gray-300 rounded-md"
              required
            />
            <span
              onClick={() => handleRemoveAttributeValue(valueIndex)} 
              className="text-xl font-semibold cursor-pointer"
            >
              <HiMinusCircle />
            </span>
          </div>
        ))}
        <span
          onClick={handleAddAttributeValue}
          className="text-xl font-semibold cursor-pointer mt-2"
        >
          <IoIosAddCircle />
        </span>
      </div>

      <div className="w-[20%] mt-[2.5rem] flex flex-col gap-2 justify-start items-start">
        <div
          onClick={() => handleRemoveAttribute(attributeData[index]?.attribute_id)}
          className={`bg-red-500 text-white px-3 py-2 text-md font-semibold`}
        >
          <span>Remove Attribute</span>
        </div>
      </div>
    </div>
  );
}
