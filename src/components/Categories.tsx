import React from "react";

interface ICategoriesProps {
  valueId: number;
  onChangeCategory: (id: number) => void;
}
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<ICategoriesProps> = React.memo(
  ({ valueId, onChangeCategory }) => {
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
  }
);

export default Categories;
