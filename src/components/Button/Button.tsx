import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";
function Button({
  children,
  action,
  type,
}: {
  children: string;
  type: "primary" | "back" | "position";
  action?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.btn} ${type ? styles[type] : ""}`}
      onClick={() => {
        if (action) action();
        if (type === "back") navigate(-1);
      }}
    >
      {children}
    </button>
  );
}

export default Button;
