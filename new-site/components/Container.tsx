type SemiboldSpanContainerProps = {
  text: string;
  additionalStyles?: string; 
};

const SemiboldSpanContainer = ({
  text,
  additionalStyles,
}: SemiboldSpanContainerProps) => {
  return <span className={`${additionalStyles} font-medium`}>{text}</span>;
};

export default SemiboldSpanContainer;
