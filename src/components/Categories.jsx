import React, { useState } from "react";


function Categories() {
  const [activeIndexCategory, setActiveIndexCategory] = useState(0)

  const onClickCategory = (index) => {
    setActiveIndexCategory(index)
  }

  return (
    <div className="categories">
      <ul>
        <li onClick={() => onClickCategory(0)}  className={activeIndexCategory === 0 ? "active" : ""}>Все</li>
        <li onClick={() => onClickCategory(1)} className={activeIndexCategory === 1 ? "active" : ""}>Мясные</li>
        <li onClick={() => onClickCategory(2)} className={activeIndexCategory === 2 ? "active" : ""}>Вегетарианская</li>
        <li onClick={() => onClickCategory(3)} className={activeIndexCategory === 3 ? "active" : ""}>Гриль</li>
        <li onClick={() => onClickCategory(4)} className={activeIndexCategory === 4 ? "active" : ""}>Острые</li>
        <li onClick={() => onClickCategory(5)} className={activeIndexCategory === 5 ? "active" : ""}>Закрытые</li>
      </ul>
    </div>
  );
}

export default Categories;
