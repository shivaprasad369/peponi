import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import useGetCategory from "../Ui/useGetCategory";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import img from '../../../assets/images/avatars/1.jpg'
export default function FeatureProduct() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { category, loading, error, getCategory } = useGetCategory();
  const [options, setOptions] = useState([
    { value: 1, label: "ZTE N295 Sydney, EE C" },
    { value: 2, label: "Samsung A300, Orange B" },
    { value: 3, label: "ZTE N295 Sydney, EE B" },
    { value: 4, label: "Nokia 301, O2 C" },
    { value: 5, label: "Doro 6520, O2 B" },
    { value: 6, label: "Nokia 2310, O2 B" },
    { value: 7, label: "ZTE N295 Sydney, EE A" },
    { value: 8, label: "Nokia X6 8GB, EE B" },
  ]);

  useEffect(() => {
    getCategory();
  }, []);

  const handleSelectChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const selectedOption = options.find((option) => option.value === value);

    if (selectedOption) {
      setSelectedItems([...selectedItems, selectedOption]);
      setOptions(options.filter((option) => option.value !== value)); // Remove selected item from options
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item.value !== itemToRemove.value));
    setOptions([...options, itemToRemove]); // Add back the removed item to options
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedItems = Array.from(selectedItems);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setSelectedItems(reorderedItems);
  };
console.log(selectedItems)
  return (
    <div className="w-[100%] h-[100%] flex flex-col bg-slate-200 justify-start items-start">
      <div className="flex mt-2 justify-start px-4 my-3  gap-2 w-[100%] items-center">
        <FaList className="text-2xl font-semibold" />
        <h1 className="text-3xl font-normal">Manage Featured Products</h1>
      </div>
      <div className="w-[70%] bg-white p-4 flex flex-col justify-center items-start">
        {/* Category Selection */}
        <div className="w-[100%] flex flex-col gap-2 justify-start items-start">
          <label htmlFor="ProductName" className="text-xl font-semibold">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2"
          >
            <option value="">Select Category</option>
            {!loading &&
              category?.map((item) => (
                <option key={item.CategoryID} value={item.CategoryID}>
                  {item.CategoryName}
                </option>
              ))}
          </select>
        </div>

        {/* Selected Products */}
        <label htmlFor="ProductName" className="text-xl mt-4 font-semibold">
          Products <span className="text-red-500">*</span>
        </label>
        <div className='w-[100%] gap-4 mt-2 border-2 border-gray-300 mb-4  flex justify-start items-center flex-wrap'>
        {/* DragDropContext for selectedItems */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="selectedItems">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-[100%] px-2 gap-2 mt-2 flex  justify-start items-center flex-wrap"
              >
                {selectedItems.length > 0 ? (
                  selectedItems.map((item, index) => (
                    <Draggable
                      key={item.value}
                      draggableId={String(item.value)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`px-2 py-2 rounded-md ${
                            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                            margin: "5px",
                            cursor: "grab",
                          }}
                        >
                          <div className="w-[100%] h-[100%] flex justify-start items-center">
                            {item.label}{" "}
                            <b
                              style={{
                                color: "red",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRemoveItem(item)}
                            >
                              x
                            </b>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p>No items selected</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <select
          onChange={handleSelectChange}
          value=""
          className="inline-block w-[100%] m-2 border-2 border-gray-300 rounded-md p-2 outline-none"
        >
          <option value="" disabled>
            Select an item
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        </div>
        {/* Products Dropdown */}

        {/* Sorting Note */}
        <span className="text-sm mt-4 text-gray-500 font-bold tracking-wide">
          Note: Please drag and drop best-selling products to sort.
        </span>

        {/* Sorting Section for Selected Items */}
        <div className="w-[100%] gap-2 mt-2 flex justify-start items-center flex-col">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="selectedItemsSorted">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-[100%] gap-2 mt-2 flex justify-start items-center flex-col"
                >
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item, index) => (
                      <Draggable
                        key={item.value}
                        draggableId={String(item.value)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`w-[100%] h-[60px] rounded-md ${
                              index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              margin: "5px",
                              cursor: "grab",
                            }}
                          >
                            <div className="w-[100%] h-[100%] flex  gap-4 overflow-hidden justify-start items-center">
                                {/* <img src={img} alt={item.label} className="w-[100px]  object-cover rounded-md" /> */}
                                <div className="w-[100px] h-[100px] bg-gray-700 rounded-md">

                                </div>
                              {item.label}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p>No items selected</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
