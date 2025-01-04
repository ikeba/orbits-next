interface FlexWrapProps {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "column";
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export default function FlexWrap({
  children,
  className,
  direction = "row",
  justify = "start",
  align = "start",
  wrap = "wrap",
}: FlexWrapProps) {
  const directionClass = {
    row: "tw-flex-row",
    column: "tw-flex-col",
  };

  const justifyClass = {
    start: "tw-justify-start",
    end: "tw-justify-end",
    center: "tw-justify-center",
    "space-between": "tw-justify-between",
    "space-around": "tw-justify-around",
    "space-evenly": "tw-justify-evenly",
  };

  const alignClass = {
    start: "tw-items-start",
    end: "tw-items-end",
    center: "tw-items-center",
    stretch: "tw-items-stretch",
    baseline: "tw-items-baseline",
  };

  const wrapClass = {
    wrap: "tw-flex-wrap",
    nowrap: "tw-flex-nowrap",
    "wrap-reverse": "tw-flex-wrap-reverse",
  };

  const compiledClassName = `tw-flex ${directionClass[direction]} ${justifyClass[justify]} ${alignClass[align]} ${wrapClass[wrap]} ${className}`;

  return <div className={compiledClassName}>{children}</div>;
}
