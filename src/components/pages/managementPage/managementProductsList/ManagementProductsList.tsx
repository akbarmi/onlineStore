import "./ManagementProductsList.css";
import img1 from "../../../../assets/images/01.jpg";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  deleteProduct,
  getAllProducts,
  getProductInfo,
} from "../manageProductsSlice";
import { useEffect, useRef, useState } from "react";
import agent from "../../../../api/Agent";
import DeniReactTreeView from "deni-react-treeview/libs/components";
import { toast } from "react-toastify";
import LoadingComponent from "../../loadingComponent/LoadingComponent";
const DeniReactTreeViews = require("deni-react-treeview");

const ManagementProductsList = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.newProduct.editProductInfo);
  const ImageSelector = useAppSelector((state) => state.uploadedImages);
  const paginitionSelector = useAppSelector((state) => state.newProduct.pages);
  const { current_page, per_page, total, data } = useAppSelector(
    (state) => state.newProduct.allProducts
  );
  const [editedProductId, setEditedProductId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [editPage, setEditPage] = useState(false);
  const [requestedId, setRequestedId] = useState<number>();

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
  const [productsClassification, setProductsClassification] = useState([]);

  const treeviewRef = useRef<DeniReactTreeView>(null);
  const SelectItem = () => {
    const api = treeviewRef.current?.api;
    const selectedItem = api.getSelectedItem();

    if (selectedItem) {
      setCategory(selectedItem.text);
    } else {
      // alert('You have to select a item to remove it');
    }
  };
  const getCategory = async () => {
    const res = await agent.Product.getProductCategory();
    if (res.data) setProductsClassification(res.data);
  };

  useEffect(() => {
    dispatch(getAllProducts("products"));
    getCategory().catch(console.error);
  }, [dispatch]);

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
  }, [
    selector.sale_data,
    selector.inventory,
    selector.unit,
    selector.price,
    selector.size,
    selector.model,
    selector.brand,
    selector.title,
    selector.images,
    selector.category,
    selector.short_images,
  ]);
  const copyMainImageLink = () => {
    if (localStorage.getItem("CopiedImages")) {
      let temp = mainImage.concat(
        JSON.parse(localStorage.getItem("CopiedImages")!)
      );
      setMainImage(temp);
    }
  };
  const copyAllImagesLinks = () => {
    if (localStorage.getItem("CopiedImages")) {
      let temp = allImages.concat(
        JSON.parse(localStorage.getItem("CopiedImages")!)
      );
      setAllImages(temp);
    }
  };

  const deleteProductHandler = async () => {
    const response = await agent.Product.deleteProduct(editedProductId);
    if (response.success) {
      dispatch(deleteProduct(editedProductId));
      toast.success("محصول با موفقیت حذف شد!");
    }
  };
  const getProductHandler = (id: number) => {
    setEditedProductId(id);
    setEditPage(true);
    if (requestedId !== id) {
      dispatch(getProductInfo(id));
      setRequestedId(id);
    }
  };
  const deletefromAllImgHandler = (id: number) => {
    setAllImages((oldstate) => oldstate.filter((i, index) => index !== id));
  };
  const deletefromMainImgHandler = (id: number) => {
    setMainImage((oldstate) => oldstate.filter((i, index) => index !== id));
  };

  const updateProductHandler = async () => {
    setLoading(true);
    const obj = {
      title: productName,
      brand: brand,
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
    const response = await agent.Product.updateProduct(editedProductId, obj);
    if (response.success) {
      setLoading(false);
      toast.success("تغییرات با موفقیت ثبت شد");
    }
  };

  return (
    <>
      {!editPage ? (
        <>
          <div>
            <h6 className="MPLmainTitle border-bottom">لیست محصولات</h6>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center align-items-md-start  border-bottom">
            {data.length > 0 && data[0].id !== 0 ? (
              data.map((i) => (
                <div
                  key={i.id}
                  className="d-flex flex-column justify-content-center align-items-center flex-md-row"
                >
                  <img src={img1} alt="img1" className="MPLImg me-3" />
                  <div className="d-flex flex-column justify-content-center align-items-center align-items-md-start  p-2">
                    <p className="MPLItemTitle">{i.title}</p>
                    <div className="d-flex">
                      <p className="MPLItemSize ">
                        اندازه:
                        <span className="MPLItemSizeQun pe-2 border-end">
                          متوسط
                        </span>
                      </p>
                      <p className="MPLItemSize ps-2">
                        رنگ:
                        <span className="MPLItemSizeQun pe-2 border-end">
                          قرمز آبی
                        </span>
                      </p>
                      <p className="MPLItemPrice ps-2">245000 تومان</p>
                    </div>
                    <div className="d-flex  justify-content-center align-items-center ">
                      <button
                        className="MPLdeleteBtn"
                        title="حذف محصول"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setEditedProductId(i.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        className="MPLEditBtn"
                        title="ویرایش اطلاعات"
                        onClick={() => getProductHandler(i.id)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>در حال بارگذاری ...</h4>
            )}
            {paginitionSelector.length > 1 ? (
              <div className="d-flex justify-content-center w-100 border-top p-3">
                <button
                  className="pagination paginationLR"
                  onClick={() =>
                    dispatch(
                      getAllProducts(`products?page=${current_page - 1}`)
                    )
                  }
                  disabled={current_page === 1 ? true : false}
                >
                  <i className="bi bi-chevron-right paginationIcon "></i>
                </button>
                <>
                  {paginitionSelector.map((i) => (
                    <span
                      key={i}
                      className={
                        current_page === i ? "paginationActive" : "pagination"
                      }
                      onClick={() =>
                        dispatch(getAllProducts(`products?page=${i}`))
                      }
                    >
                      {i}
                    </span>
                  ))}
                </>
                <button
                  className="pagination paginationLR"
                  onClick={() =>
                    dispatch(
                      getAllProducts(`products?page=${current_page + 1}`)
                    )
                  }
                  disabled={
                    current_page === Math.ceil(total / per_page) ? true : false
                  }
                >
                  <i className="bi bi-chevron-left paginationIcon "></i>
                </button>
              </div>
            ) : undefined}
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between border-bottom">
            <h6 className="MPLmainTitle ">ویرایش محصول</h6>
            <i
              className="bi bi-arrow-left-circle-fill fs-3"
              title="برگشت به محصولات"
              onClick={() => setEditPage(false)}
            ></i>
          </div>
          <div className="pb-2 border-bottom">
            <div className="d-flex">
              <i className="bi bi-caret-left-fill"></i>
              <h6 className="MANPtitls">نام محصول</h6>
            </div>
            <input
              type="text"
              // onChange={(e) => setProductName(e.target.value)}
              value={productName}
              className="form-control form-control-sm MANPformStyle inputShadow mb-2"
              disabled
            />
            <div className="d-flex">
              <i className="bi bi-caret-left-fill"></i>
              <h6 className="MANPtitls">برند</h6>
            </div>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
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
            {mainImage.length > 0 ? (
              <>
                <h6 className="MANPtitls">تصاویر موجود</h6>
                <div className="d-flex flex-wrap border-bottom mb-2">
                  {mainImage.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="img-thumbnail d-flex justify-content-center align-items-center MUIimageBorder MPLEMPTY"
                      >
                        <img src={img} alt={"image-" + index} key={img} />
                        <div className="overlay">
                          <i
                            className="bi bi-trash deleteIconOverlay"
                            onClick={() => deletefromMainImgHandler(index)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : undefined}
            <div className="d-flex ">
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
            {allImages.length > 0 ? (
              <>
                <h6 className="MANPtitls">تصاویر موجود</h6>
                <div className="d-flex flex-wrap border-bottom mb-2">
                  {allImages.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="img-thumbnail d-flex justify-content-center align-items-center MUIimageBorder MPLEMPTY"
                      >
                        <img src={img} alt={"image-" + index} key={img} />
                        <div className="overlay">
                          <i
                            className="bi bi-trash deleteIconOverlay"
                            onClick={() => deletefromAllImgHandler(index)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : undefined}

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
              onClick={() => updateProductHandler()}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              ذخیره تغییرات
            </button>
          </div>
        </>
      )}

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
      {/* modal for delete  */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex={-1}
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                حذف محصول
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">آیا مطمئن به حذف کامل کالا هستید؟</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setEditedProductId(0)}
              >
                لغو
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteProductHandler}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagementProductsList;
