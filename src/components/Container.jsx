/* eslint-disable react/prop-types */

const Container = ({ text, additionalStyles }) => {
  return <span className={`${additionalStyles} font-semibold`}>{text}</span>;
};

export default Container;
