import PropTypes from "prop-types";

export default function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage/70">
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

