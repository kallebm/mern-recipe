import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("userID");
    setCookies("access_token", "");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/create-recipe"}>Create Recipe</Link>

      {cookies.access_token && <Link to={"/saved-recipes"}>Saved Recipes</Link>}
      {!cookies.access_token ? (
        <Link to={"/auth"}>Login/Register</Link>
      ) : (
        <button onClick={() => logout()}>Logout</button>
      )}
    </div>
  );
};
