import "./LoadingComponent.css";

interface Props {
  message?: string;
}

const LoadingComponent = ({ message = "در حال بارگذاری ..." }: Props) => {
  return (
    <div className="LoadingPageSize d-flex flex-column align-items-center justify-content-center ">
      <div
        className="spinner-border ml-auto"
        role="status"
        aria-hidden="true"
      ></div>
      <strong>{message}</strong>
    </div>
  );
};
export default LoadingComponent;
