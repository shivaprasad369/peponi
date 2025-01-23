import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plus, Minus } from "lucide-react";

export default function AttributesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [attributes, setAttributes] = useState([{ attributeName: "", value: [''] }]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      return response.data.result;
    }
  });

  const { data: subCategories } = useQuery({
    queryKey: ["subcategories", selectedCategory],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/update/2`);
      return response.data.result;
    },
    enabled: !!selectedCategory
  });

  const handleAddAttribute = () => {
    setAttributes([...attributes, { attributeName: "", value: [''] }]);
  };

  const handleRemoveAttribute = (attributeIndex) => {
    const newAttributes = attributes.filter((_, index) => index !== attributeIndex);
    setAttributes(newAttributes);
  };

  const handleAddValue = (attributeIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].value.push('');
    setAttributes(newAttributes);
  };

  const handleRemoveValue = (attributeIndex, valueIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].value = newAttributes[attributeIndex].value.filter(
      (_, index) => index !== valueIndex
    );
    setAttributes(newAttributes);
  };

  const handleAttributeNameChange = (attributeIndex, name) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].attributeName = name;
    setAttributes(newAttributes);
  };

  const handleValueChange = (attributeIndex, valueIndex, value) => {
    const newAttributes = [...attributes];
    newAttributes[attributeIndex].value[valueIndex] = value;
    setAttributes(newAttributes);
  };
console.log(attributes);
  return (
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Attributes</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Category</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedCategory} 
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory("");
                }}
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.CategoryID} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Subcategory</label>
              <select
                className="w-full p-2 border rounded-md" 
                value={selectedSubCategory} 
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                disabled={!selectedCategory}
              >
                <option value="">Select a subcategory</option>
                {subCategories?.filter(sub => sub.CategoryID.toString() === selectedCategory)
                  .map((subCategory) => (
                    <option key={subCategory.SubCategoryID} value={subCategory.SubCategoryID}>
                      {subCategory.SubCategoryName}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {attributes.map((attribute, attributeIndex) => (
              <div key={attributeIndex} className="bg-white border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md"
                    placeholder="Attribute Name"
                    value={attribute.attributeName}
                    onChange={(e) => handleAttributeNameChange(attributeIndex, e.target.value)}
                  />
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => handleRemoveAttribute(attributeIndex)}
                  >
                    Remove Attribute
                  </button>
                </div>

                <div className="space-y-2">
                  {attribute.value.map((value, valueIndex) => (
                    <div key={valueIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-md"
                        placeholder="Value"
                        value={value}
                        onChange={(e) => handleValueChange(attributeIndex, valueIndex, e.target.value)}
                      />
                      <button
                        className="p-2 border rounded-md hover:bg-gray-100"
                        onClick={() => handleAddValue(attributeIndex)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      {attribute.value.length > 1 && (
                        <button
                          className="p-2 border rounded-md hover:bg-gray-100"
                          onClick={() => handleRemoveValue(attributeIndex, valueIndex)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleAddAttribute}
          >
            Add Attribute
          </button>
        </div>
      </div>
    </div>
  );
}