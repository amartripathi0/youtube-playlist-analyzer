const SemiboldSpanContainer = ({ text, additionalStyles }) => {
  return <span className={`${additionalStyles} font-medium`}>{text}</span>;
};

export default SemiboldSpanContainer;
