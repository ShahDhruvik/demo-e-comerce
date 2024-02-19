import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

import { connect } from "react-redux";
import { categoryProducts, loadProducts } from "../actions/ProductAction";
import { addCart, loadCart } from "../actions/cartAction";
import axiosInstance from "../utils/AxiosInstance";
import  { ReactComponent as Loader } from '../assets/svg/Loader (2).svg'
import ProductNotFound from '../assets/images/Searching.gif'


const ProductPage = ({
  products: { products, loading: productsLoading, error: productsError },
  cart: { cart, loading: cartLoading, error: cartError },
  loadProducts,
}) => {
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [gettingData, setGettingData] = useState([]);

  const onCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory !== "") {
      try {
        const response = await axiosInstance.get(
          `CategoryData?type=${selectedCategory}`
        );
        setGettingData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("sfd");
    }
  };

  const availableCategories = Array.from(
    new Set(products.map((product) => product.type))
  );
  useEffect(() => {
    loadProducts();
  }, []);

  if (productsLoading || cartLoading) {
    return <div className="flex justify-center items-center h-screen">
    <Loader className="mx-auto h-20" />
  </div>
  ;
  }

  // if (productsError || cartError) {
  //   return <h1>{error?.message}</h1>;
  // }
  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const CustomSlider = styled(Slider)`
    && {
      color: #ff5450;

      .MuiSlider-thumb {
        color: #ff5450;
      }

      .MuiSlider-valueLabel {
        background-color: #ff5450;
        color: #fff;
      }

      .MuiSlider-track {
        background-color: #ff5450;
      }

      .MuiSlider-rail {
        background-color: #ccc;
      }
    }
  `;
  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.categoryName &&
      product.categoryName.toLowerCase().startsWith(searchQuery)
  );
  const filteredProduct = filteredProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  const sortedProducts = filteredProduct.slice().sort((a, b) => {
    if (sortOption === "atoz") {
      return a.categoryName.localeCompare(b.categoryName);
    } else if (sortOption === "hightolow") {
      return b.price - a.price;
    } else if (sortOption === "lowtohigh") {
      return a.price - b.price;
    } else {
      return 0; 
    }
  });

  const displayedProducts = selectedCategory
    ? sortedProducts.filter((product) => product.type === selectedCategory)
    : sortedProducts;

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-7  justify-evenly px-5">
        <div className="mb-4">
          <label htmlFor="sortOption" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortOptionChange}
            className="p-2 border w-full border-gray-300 rounded"
          >
            <option value="">None</option>
            <option value="atoz">A to Z</option>
            <option value="hightolow">Price High to Low</option>
            <option value="lowtohigh">Price Low to High</option>
          </select>
        </div>

        <div className="">
          <div className="mb-4">
            <label htmlFor="priceRange" className="mr-2">
              Price Range: <span className="font-bold"> Select the range</span>
            </label>
            <CustomSlider
              id="priceRange"
              value={[minPrice, maxPrice]}
              onChange={handlePriceChange}
              defaultValue={1000}
              min={0}
              marks
              max={1000}
              step={100}
              valueLabelDisplay="auto"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="searchQuery" className="mr-2">
            Search:
          </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="p-2 border w-full border-gray-300 rounded"
            placeholder="search any items..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryOption" className="mr-2">
            Category:
          </label>
          <select
            id="categoryOption"
            value={selectedCategory}
            onChange={onCategoryChange}
            className="p-2 border w-full border-gray-300 rounded"
          >
            <option value="">All</option>
            {availableCategories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 px-2 mx-auto md:gap-6">
        {displayedProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          displayedProducts.map((product) => (
            <Card
              price={product.price}
              categoryName={product.categoryName}
              caption={product.caption}
              key={product.id}
              image={product.image}
              btn={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => loadProducts()(dispatch),
    loadCart: () => loadCart()(dispatch),
    addCart: (data) => addCart(data)(dispatch),
    categoryProducts: (category) => dispatch(categoryProducts(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
