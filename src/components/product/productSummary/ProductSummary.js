import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { LiaMaleSolid,LiaFemaleSolid } from "react-icons/lia";
import { PiStudentLight } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const studentIcon = <PiStudentLight size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const maleIcon = <LiaMaleSolid size={40} color="#fff" />;
const femaleIcon = <LiaFemaleSolid size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  const maleCount = products.filter(product => product.category === 'Male').length;
  const femaleCount = products.filter(product => product.category === 'Female').length;

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Student Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={studentIcon}
          title={"Total Students"}
          count={products.length}
          bgColor="card1"
        />
        {/* <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        /> */}
        {/* <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        /> */}
        {/* <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        /> */}
        <InfoBox
          icon={maleIcon}
          title={"Males"}
          count={maleCount}
          bgColor="card4"
        />
        <InfoBox
          icon={femaleIcon}
          title={"Females"}
          count={femaleCount}
          bgColor="cardFemale"
        />
      </div>
    </div>
  );
};

export default ProductSummary;