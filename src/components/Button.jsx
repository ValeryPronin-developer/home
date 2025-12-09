import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const variants = {
  primary:
    "bg-base text-white hover:bg-[#243030] shadow-sm transition-colors",
  ghost:
    "border border-base text-base hover:bg-sage/60 transition-colors bg-white",
};

export default function Button({ children, to, href, type = "button", variant = "primary", className = "", ...rest }) {
  const classes = `inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "ghost"]),
  className: PropTypes.string,
};

