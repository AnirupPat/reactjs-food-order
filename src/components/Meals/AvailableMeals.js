import { useEffect, useState } from 'react';
import MealItem from "../Meals/MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async() => {
      setIsLoading(true);
      const response = await fetch('https://react-https-344f0-default-rtdb.firebaseio.com/meals.json');
      const data = await response.json();
      console.log(data);
      const loadedMeals = [];
      for(let key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    
      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    
    
  }, []);

  if(isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
