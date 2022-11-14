interface Props {
  id: string;
  name: string;
  handleClick: (e: any) => void;
  isChecked: boolean;
}

const Checkbox = ({ id, name, handleClick, isChecked }: Props) => {
  return (
    <input
      className="rememberMe"
      id={id}
      name={name}
      type="checkbox"
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default Checkbox;
