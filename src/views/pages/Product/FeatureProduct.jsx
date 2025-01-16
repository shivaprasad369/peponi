import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function FeatureProduct() {
  document.title = 'Featured Product'
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const queryClient = useQueryClient();
  const [focus,setFocus]=useState(false);
  const {theme} = useSelector((state)=>state.theme);
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products-feature", category],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/feature/features/${category}`
      );
      if (res.status === 200) {
        return res.data.data[0];
      }
      throw new Error("Failed to fetch products");
    },
    enabled: !!category,
  });
  useEffect(() => {
    if(products  && !isLoading){               
      setSelectedItems(products);
      
    }
  }, [products,isLoading]);
 

  const handleSelectChange = async (e) => {
    try{
    const value = parseInt(e.target.value, 10);
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/feature`, {
      FeatureName: category,
      ProductID: e.target.value,
    });
   if(res.status === 200){
    queryClient.invalidateQueries({ queryKey: ["products-feature"] });
    alert("Product added successfully");
   }

  }
  catch(err){
    console.log(err.response.data.message);
    alert(err.response.data.message);
  }

  };
  console.log(selectedItems);
  const handleRemoveItem = async (itemToRemove) => {
  
    console.log(itemToRemove);
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/feature/${itemToRemove}`);
    if(res.status === 200){
      queryClient.invalidateQueries({ queryKey: ["products-feature"] });
      alert("Product removed successfully");
      setFocus(true);
    }
    // setSelectedItems(selectedItems.filter((item) => item.ProductID !== itemToRemove.ProductID));
    // setOptions([...options, itemToRemove]);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedItems = Array.from(selectedItems);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setSelectedItems(reorderedItems);
  };

  useEffect(() => {
    const getFeaturedProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/feature/${category}`);
        if (res.status === 200) {
          setFeaturedProduct(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (category) {
      getFeaturedProduct();
    }
  }, [category]);
  useEffect(() => {
   async function fetchFeaturedProduct(){
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/feature/${category}`);
    if(res.status === 200){
      console.log(res.data.data[0]);
      setOptions(res.data.data[0].filter((option) => !selectedItems.some((selected) => selected.ProductID === option.ProductID)));
    }
   }
   fetchFeaturedProduct();
  }, [featuredProduct,category,selectedItems]);
  
  console.log(selectedItems);
  useEffect(() => {
    const getOptions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/feature`);
        if (res.status === 200) {
          setOptions(res.data.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getOptions();
  }, [category]);

  return (
    <div className={`w-full h-full flex flex-col ${theme === 'dark' ? 'bg-[#373e4dbe] text-white' : 'bg-gray-800 text-white'} justify-start items-start`}>
      <div className="flex mt-2 justify-start px-4 my-3 gap-2 w-full items-center">
        <FaList className="text-2xl font-semibold" />
        <h1 className="text-3xl font-normal">Manage Featured Products</h1>
      </div>
      <div className={`w-[70%] ${theme !== 'dark' ? 'bg-[#212631]' : 'bg-white text-black'} p-4 flex flex-col justify-center items-start`}>
        {/* Category Selection */}
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <label htmlFor="ProductName" className="text-xl font-semibold">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) =>{ setCategory(e.target.value),queryClient.invalidateQueries({ queryKey: ["products-feature"] })}}
            className={`"w-[100%] h-[50px] outline-none border-2 border-gray-300 ${theme !== 'dark' ? 'bg-white text-black' : 'bg-gray-800'} rounded-md p-2`}
          >
            <option value="">Select Category</option>
            <option value={1}>Featured Product</option>
            <option value={2}>Best Selling Product</option>
            <option value={3}>New Arrival Product</option>
          </select>
        </div>
        {category !== 0 && 
          <>
            {/* Products Section */}
            <label htmlFor="ProductName" className="text-xl mt-4 font-semibold">
              Products <span className="text-red-500">*</span>
        </label>
        <div className={`w-full gap-4 mt-2 ${theme !== 'dark' ? 'border-2 border-gray-300 text-black' : 'border-2 border-white text-white'} mb-4 flex justify-start items-center flex-wrap`}>
          {/* DragDropContext for selectedItems */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="selectedItems">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full px-2 gap-1 mt-2 flex justify-start items-center flex-wrap"
                >
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item, index) => (
                      <Draggable key={item.ProductID} draggableId={String(item.ProductID)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`px-2  rounded-[3px] border-[1px] border-[#aaa] bg-[#eee]`}
                            style={{
                              ...provided.draggableProps.style,
                              margin: "5px",
                              cursor: "grab",
                            }}
                          >
                            <div className="w-full h-full flex justify-start items-center">
                              {item.ProductName}{" "}
                              <b
                                style={{
                                  color: "black",
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleRemoveItem(item.FeaturedID)}
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

          {/* Dropdown to select more products */}
          <select
            onChange={handleSelectChange}
            value=""
              className={`inline-block w-[100%] m-2 border-2 border-gray-300 ${theme !== 'dark' ? 'bg-white text-black' : 'bg-gray-800'} rounded-md p-2 outline-none`}
            >
            <option value="" disabled>
              Select an item
            </option>
            {!loading &&
              options.map((option) => (
                <option key={option.ProductID} value={option.ProductID}>
                  {option.ProductName}
                </option>
              ))}
          </select>
        </div>

        {/* Sorting Note */}
        <span className={`text-sm mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-white'} font-bold tracking-wide`}>
          Note: Please drag and drop best-selling products to sort.
        </span>

        {/* Sorting Section for Selected Items */}
        <div className={`w-full gap-2 mt-2 flex justify-start items-center flex-col ${theme !== 'dark' ? 'text-black' : 'text-white'}`}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="selectedItemsSorted">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full gap-2 mt-2 flex justify-start items-center flex-col"
                >
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item, index) => (
                      <Draggable key={item.ProductID} draggableId={String(item.ProductID)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`w-full h-[60px] rounded-md border-[1px] border-gray-300 ${
                              index % 2 === 0 ? "bg-[#E3E3E3]" : "bg-white"
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              margin: "5px",
                              cursor: "grab",
                            }}
                          >
                            <div className="w-full h-full flex gap-4 overflow-hidden justify-start items-center">
                              <div className="w-[100px] h-[100px] bg-gray-700 rounded-md">
                                <img
                                  src={`${import.meta.env.VITE_API_URL}/${item.Image}`}
                                  alt={item.ProductName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {item.ProductName}
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
        </>}
      </div>
    </div>
  );
}
