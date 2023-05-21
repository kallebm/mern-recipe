import axios from "axios";
import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setRecipe({ ...recipe, [name]: value });
    console.log(recipe);
  };

  const handleIngredientChange = (ev, i) => {
    const { value } = ev.target;
    const ingredients = recipe.ingredients;
    ingredients[i] = value;
    setRecipe({ ...recipe, ingredients });
    console.log(recipe);
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />

        <label htmlFor="ingredients">Ingredients</label>
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        {recipe.ingredients.map((ingredient, i) => (
          <input
            key={i}
            type={"text"}
            value={ingredient}
            onChange={(ev) => handleIngredientChange(ev, i)}
          />
        ))}

        <label htmlFor="instructions">Instructions</label>
        <textarea
          type="text"
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking TIme (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
