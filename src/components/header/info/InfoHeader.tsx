import "bootstrap-icons/font/bootstrap-icons.css";
import "./InfoHeader.css";

const InfoHeader = () => {
  return (
    <div className=" container_">
      <div className="container wrapper_ px-3 m-auto">
        <div>
          <i className="bi bi-headset iconPosition"> </i>
          <span>پشتیبانی 44335895 (98+)</span>
        </div>

        <ul className="lists">
          <li className="d-none d-md-inline">
            <a>
              <i className="bi bi-clipboard-heart"> </i>
              <span>علاقمندی&zwnj;ها</span>
            </a>
            <i className="vr verticalLine"></i>
            <a>
              <i className="bi bi-terminal-split"> </i>
              <span> مقایسه (5)</span>
            </a>
          </li>

          <li className="dropdown d-md-none">
            <a
              className="dropdown-toggle textColor"
              data-bs-toggle="dropdown"
              href="#"
            >
              <i className="bi bi-clipboard-heart"></i>
              <i className="vr verticalLine"></i>
              <i className="bi bi-terminal-split me-1"></i>
            </a>

            <ul className="dropdown-menu ">
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-terminal-split"> </i>
                  <span> مقایسه (5)</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-heart"> </i>
                  علاقمندی
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default InfoHeader;
