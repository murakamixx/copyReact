interface Button {
  title?: string;
  onClick?(): void;
  url?: string;
  className?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}
export const Button = ({
  title,
  onClick,
  url,
  className,
  type,
  disabled = false,
}: Button) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <img src={url} />
      {title}
    </button>
  );
};
