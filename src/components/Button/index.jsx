import "./styles.css";
import P from "prop-types";

export const Button = ({ text, click, disabled = false }) => (
  <button className="button" onClick={click} disabled={disabled}>
    {text}
  </button>
);

Button.defaultProps = {
  disable: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  click: P.func,
  disabled: P.bool,
};
