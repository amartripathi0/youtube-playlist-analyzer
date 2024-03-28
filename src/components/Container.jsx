/* eslint-disable react/prop-types */

const Container = ({text , styles }) => {
  return (
    <span
    className={`${styles} font-semibold`}>{text}</span>
  ) 
}

export default Container
