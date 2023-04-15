import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useGetUserID} from "../hooks/useGetUserID"
export default function Home() {

  const [recipes,setRecipes]=useState([]);
  const [savedRecipes,setSavedRecipes]=useState([]);
  const [cookies,]=useCookies();
  const userID=useGetUserID();

  useEffect(()=>{
    const fetchRecipe= async ()=>{
      try{
        const response =await axios.get("https://recipe-api-drab.vercel.app/recipes");
        setRecipes(response.data);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    const fetchSavedRecipe= async ()=>{
      try{
        const response =await axios.get(`https://recipe-api-drab.vercel.app/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    fetchRecipe();
    if(cookies.access_token) fetchSavedRecipe();

  },[]);

  const saveRecipe= async (recipeID)=>{
    try{
      const response =await axios.put("https://recipe-api-drab.vercel.app/recipes",{recipeID,userID},{headers:{authorization:cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes)
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const isRecipeSaved=(id)=> savedRecipes.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe)=>(
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={()=> saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                { isRecipeSaved(recipe._id)? "Saved":"Save"}
                </button>
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
