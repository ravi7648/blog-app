export default function Badge({
  hidden,
  label,
  className,
}: {
  hidden: boolean;
  label: string;
  className?: string;
}) {
  return (
    <>
      <style>
        {`
          .badge-secondary {
            color: #fff;
            background-color: #6c757d;
          }
          .badge-alert {
            color: #fff;
            background-color: #dc3545;
          }
        `}
      </style>
      {hidden && (
        <span className={"ms-2 badge badge-secondary " + className}>
          {label}
        </span>
      )}
    </>
  );
}
