const VARIANTS = {
  primary: "btn primary",
  warn: "btn warn",
  ghost: "btn ghost",
  default: "btn",
};

export function Button({
  variant = "default",
  type = "button",
  children,
  ...props
}) {
  return (
    <button type={type} className={VARIANTS[variant] ?? VARIANTS.default} {...props}>
      {children}
    </button>
  );
}
