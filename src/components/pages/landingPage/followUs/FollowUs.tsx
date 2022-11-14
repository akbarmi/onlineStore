import "./FollowUs.css";

const FollowUs = () => {
  return (
    <div className="container2_ row row-cols-1 row-cols-md-2 px-0 mx-0">
      <div className="instagram p-0 m-0 d-flex flex-column justify-content-center align-items-center">
        <i className="bi bi-instagram instagramIcon"></i>
        <p>ما را در اینستاگرام دنبال کنید</p>
      </div>
      <div className="twitter p-0 m-0 d-flex flex-column justify-content-center align-items-center">
        <i className="bi bi-twitter twitterIcon"></i>
        <p>ما را در تویتتر دنبال کنید</p>
      </div>
    </div>
  );
};
export default FollowUs;
