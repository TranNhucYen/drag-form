export type FieldProps = {
  label?: string;
  value?: string;
  width?: number;
  height?: number;
};

export type FieldComponent = (props: FieldProps) => React.ReactNode;
