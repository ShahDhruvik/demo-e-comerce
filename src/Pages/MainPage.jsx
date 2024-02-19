import React from "react";

import Footer from "./Footer";
import CarousalLayout from "../components/CarousalLayout";
import Category from "../components/Category";
import Card2 from "../components/Card2";
import Card3 from "../components/Card3";
import StayUpdated from "../components/StayUpdated";
import FindUs from "../components/Find Us";

const MainPage = () => {
  return (
    <div>
      <CarousalLayout />
      <Category category={"mens"} />
      <Card2 />
      <Category category={"Women"} />
      <Card3 />
      <StayUpdated />
      <FindUs />
      <Footer />
    </div>
  );
};

export default MainPage;
