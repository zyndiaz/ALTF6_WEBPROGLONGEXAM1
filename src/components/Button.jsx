import { Link } from "react-router-dom";

const variantClasses = {
  primary: "bg-blue-900 text-amber-300 hover:bg-blue-800",
  secondary: "bg-blue-50 text-blue-900 hover:bg-blue-100",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
  onClick,
  disabled = false,
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 border-blue-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
