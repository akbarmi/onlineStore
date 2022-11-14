import { useEffect, useRef, useState } from "react";
import "./ManagementAddNewProduct.css";
import DeniReactTreeView from "deni-react-treeview/libs/components/index";
// import { productsClassification } from "../../../../models/productsClassification";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { setAllNewProductInfo } from "../manageProductsSlice";
import agent from "../../../../api/Agent";
import { toast } from "react-toastify";
// import DeniReactTreeViews from "deni-react-treeview";
const DeniReactTreeViews = require("deni-react-treeview");

const ManagementAddNewProduct = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.newProduct.newProductInfo);
  const ImageSelector = useAppSelector((state) => state.uploadedImages);
  const [productsClassification, setProductsClassification] = useState([]);

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");
  const [inventory, setInventory] = useState(0);
  const [saleData, setSaleData] = useState("");
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [disableBtn, setdisableBtn] = useState(true);

  const treeviewRef = useRef<DeniReactTreeView>(null);
  const SelectItem = () => {
    const api = treeviewRef.current?.api;
    const selectedItem = api.getSelectedItem();

    if (selectedItem) {
      const indexof = selectedItem.text.indexOf(":");
      setCategory(selectedItem.text.slice(0, indexof));
    } else {
      // alert('You have to select a item to remove it');
    }
  };

  const copyMainImageLink = () => {
    // setMainImage(ImageSelector.copiedImagesLink);
    if (localStorage.getItem("CopiedImages")) {
      setMainImage(JSON.parse(localStorage.getItem("CopiedImages")!));
    }
  };
  const copyAllImagesLinks = () => {
    // setAllImages(ImageSelector.copiedImagesLink);
    if (localStorage.getItem("CopiedImages")) {
      setAllImages(JSON.parse(localStorage.getItem("CopiedImages")!));
    }
  };
  const getCategory = async () => {
    const res = await agent.Product.getProductCategory();
    if (res.data) setProductsClassification(res.data);
  };
  useEffect(() => {
    setProductName(selector.title);
    setBrand(selector.brand);
    setModel(selector.model);
    setSize(selector.size);
    setPrice(selector.price);
    setUnit(selector.unit);
    setInventory(selector.inventory);
    setSaleData(selector.sale_data);
    setCategory(selector.category);
    setMainImage(selector.short_images);
    setAllImages(selector.images);

    getCategory().catch(console.error);
  }, []);

  useEffect(() => {
    const newObj = {
      title: productName,
      brand: brand,
      type: "",
      model: model,
      size: size,
      price: price,
      unit: unit,
      inventory: inventory,
      sale_data: saleData,
      short_images: mainImage,
      images: allImages,
      category: category,
    };
    dispatch(setAllNewProductInfo(newObj));
    // if (
    //   productName !== "" &&
    //   brand !== "" &&
    //   model !== "" &&
    //   size > 0 &&
    //   price > 0 &&
    //   inventory >= 0 &&
    //   category !== "" &&
    //   mainImage !== [] &&
    //   allImages !== []
    // ) {
    //   setdisableBtn(false);
    // } else {
    //   setdisableBtn(true);
    // }
  }, [
    productName,
    brand,
    model,
    size,
    price,
    unit,
    inventory,
    saleData,
    category,
    mainImage,
    allImages,
  ]);

  const storeNewProductinServerHandler = async () => {
    setLoading(true);
    const obj = {
      title: productName,
      brand: brand,
      type: "12",
      model: model,
      size: size,
      price: price,
      unit: unit,
      inventory: inventory,
      sale_data: saleData,
      short_images: JSON.stringify(mainImage),
      images: JSON.stringify(allImages),
      category: category,
    };
    const response = await agent.Product.addNewProduct(obj).catch(() =>
      setLoading(false)
    );
    if (response.success) {
      setLoading(false);
      toast.success("محصول با موفقیت ثبت شد");
    }
  };
  return (
    <>
      <div>
        <h6 className="MANPmainTitle border-bottom">محصول جدید</h6>
      </div>
      <div>
        <div className="pb-2 border-bottom">
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">نام محصول</h6>
          </div>
          <input
            type="text"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">برند</h6>
          </div>
          <input
            onChange={(e) => setBrand(e.target.value)}
            type="text"
            value={brand}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">مدل</h6>
          </div>
          <input
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={model}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">اندازه</h6>
          </div>
          <input
            type="number"
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">قیمت</h6>
          </div>
          <input
            type="number"
            onChange={(e) => setPrice(parseInt(e.target.value))}
            value={price}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">واحد</h6>
          </div>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">موجودی</h6>
          </div>
          <input
            type="number"
            onChange={(e) => setInventory(parseInt(e.target.value))}
            value={inventory}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">درصد تخفیف</h6>
          </div>
          <input
            type="text"
            value={saleData}
            onChange={(e) => setSaleData(e.target.value)}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">
              لینک تصویر اصلی (لینک از قسمت بارگذاری تصویر کپی شود)
            </h6>
          </div>
          <div className="d-flex align-items-center mb-2 ">
            <i
              className="bi bi-clipboard2-plus me-2 cursorPointer"
              onClick={() => copyMainImageLink()}
            ></i>
            <input
              type="text"
              value={mainImage}
              className="form-control form-control-sm MANPformStyle inputShadow "
              disabled
            />
          </div>
          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">
              لینک تصاویر جزئیات محصول (لینکها از قسمت بارگذاری تصویر کپی شود)
            </h6>
          </div>
          <div className="d-flex align-items-center mb-2 ">
            <i
              className="bi bi-clipboard2-plus me-2 cursorPointer"
              onClick={() => copyAllImagesLinks()}
            ></i>
            <input
              type="text"
              value={allImages}
              className="form-control form-control-sm MANPformStyle inputShadow mb-2"
              disabled
            />
          </div>

          <div className="d-flex">
            <i className="bi bi-caret-left-fill"></i>
            <h6 className="MANPtitls">دسته بندی</h6>
            <button
              className="btn MANPClasificationbtn"
              data-bs-toggle="modal"
              data-bs-target="#classificationModal"
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          </div>
          <input
            disabled
            type="text"
            value={category}
            className="form-control form-control-sm MANPformStyle inputShadow mb-2"
          />
          <button
            type="submit"
            className="btn btn-sm buttonStyle my-2"
            // disabled={disableBtn}
            onClick={() => storeNewProductinServerHandler()}
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            ذخیره محصول
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="classificationModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                دسته&zwnj;بندی کالاها
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <div dir="ltr">
                <DeniReactTreeViews
                  ref={treeviewRef}
                  showIcon={false}
                  items={productsClassification}
                />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                بستن
              </button>
              <button
                type="button"
                className="btn btn-sm MANPbuttonStyle"
                onClick={() => SelectItem()}
                data-bs-dismiss="modal"
              >
                انتخاب دسته
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagementAddNewProduct;
