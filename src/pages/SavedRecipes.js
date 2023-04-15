import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {useGetUserID} from "../hooks/useGetUserID"
export default function SavedRecipes() {

  const [savedRecipes,setSavedRecipes]=useState([]);
  const userID=useGetUserID();

  useEffect(()=>{
    
    const fetchSavedRecipe= async ()=>{
      try{
        const response =await axios.get(`https://recipe-api-drab.vercel.app/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    fetchSavedRecipe();

  },[]);
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe)=>(
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className='instruction'>
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time : {recipe.cookingTime}(minutes)</p>
          </li>
        ))}
      </ul>

    </div>
  )
}
