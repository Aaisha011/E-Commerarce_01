// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         let response = await fetch(`http://localhost:3000/cards/cards/${id}`);
//         let res = await response.json();
//         console.log(res);

//         setProduct(res);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     }
//     fetchProduct();
//   }, [id]);

//   // Delete function
//   const handleDelete = async () => {
//     try {
//       await fetch(`http://localhost:3000/cards/cards/${id}`, {
//         method: "DELETE",
//       });
//       alert("Product deleted successfully");
//       navigate("/Card"); // Adjust this path based on your route for products list
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete the product");
//     }
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="flex justify-center mt-14 text-white">
//       <div className="flex items-center justify-center h-auto w-[50vw] bg-slate-600 rounded-lg shadow-lg shadow-black">
//         <div className="flex flex-col items-center justify-center ">
//           <img
//             src={`http://localhost:3000/uploads/${product.image}`}
//             alt={product.title}
//             className="w-38 m-7 object-cover"
//           />
//           <div className="m-7">
//             <h1 className="font-bold text-xl text-center mb-2">
//               {product.title}
//             </h1>
//             <p className="font-bold text-center mb-2">{product.category}</p>
//             <p className="text-center mb-2">${product.price}</p>
//             <p className="text-center mb-3">{product.description}</p>
//             <p className="text-center mb-3">{product.categoryID}</p>
//             <p className="text-center mb-3">{product.}</p>
//             {/* Uncomment if rating info is needed */}
//             {/* <div className="text-sm">
//               <p>Rating: {product.rating.rate} / 5</p>
//               <p>({product.rating.count} reviews)</p>
//             </div> */}
//             <button
//               onClick={() => navigate(`/update/${product.id}`)}
//               className="h-[5vh] w-[7vw] m-3 bg-blue-700 hover:bg-blue-900 hover:text-white cursor-pointer hover:scale-105 active:bg-green-800 text-black rounded-md"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="h-[5vh] w-[9vw] m-3 bg-red-700 hover:bg-red-900 hover:text-white cursor-pointer hover:scale-105 active:bg-red-800 text-black rounded-md"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        let response = await fetch(`http://localhost:3000/cards/cards/${id}`);
        let res = await response.json();
        console.log(res);

        setProduct(res);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  // Delete function
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/cards/cards/${id}`, {
        method: "DELETE",
      });
      alert("Product deleted successfully");
      navigate("/Card"); // Adjust this path based on your route for products list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex justify-center mt-14 text-white ">
      <div className="flex items-center justify-center sm:h-auto sm:w-auto md:w-auto md:h-auto lg:h-62 lg:w-92 bg-slate-600 rounded-lg shadow-lg shadow-black mt-0 sm:m-11">
        <div className="flex flex-row items-center justify-center h-auto">
          <div className="flex lg:flex-row">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.title}
              className="flex justify-center items-center w-72 sm:m-11 object-cover rounded-lg shadow-md shadow-white"
            />
            <div className="m-7 flex flex-col items-start">
              <h1 className="text-lg text-center mb-2">
                <span className="font-semibold text-xl text-black">
                  Title:{" "}
                </span>
                {product.title}
              </h1>
              <p className="text-center mb-2">
                <span className="font-semibold text-xl items-start text-black">
                  Category:{" "}
                </span>
                {product.Category.name || "Unknown Category"}
              </p>
              <p className="text-center mb-2">
                <span className="font-semibold text-xl text-black">
                  Price:{" "}
                </span>
                ${product.price}
              </p>
              <p className="text-center mb-3 md:flex justify-start">
                <span className="font-semibold text-xl text-black ">
                  Description:{" "}
                </span>
                {product.description}
              </p>
              {/* <p className="text-center mb-4">
                <span className="font-semibold text-xl text-black">
                  Title:{" "}
                </span>
              </p> */}
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={() => navigate(`/update/${product.id}`)}
                  className="h-[7vh] w-[15vw] m-3 bg-blue-700 hover:bg-blue-900 hover:text-white cursor-pointer hover:scale-105 active:bg-green-800 text-black rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="h-[7vh] w-[15vw] m-3 bg-red-700 hover:bg-red-900 hover:text-white cursor-pointer hover:scale-105 active:bg-red-800 text-black rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
