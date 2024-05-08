import React from "react";

function Categories({ categoryId, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, categoryIndex) => (
          <li
            key={categoryIndex}
            onClick={() => onClickCategory(categoryIndex)}
            className={categoryId === categoryIndex ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
