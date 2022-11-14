import "./DigitalSubmenus.css";
import img1 from "../../../../assets/images/01.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DigitalSubmenus = (props: any) => {
  const [subMenuList, setSubMenuList] = useState<any[]>([]);

  useEffect(() => {
    if (props.children !== undefined) {
      let array: any[] = [];

      props.children.map((i: any) => {
        const start = i.text.indexOf(":");
        const temp = {
          name: i.text.slice(start + 1),
          code: i.text.slice(0, start),
        };
        array.push(temp);
      });
      setSubMenuList(array);
    }
  }, []);
  return (
    <div className="DSMcontainer dropdown-submenu container">
      {subMenuList.length > 0
        ? subMenuList.map((i, index) => (
            <Link
              to={`/productsList/${i.code}`}
              className="dropdown-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <li>{i.name}</li>
            </Link>
          ))
        : undefined}

      {/* <div className="row">
        <div className="col">
          <ul>
            <li>گوشی</li>
            <li>پرینتر</li>
            <li>نمایشگر</li>
            <li>لپتاپ</li>
            <li>سی پی یو</li>
            <li>کیس</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>گوشی</li>
            <li>پرینتر</li>
            <li>نمایشگر</li>
            <li>لپتاپ</li>
            <li>سی پی یو</li>
            <li>کیس</li>
          </ul>
        </div>
        <div className="col d-flex justify-content-center align-items-center">
          <img src={img1} alt="img" width={150} />
        </div>
      </div> */}
    </div>
  );
};
export default DigitalSubmenus;
