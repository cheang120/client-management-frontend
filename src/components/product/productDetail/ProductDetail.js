import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SET_LOGIN, selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import { getLoginStatus } from "../../../services/authService";
import { toast } from "react-toastify";
import {useReactToPrint} from "react-to-print"
import { AiOutlineEye } from "react-icons/ai";

const ProductDetail = () => {
    const componentPDF = useRef()  

    const useRedirectLoggedOutUser = (path) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
      
        useEffect(() => {
          const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();
            dispatch(SET_LOGIN(isLoggedIn));
      
            if (!isLoggedIn) {
              toast.info("Session expired, please login to continue.");
              navigate(path);
              return;
            }
          };
          redirectLoggedOutUser();
        }, [navigate, path, dispatch]);
    };
    useRedirectLoggedOutUser("/login");

    const dispatch = useDispatch();

    const {id} = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isLoading, isError, message } = useSelector(
      (state) => state.product
    );

    const stockStatus = (quantity) => {
        if (quantity > 0) {
            return <span className="--color-success">In Stock</span>
        }
        return <span className="--color-danger">Out of Stock</span>

    }
  
    useEffect(() => {
      if (isLoggedIn === true) {
        dispatch(getProduct(id));
        // console.log(product);
      }
  
      if (isError) {
        console.log(message);
      }
    }, [isLoggedIn, isError, message, dispatch]);

    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle:"Userdata",
      onAfterPrint:()=>alert("Data saved in PDF")
    })

  return (
    <div className="product-detail">

        <div ref={componentPDF} style={{width:'90%', marginLeft:"3rem"}}>
        <h3 className="--mt formTitle">申請表</h3>

        <div className="head">
          <div className="headDetail">
            <p><b>姓名：</b><span>{product.name}</span></p>
            <p><b>姓別：</b><span>{product.category}</span></p>
            <p><b>出生日期：</b><span>{product.price}</span></p>
          </div>
          <div className="img">
            {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                  width={"60%"}
                  height={"100%"}
                />
                ) : (
                  <p>No image set for this student!</p>
            )}
          </div>
        </div>

          <Card cardClass="card">
              {isLoading && <SpinnerImg/>}
              {product && (
                  <div className="detail">
                  {/* <div
                      dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(product.description),
                      }}
                  ></div>
                  <hr /> */}
                    <code className="--color-dark">
                      Created on: {product.createdAt.toLocaleString("en-US")}
                    </code>
                  <br />
                    <code className="--color-dark">
                      Last Updated: {product.updatedAt.toLocaleString("en-US")}
                    </code>
                  </div>
              )}
          </Card>
        </div>

        <div className="pdfButtonUlter">
          <button className="pdfButton" onClick={generatePDF}>PDF</button>
        </div>

    </div>
  )
}

export default ProductDetail
