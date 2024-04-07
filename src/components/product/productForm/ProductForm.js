import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <div className="groupImg">
              <label>Image</label>
              <code className="--color-dark">
                Supported Formats: jpg, jpeg, png
              </code>
            </div>

            <div>
              <input
                type="file"
                name="image"
                className="inputFile"
                onChange={(e) => handleImageChange(e)}
              />
              <div>
                {imagePreview != null ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="product" />
                  </div>
                ) : (
                  <p>No image set for this student.</p>
                )}
              </div>


            </div>


          </Card>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Student name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          {/* <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          /> */}

          <label>Gender:</label>
          <input
            type="text"
            placeholder="Male / Female"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
          
          <label>Birthday:</label>
          {/* <input
            type="text"
            placeholder="Age"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          /> */}
          <input
            type="date"
            placeholder="Birthday"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
            className="input-date"
          />

          {/* <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          /> */}

          <label className="--mt">Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;