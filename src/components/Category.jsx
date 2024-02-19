import React, { useEffect, useState } from "react";

import Card from "./Card";
import axios from "axios";
import axiosInstance from "../utils/AxiosInstance";

const Category = ({ category }) => {
  const [categoryData, setCategoryData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(` http://localhost:3000/CategoryData?type=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data, "check");
      setCategoryData(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getData();
    // categoryProducts("mens")
  }, []);

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <h1 className="font-bold text-xl py-5">{category} category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 ">
        {categoryData.map((x) => (
          <Card
            caption={x.caption}
            price={x.price}
            categoryName={x.categoryName}
            key={x.id}
            image={x.image}
          />
        ))}
      </div>
    </div>
  );
};
export default Category;
