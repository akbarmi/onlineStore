import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DropdownMainMenu.css";
import DigitalSubmenus from "./subMenus/DigitalSubmenus";

const DropdownMainMenu = (props: any) => {
  const [menuList, setMenuList] = useState<any[]>([]);

  useEffect(() => {
    if (props.list !== undefined) {
      let array: any[] = [];

      props.list.map((i: any) => {
        const start = i.text.indexOf(":");
        const temp = {
          name: i.text.slice(start + 1),
          code: i.text.slice(0, start),
          children: i.children ? i.children : undefined,
        };
        array.push(temp);
      });
      setMenuList(array);
    }
  }, [props.list]);

  return (
    <ul className="dropdown-menu DMMlist">
      {menuList.length > 0
        ? menuList.map((i, index) => (
            <Link
              to={`/productsList/${i.code}`}
              className="dropdown-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <li>{i.name}</li>
              {i.children !== undefined ? (
                <>
                  <i className="bi bi-caret-left-fill arrowLeft"></i>
                  <DigitalSubmenus children={i.children} />
                </>
              ) : undefined}
            </Link>
          ))
        : undefined}

      {/* <Link
        to={"/basket"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-laptop"></i>
          کالای دیجیتالی
        </li>
        
        <DigitalSubmenus />
      </Link>
      <Link
        to={"/basket"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-laptop"></i>
          مد و پوشاک
        </li>
        <i className="bi bi-caret-left-fill arrowLeft"></i>
      </Link>
      <Link
        to={"/basket"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-hammer"></i>
          تجهیزات صنعتی
        </li>
        <i className="bi bi-caret-left-fill arrowLeft"></i>
      </Link>
      <Link
        to={"/basket"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-lamp"></i>
          لوازم آشپزخانه
        </li>
        <i className="bi bi-caret-left-fill arrowLeft"></i>
      </Link>
      <Link
        to={"/basket"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-laptop"></i>
          زیبایی و سلامت
        </li>
        <i className="bi bi-caret-left-fill arrowLeft"></i>
      </Link>
      <Link
        to={"/basket"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-bicycle"></i>
          سفر و ورزش
        </li>
        <i className="bi bi-caret-left-fill arrowLeft"></i>
      </Link>
      <Link
        to={"/"}
        className="dropdown-item d-flex justify-content-between align-items-center"
      >
        <li>
          <i className="bi bi-laptop"></i>
          کودک و اسباب بازی
        </li>
        <i className="bi bi-caret-left-fill arrowLeft"></i>
      </Link> */}

      {/* <li>
        <Link to={"/"} className="dropdown-item">
          <i className="bi bi-laptop"></i>
          مد و پوشاک
        </Link>
      </li>

      <li>
        <Link to={"/"} className="dropdown-item">
          <i className="bi bi-hammer"></i>
          تجهیزات صنعتی
        </Link>
      </li>

      <li>
        <Link to={"/"} className="dropdown-item">
          <i className="bi bi-lamp"></i>
          لوازم آشپزخانه
        </Link>
      </li>

      <li>
        <Link to={"/"} className="dropdown-item">
          <i className="bi bi-laptop"></i>
          زیبایی و سلامت
        </Link>
      </li>

      <li>
        <Link to={"/"} className="dropdown-item">
          <i className="bi bi-bicycle"></i>
          سفر و ورزش
        </Link>
      </li>

      <li>
        <Link to={"/"} className="dropdown-item">
          <i className="bi bi-laptop"></i>
          کودک و اسباب بازی
        </Link>
      </li> */}
    </ul>
  );
};
export default DropdownMainMenu;
