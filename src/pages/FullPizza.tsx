import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface IPizza {
  imageUrl: string;
  title: string;
  price: number;
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<IPizza>();
  const { id } = useParams(); // передаем хуку динамичный элемент url адреса

  // внутри useEffetc создаем асинхронную функцию с запросом пиццы по id
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6630dd5dc92f351c03db6116.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
      }
    }
    fetchPizza();
  }, [id]);

  // условный рендер, пока ждем пиццу с бэка
  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={"PizzaPicture"} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
