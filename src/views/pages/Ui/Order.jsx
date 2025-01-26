import React from "react";

const Orders = () => {
  const orders = [
    {
      image: "/images/products/21.png",
      product: "Sojos Crunchy Natural Grain Free...",
      customer: "John Doe",
      price: "$15.99",
      deliveryDate: "20 Nov 2023",
    },
    {
      image: "/images/products/22.png",
      product: "Kristin Watson",
      customer: "Jane Smith",
      price: "$25.50",
      deliveryDate: "20 Nov 2023",
    },
    {
      image: "/images/products/23.png",
      product: "Mega Pumpkin Bone",
      customer: "Alice Johnson",
      price: "$12.75",
      deliveryDate: "20 Nov 2023",
    },
    {
      image: "/images/products/24.png",
      product: "Cloud Star Dynamo Dog Hip & Joint...",
      customer: "Mark Brown",
      price: "$19.99",
      deliveryDate: "20 Nov 2023",
    },
    {
      image: "/images/products/25.png",
      product: "What to Give a Constipated Dog?",
      customer: "Lucy Green",
      price: "$18.00",
      deliveryDate: "20 Nov 2023",
    },
  ];

  return (
    <div className="bg-white p-4 w-full overflow-x-auto shadow rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Orders</h5>
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            type="button"
          >
            <i className="icon-more-horizontal"></i>
          </button>
        </div>
      </div>
      <div className="overflow-scroll border rounded-lg">
        <ul className="flex text-gray-700 text-center bg-gray-100 p-2">
          <li className="flex-1 font-medium">Product</li>
          <li className="flex-1 font-medium">Customer</li>
          <li className="flex-1 font-medium">Price</li>
          <li className="flex-1 font-medium">Delivery Date</li>
        </ul>
        <div className="divide-y">
          {orders.map((order, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-gray-50">
              <div className="w-16 h-16 flex-shrink-0 bg-slate-400">
                {/* <img className="w-full h-full object-cover rounded" src={order.image} alt={order.product} /> */}
              </div>
              <div className="flex flex-1 items-center gap-4 ml-4">
                <a href="/product-list" className="flex-1 text-sm font-medium text-blue-600 hover:underline">
                  {order.product}
                </a>
                <span className="flex-1 text-sm text-gray-500">{order.customer}</span>
                <span className="flex-1 text-sm text-gray-500">{order.price}</span>
                <span className="flex-1 text-sm text-gray-500">{order.deliveryDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;