import React from "react";

interface ICategoriesProps {
  valueId: number;
  onChangeCategory: any;
}

const Categories: React.FC<ICategoriesProps> = ({ valueId, onChangeCategory }) => {
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
            onClick={() => onChangeCategory(categoryIndex)}
            className={valueId === categoryIndex ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
