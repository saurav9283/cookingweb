import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
import { useGetUserID } from '../hooks/useGetUserID';
import {useNavigate} from 'react-router-dom'

export default function CreateRecipe() {
  const userID=useGetUserID();
  const navigate=useNavigate();
  
  const [cookies,]=useCookies();

  const [recipe,setRecipe]=useState({
    name:"",
    ingredients:[],
    instruction:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID
  });
  const handelChange =(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value});
  }
  const handelIngredientChange =(event,idx)=>{
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[idx]=value;
    setRecipe({...recipe,ingredients});
  }
  
  const addIngredient=()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
  }
  const onSubmit= async (event)=>{
    event.preventDefault();
    try{
      console.log(recipe);
      await axios.post("https://recipe-api-drab.vercel.app/recipes",recipe,{headers:{authorization:cookies.access_token}});
      alert("Recipe Created");
      navigate('/');
    }
    catch(err)
    {
      console.error(err);
    }
  }
  return (
    <div className='create-recipe'>
     <h2> Create Recipe</h2>
     <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id='name' name='name' onChange={handelChange} />
      <label htmlFor="ingredients">Ingredients</label>
      {
        recipe.ingredients.map((ingredient,idx)=>(
          <input
            key={idx}
            type="text"
            name='ingredients'
            value={ingredient}
            onChange={(event)=>handelIngredientChange(event,idx)}
            />
        ))}
      <button onClick={addIngredient} type="button" >Add Ingredient</button>


      <label htmlFor="instruction">Instructions</label>

      <textarea 
        name='instruction' 
        id='instruction'
        onChange={handelChange}
       ></textarea>

      <label htmlFor="imageUrl">Image URL</label>

      <input
       type="text"
       id='imageUrl' 
       name='imageUrl' 
       onChange={handelChange}
       />

      <label htmlFor="cookingTime">Cooking Time (minutes) </label>

      <input 
      type="number" 
      name="cookingTime" 
      id="cookingTime" 
      onChange={handelChange} 
      />
    <button type="submit" > Create Recipe</button>
     </form>
    </div>
  )
}
