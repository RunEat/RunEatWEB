import Mealtype from "./Mealtype";
import React, { useEffect, useState } from "react";
import {
  getBreakfast,
  getDinner,
  getLunch,
  getSnacks,
} from "../../../services/RecipeService";
import { useDate } from "../../../hooks/useDateContext";
import { addMeal, editMeal, getMeal } from "../../../services/MealService";
import { getStoredDate } from "../../../store/DateStore";
import SyncLoader from "react-spinners/SyncLoader";
import "./Menu.css";

const Menu = ({ meal, setMeal }) => {
  const { date, setDate } = useDate();
  //console.log('meal', meal)

  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [dinner, setDinner] = useState();
  const [snacks, setSnacks] = useState();

  const [search, setSearch] = useState({
    search: {
      breakfast: "",
      lunch: "",
      dinner: "",
      snacks: "",
    },
    show: false,
  });

  useEffect(() => {
    getBreakfast(search.search.breakfast).then((recipes) => {
      setBreakfast(recipes);
    });
    getLunch(search.search.lunch).then((recipes) => {
      setLunch(recipes);
    });
    getDinner(search.search.dinner).then((recipes) => {
      setDinner(recipes);
    });
    getSnacks(search.search.snacks).then((recipes) => {
      setSnacks(recipes);
    });
  }, []);

  const onSubmitBreakfast = (e) => {
    e.preventDefault();

    setSearch((prevState) => ({
      ...prevState,
      show: true,
    }));

    getBreakfast(search.search.breakfast)
      .then((recipes) => {
        setBreakfast(recipes);
      })
      .finally(() =>
        setSearch((prevState) => ({
          ...prevState,
          show: false,
        }))
      );
  };

  const onSubmitLunch = (e) => {
    e.preventDefault();

    setSearch((prevState) => ({
      ...prevState,
      show: true,
    }));

    getLunch(search.search.lunch)
      .then((recipes) => {
        setLunch(recipes);
      })
      .finally(() =>
        setSearch((prevState) => ({
          ...prevState,
          show: false,
        }))
      );
  };

  const onSubmitDinner = (e) => {
    e.preventDefault();

    setSearch((prevState) => ({
      ...prevState,
      show: true,
    }));

    getDinner(search.search.dinner)
      .then((recipes) => {
        setDinner(recipes);
      })
      .finally(() =>
        setSearch((prevState) => ({
          ...prevState,
          show: false,
        }))
      );
  };

  const onSubmitSnacks = (e) => {
    e.preventDefault();

    setSearch((prevState) => ({
      ...prevState,
      show: true,
    }));

    getSnacks(search.search.snacks)
      .then((recipes) => {
        setSnacks(recipes);
      })
      .finally(() =>
        setSearch((prevState) => ({
          ...prevState,
          show: false,
        }))
      );
  };

  const onChange = (e) => {
    let value = e.target.value;

    setSearch((prevState) => {
      return { ...prevState, search: { [e.target.id]: value } };
    });
  };

  let mealDate = getStoredDate();

  const deleteRecipe = (e) => {
    //console.log(e.target.id)
    if (e.target.id === "breakfast" && meal) {
      editMeal(mealDate, "breakfast").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
    if (e.target.id === "lunch" && meal) {
      editMeal(mealDate, "lunch").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
    if (e.target.id === "dinner" && meal) {
      editMeal(mealDate, "dinner").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
    if (e.target.id === "snacks" && meal) {
      editMeal(mealDate, "snacks").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
  };

  //console.log ('mealtype', mealtype)

  return (
    <div className="Menu container text-center mt-4">
      {!date ? (
        <div className="text-center mb-4">
          <SyncLoader color="#00bd56" />
        </div>
      ) : (
        <>
          <div className="d-flex ps-5 align-items-center borderTitle bg-white">
            <img
              className="ms-5 me-3 iconMealType mt-3 mb-2"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDczLjY3IDQ3My42NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDczLjY3IDQ3My42NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0U2RTZFNjsiIGQ9Ik0xNy42NywxMjguODM1aDE0NHYyODBoLTE0NFYxMjguODM1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzI5QUJFMjsiIGQ9Ik0xNjEuNjcsMTI4LjgzNWg0OHYyODBoLTQ4VjEyOC44MzV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMDA3MUJDOyIgZD0iTTE2MS42NywxMjguODM1bDI0LTU2bDI0LDU2SDE2MS42N3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNDQ0NDQ0M7IiBkPSJNMTg1LjY3LDcyLjgzNWgtMTQ0bC0yNCw1NmgxNDRMMTg1LjY3LDcyLjgzNXoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMyOUFCRTI7IiBkPSJNNDEuNjcsMzIuODM1aDE0NHY0MGgtMTQ0VjMyLjgzNXoiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMyOUFCRTI7IiBjeD0iODkuNjciIGN5PSIyMDguODM1IiByPSIyNCIvPg0KPC9nPg0KPHBhdGggc3R5bGU9ImZpbGw6I0M2OUM2RDsiIGQ9Ik02OC40NjIsMzcxLjM4N0wxNS4yNyw0MDkuMzk1Yy02LjIwNCw0LjQxMy04LjgwMSwxMi4zNTktNi40LDE5LjU4NA0KCWMyLjM2LDcuMDgzLDguOTksMTEuODYsMTYuNDU2LDExLjg1Nkg5Mi44N0w2OC40NjIsMzcxLjM4N3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNBNjdDNTI7IiBkPSJNMTI4LjcyNiwzNDEuNDM1bC01Mi41MDQsMTVjLTguNjk0LDIuNDg3LTE0LjAyNSwxMS4yMjgtMTIuMjU2LDIwLjA5NmwxMi45MDQsNjQuMzA0aDc5LjE1Mg0KCUwxMjguNzI2LDM0MS40MzV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojOEM2MjM5OyIgZD0iTTI3My42Nyw0NDAuODM1SDEzMS45ODJsLTEyLjQ5Ni05Mi4zMzZjLTEuMjg2LTkuNDg4LDUuMzYzLTE4LjIyMSwxNC44NTEtMTkuNTA3DQoJYzAuNzczLTAuMTA1LDEuNTUzLTAuMTU3LDIuMzMzLTAuMTU3aDEzN1Y0NDAuODM1eiIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0Y3OTMxRTsiIGQ9Ik0zNTMuNTM0LDQxNi44MzVIMzEzLjY3Yy00NC4yMzgtMC4wNDgtODAuMDg3LTM1Ljg5OC04MC4xMzYtODAuMTM2di04Ny44NjRjMC00LjQxOCwzLjU4Mi04LDgtOA0KCQlsMCwwSDQyNS42N2M0LjQxOCwwLDgsMy41ODIsOCw4djg3Ljg2NEM0MzMuNjIyLDM4MC45MzcsMzk3Ljc3Miw0MTYuNzg3LDM1My41MzQsNDE2LjgzNXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRjc5MzFFOyIgZD0iTTQxNy42Nyw0NDAuODM1aC0xNjBsLTE2LTMyaDE5Mkw0MTcuNjcsNDQwLjgzNXoiLz4NCjwvZz4NCjxwYXRoIGQ9Ik00NjUuNjcsMjQwLjgzNUgyNDEuNTM0Yy00LjQxOCwwLTgsMy41ODItOCw4djcySDIxNy42N3YtMTkyYzAuMDAyLTEuMDgxLTAuMjE5LTIuMTUxLTAuNjQ4LTMuMTQ0TDE5My42Nyw3MS4yMzV2LTM4LjQNCgljMC00LjQxOC0zLjU4Mi04LTgtOGgtMTQ0Yy00LjQxOCwwLTgsMy41ODItOCw4djM4LjRsLTIzLjM1Miw1NC40OGMtMC40MjYsMC45ODUtMC42NDcsMi4wNDctMC42NDgsMy4xMnYyNzQuODI0DQoJYy0xMC45ODQsOC42MjYtMTIuODk1LDI0LjUyMy00LjI2OSwzNS41MDdjNC44MDIsNi4xMTUsMTIuMTUsOS42ODEsMTkuOTI1LDkuNjY5SDQxNy42N2MzLjA0NywwLjAxNyw1LjgzOC0xLjY5OSw3LjItNC40MjQNCglsMTMuNzQ0LTI3LjU3NmgzNS4wNTZ2LTE2aC03Mi4yOTZjMTguMTg0LTEzLjUxNiwyOS43ODQtMzQuMTA4LDMxLjkyLTU2LjY2NGMyMy4yNDctMy43NCw0MC4zNDktMjMuNzksNDAuMzc2LTQ3LjMzNnYtNDgNCglDNDczLjY3LDI0NC40MTcsNDcwLjA4OCwyNDAuODM1LDQ2NS42NywyNDAuODM1TDQ2NS42NywyNDAuODM1eiBNMTY5LjY3LDMyMC44MzV2LTE4NGgzMnYxODRIMTY5LjY3eiBNMTE3LjU5LDMyOS40OTkNCgljLTIuMDQ4LDIuMzkzLTMuNjI4LDUuMTUtNC42NTYsOC4xMjhsLTM4LjkyOCwxMS4xMmMtOS45MDcsMi45MDktMTcuMDcxLDExLjUyMS0xOC4xMjgsMjEuNzkyTDI1LjY3LDM5Mi4xMTV2LTI1NS4yOGgxMjh2MTg0aC0xNw0KCUMxMjkuMzU4LDMyMC44MzMsMTIyLjQwMSwzMjMuOTkyLDExNy41OSwzMjkuNDk5TDExNy41OSwzMjkuNDk5eiBNNDYuOTQyLDgwLjgzNWgxMjYuNmwtMTcuMTQ0LDQwaC0xMjYuNkw0Ni45NDIsODAuODM1eg0KCSBNMTk3LjU0MiwxMjAuODM1aC0yMy43NDRsMTEuODcyLTI3LjY4OEwxOTcuNTQyLDEyMC44MzV6IE00OS42Nyw0MC44MzVoMTI4djI0aC0xMjhWNDAuODM1eiBNMTYuNDcsNDI2LjQzNQ0KCWMtMS4zMTItMy44ODgsMC4wNzktOC4xNzYsMy40MjQtMTAuNTUybDM4LjMxMi0yNy4zNjhsOC44NjQsNDQuMzJIMjUuMzI2QzIxLjMwMSw0MzIuODQsMTcuNzI5LDQzMC4yNTgsMTYuNDcsNDI2LjQzNXoNCgkgTTcxLjgwNiwzNzQuOTMxYy0wLjkyNi00Ljc2NSwxLjkzMi05LjQ1LDYuNTkyLTEwLjgwOGwzMy44MjQtOS42NjRsMTAuNjA4LDc4LjM3Nkg4My4zODJMNzEuODA2LDM3NC45MzF6IE0xMjcuNDE0LDM0Ny40MDMNCgljLTAuNjgtNS4xMTEsMi45MTEtOS44MDYsOC4wMjItMTAuNDg2YzAuNDA5LTAuMDU0LDAuODIxLTAuMDgyLDEuMjM0LTAuMDgyaDk2Ljg3MmMwLjA2OCwyNS4yMzEsMTIuMDM1LDQ4Ljk1MiwzMi4yODgsNjRoLTY0LjE2djE2DQoJaDM1LjA1Nmw4LDE2SDEzOC45ODJMMTI3LjQxNCwzNDcuNDAzeiBNNDIwLjcyNiw0MTYuODM1bC04LDE2SDI2Mi42MTRsLTgtMTZINDIwLjcyNnogTTQxNy42NywzMzYuNjk5DQoJYy0wLjA0LDM1LjQwNS0yOC43MzEsNjQuMDk2LTY0LjEzNiw2NC4xMzZIMzEzLjY3Yy0zNS40MDMtMC4wNDQtNjQuMDkyLTI4LjczMy02NC4xMzYtNjQuMTM2di03OS44NjRINDE3LjY3TDQxNy42NywzMzYuNjk5eg0KCSBNNDU3LjY3LDI5Ni44MzVjLTAuMDU1LDE0LjU0Ny05LjkxNSwyNy4yMjctMjQsMzAuODY0di03MC44NjRoMjRWMjk2LjgzNXoiLz4NCjxwYXRoIGQ9Ik0zMjEuNTM0LDM4NC44MzVoOHYtMTZoLThjLTIyLjA4LTAuMDI2LTM5Ljk3NC0xNy45Mi00MC00MHYtOGgtMTZ2OEMyNjUuNTc0LDM1OS43NDcsMjkwLjYyMywzODQuNzk1LDMyMS41MzQsMzg0LjgzNXoiLz4NCjxwYXRoIGQ9Ik0yNjUuNTM0LDI4OC44MzVoMTZ2MTZoLTE2VjI4OC44MzV6Ii8+DQo8cGF0aCBkPSJNMjgxLjY3LDIyNC44MzVjMC0xMy4yNTUsMTAuNzQ1LTI0LDI0LTI0aDExNmMxNS40NjQsMCwyOC0xMi41MzYsMjgtMjhzLTEyLjUzNi0yOC0yOC0yOGgtOTZjLTYuNjI3LDAtMTItNS4zNzMtMTItMTINCgljMC02LjYyNyw1LjM3My0xMiwxMi0xMmgzNmMyMi4wOC0wLjAyNiwzOS45NzQtMTcuOTIsNDAtNDBoLTE2YzAsMTMuMjU1LTEwLjc0NSwyNC0yNCwyNGgtMzZjLTE1LjQ2NCwwLTI4LDEyLjUzNi0yOCwyOA0KCXMxMi41MzYsMjgsMjgsMjhoOTZjNi42MjcsMCwxMiw1LjM3MywxMiwxMnMtNS4zNzMsMTItMTIsMTJoLTExNmMtMjIuMDgsMC4wMjYtMzkuOTc0LDE3LjkyLTQwLDQwSDI4MS42N3oiLz4NCjxwYXRoIGQ9Ik04OS42NywxNzYuODM1Yy0xNy42NzMsMC0zMiwxNC4zMjctMzIsMzJzMTQuMzI3LDMyLDMyLDMyczMyLTE0LjMyNywzMi0zMlMxMDcuMzQzLDE3Ni44MzUsODkuNjcsMTc2LjgzNXogTTg5LjY3LDIyNC44MzUNCgljLTguODM3LDAtMTYtNy4xNjMtMTYtMTZjMC04LjgzNyw3LjE2My0xNiwxNi0xNnMxNiw3LjE2MywxNiwxNkMxMDUuNjcsMjE3LjY3Miw5OC41MDcsMjI0LjgzNSw4OS42NywyMjQuODM1eiIvPg0KPHBhdGggZD0iTTU3LjY3LDI1Ni44MzVoNjR2MTZoLTY0VjI1Ni44MzV6Ii8+DQo8cGF0aCBkPSJNNTcuNjcsMjg4LjgzNWg2NHYxNmgtNjRWMjg4LjgzNXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
            />
            <h2 className="mt-3">Breakfast</h2>
          </div>
          {meal !== undefined && meal.mealType.breakfast ? ( //deleteRecipe(setState que deje la receta vacia)
            <div
              className="borderBody"
              style={{ backgroundColor: "rgba(32, 125, 255, 0.2)" }}
            >
              <img
                className="imgRecipe mt-3"
                src={meal.mealType.breakfast.image}
                alt={meal.mealType.breakfast.name}
              ></img>
              <h2 className="w-75 ms-5 mt-4 titleRecipeChoose">
                {meal.mealType.breakfast.name}
              </h2>
              <button
                id="breakfast"
                className="btn btnDeleteMenu fs-6"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </div>
          ) : (
            <div className="borderBody bg-white">
              <form
                className="form-inline d-flex my-lg-0 mb-5 w-75 ms-5"
                onSubmit={onSubmitBreakfast}
                id="helloId"
              >
                <input
                  type="search"
                  className="form-control mr-sm-2"
                  name="search__breakfast"
                  id="breakfast"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.breakfast}
                />
                <button type="submit" className="btn btn-success py-2 my-sm-0">
                  Search
                </button>
              </form>
              <Mealtype
                recipes={breakfast}
                mealtype="breakfast"
                setMeal={setMeal}
              />
            </div>
          )}

          <div className="d-flex mt-2 ps-5 align-items-center borderTitle bg-white">
            <img
              className="ms-5 me-3 iconMealType mt-3 mb-2"
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxwYXRoIGQ9Im00MDUuOTM5IDIwMS4wMDMtNDUuOTM5LTEwNS4wMDNoLTIwOGwtNDUuOTM5IDEwNS4wMDNjLTYuNjM1IDE1LjE2Ny0xMC4wNjEgMzEuNTQzLTEwLjA2MSA0OC4wOTh2MTk4Ljg5OWMwIDE3LjY3MyAxNC4zMjcgMzIgMzIgMzJoMjU2YzE3LjY3MyAwIDMyLTE0LjMyNyAzMi0zMnYtMTk4Ljg5OWMwLTE2LjU1NS0zLjQyNi0zMi45MzEtMTAuMDYxLTQ4LjA5OHoiIGZpbGw9IiNmYWEwMzciLz48L2c+PGc+PHBhdGggZD0ibTE0NCAzMmgyMDBjOC44MzcgMCAxNiA3LjE2MyAxNiAxNnY0OGgtMjE2Yy04LjgzNyAwLTE2LTcuMTYzLTE2LTE2di0zMmMwLTguODM3IDcuMTYzLTE2IDE2LTE2eiIgZmlsbD0iI2ZhYTAzNyIvPjwvZz48Zz48cGF0aCBkPSJtMzM2IDMyaDhjOC44MzcgMCAxNiA3LjE2MyAxNiAxNnY0OGgtMjRjLTguODM3IDAtMTYtNy4xNjMtMTYtMTZ2LTMyYzAtOC44MzcgNy4xNjMtMTYgMTYtMTZ6IiBmaWxsPSIjZjU3ODI4Ii8+PC9nPjxnPjxwYXRoIGQ9Im00MDUuOTM5IDIwMS4wMDMtNDUuOTM5LTEwNS4wMDNoLTIwOGwtNyAxNmgxOTJsLTM4LjkzOSA4OS4wMDNjLTYuNjM1IDE1LjE2Ny0xMC4wNjEgMzEuNTQzLTEwLjA2MSA0OC4wOTl2MTk4Ljg5OGMwIDE3LjY3MyAxNC4zMjcgMzIgMzIgMzJoNjRjMTcuNjczIDAgMzItMTQuMzI3IDMyLTMydi0xOTguODk4YzAtMTYuNTU2LTMuNDI2LTMyLjkzMi0xMC4wNjEtNDguMDk5eiIgZmlsbD0iI2Y1NzgyOCIvPjwvZz48Zz48Zz48cGF0aCBkPSJtMTEyIDM3My4zMzNjLTQuNDE4IDAtOC0zLjU4Mi04LTh2LTUuMzMzYzAtMTMuMjMzLTEwLjc2Ni0yNC0yNC0yNC00LjQxOCAwLTgtMy41ODItOC04czMuNTgyLTggOC04YzIyLjA1NiAwIDQwIDE3Ljk0NCA0MCA0MHY1LjMzM2MwIDQuNDE4LTMuNTgyIDgtOCA4eiIgZmlsbD0iIzM1Mzc0NCIvPjwvZz48Zz48cGF0aCBkPSJtMTQ0IDM1MmMtMTIuMjk2IDAtMjMuNTA3IDQuNjI5LTMyIDEyLjIzMi04LjQ5My03LjYwMy0xOS43MDQtMTIuMjMyLTMyLTEyLjIzMi0yNi41MSAwLTQ4IDIxLjQ5LTQ4IDQ4IDAgNDUuMzMzIDMyIDgwIDU2IDgwczI0IDAgMjQgMCAwIDAgMjQgMCA1Ni0zNC42NjcgNTYtODBjMC0yNi41MS0yMS40OS00OC00OC00OHoiIGZpbGw9IiNkNzMyMmQiLz48L2c+PGc+PGNpcmNsZSBjeD0iNzIiIGN5PSIzODQiIGZpbGw9IiNmMDRiMzciIHI9IjE2Ii8+PC9nPjxnPjxwYXRoIGQ9Im0xNTIgMjg4Yy0yMi4wOTEgMC00MCAxNy45MDktNDAgNDB2OGg4YzIyLjA5MSAwIDQwLTE3LjkwOSA0MC00MCAwLTQuNDE4LTMuNTgyLTgtOC04eiIgZmlsbD0iIzY5YTA0MSIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM2OCAyNTZoMTZ2LTQwYzAtNC40MTgtMy41ODItOC04LThoLTQ4Yy00LjQxOCAwLTggMy41ODItOCA4czMuNTgyIDggOCA4aDQweiIgZmlsbD0iI2Q3ZTZlNiIvPjwvZz48Zz48cGF0aCBkPSJtNDY0IDI1NmgtMTI4Yy04LjgzNyAwLTE2IDcuMTYzLTE2IDE2djE5MmMwIDguODM3IDcuMTYzIDE2IDE2IDE2aDEyOGM4LjgzNyAwIDE2LTcuMTYzIDE2LTE2di0xOTJjMC04LjgzNy03LjE2My0xNi0xNi0xNnoiIGZpbGw9IiM5MWI5NDUiLz48L2c+PGc+PHBhdGggZD0ibTQ2NCAyNTZoLTY0Yy04LjgzNyAwLTE2IDcuMTYzLTE2IDE2djE5MmMwIDguODM3IDcuMTYzIDE2IDE2IDE2aDY0YzguODM3IDAgMTYtNy4xNjMgMTYtMTZ2LTE5MmMwLTguODM3LTcuMTYzLTE2LTE2LTE2eiIgZmlsbD0iIzY5YTA0MSIvPjwvZz48Zz48Y2lyY2xlIGN4PSI0MzIiIGN5PSIzNjgiIGZpbGw9IiNmYWJlMTkiIHI9IjQwIi8+PC9nPjwvZz48L2c+PC9zdmc+"
            />
            <h2 className="mt-3">Lunch</h2>
          </div>
          {meal !== undefined && meal.mealType.lunch ? (
            <div
              className="borderBody"
              style={{ backgroundColor: "rgba(32, 125, 255, 0.2)" }}
            >
              <img
                className="imgRecipe mt-3"
                src={meal.mealType.lunch.image}
                alt={meal.mealType.lunch.name}
              ></img>
              <h2 className="w-75 ms-5 mt-4 titleRecipeChoose">
                {meal.mealType.lunch.name}
              </h2>
              <button
                id="lunch"
                className="btn btnDeleteMenu fs-6"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </div>
          ) : (
            <div className="borderBody bg-white">
              <form
                onSubmit={onSubmitLunch}
                className="form-inline d-flex my-lg-0 mb-5 w-75 ms-5"
              >
                <input
                  type="search"
                  className="form-control mr-sm-2"
                  name="search__lunch"
                  id="lunch"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.lunch}
                />
                <button type="submit" className="btn btn-success py-2 my-sm-0">
                  Search
                </button>
              </form>
              <Mealtype recipes={lunch} mealtype="lunch" setMeal={setMeal} />
            </div>
          )}

          <div className="d-flex mt-2 ps-5 align-items-center borderTitle bg-white">
            <img
              className="ms-5 me-3 iconMealType mt-3 mb-2"
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxnPjxwYXRoIGQ9Im0zNjggMTM0Yy0zLjcwMSAwLTcuMjA1LjgzOS0xMC4zMzUgMi4zMzUgMS40OTYtMy4xMyAyLjMzNS02LjYzNCAyLjMzNS0xMC4zMzUgMC0xMy4yNTUtMTAuNzQ1LTI0LTI0LTI0cy0yNCAxMC43NDUtMjQgMjRjMCA2LjYyNyAyLjY4NiAxMi42MjcgNy4wMjkgMTYuOTcxbC0zMS4wMjkgMzEuMDI5IDMyIDMyIDMxLjAyOS0zMS4wMjljNC4zNDQgNC4zNDIgMTAuMzQ0IDcuMDI5IDE2Ljk3MSA3LjAyOSAxMy4yNTUgMCAyNC0xMC43NDUgMjQtMjRzLTEwLjc0NS0yNC0yNC0yNHoiIGZpbGw9IiNhNWMzZGMiLz48L2c+PC9nPjxnPjxwYXRoIGQ9Im0zNjAgMTI2YzAtMTMuMjU1LTEwLjc0NS0yNC0yNC0yNHMtMjQgMTAuNzQ1LTI0IDI0YzAgNi42MjcgMi42ODYgMTIuNjI3IDcuMDI5IDE2Ljk3MWwtMzEuMDI5IDMxLjAyOSAxNiAxNiA0Mi4zMzUtNDIuMzM1YzguMDgxLTMuODYzIDEzLjY2NS0xMi4xMTIgMTMuNjY1LTIxLjY2NXoiIGZpbGw9IiNkN2U2ZTYiLz48L2c+PGc+PHBhdGggZD0ibTM2Mi42NjcgMzAydi04YzAtNjYuMjc0LTUzLjcyNi0xMjAtMTIwLTEyMGgtNTguNjY3Yy02Ni4yNzQgMC0xMjAgNTMuNzI2LTEyMCAxMjB2NDBjMCA0NC4xODMgMzUuODE3IDgwIDgwIDgwaDI0MGMzNS4zNDYgMCA2NC0yOC42NTQgNjQtNjQgMC04LjgzNy03LjE2My0xNi0xNi0xNmgtMzcuMzMzYy0xNy42NzMgMC0zMi0xNC4zMjctMzItMzJ6IiBmaWxsPSIjZDI2ZTI4Ii8+PC9nPjxnPjxwYXRoIGQ9Im00MzguNTg5IDMzNS40MTdjLTExLjI1NCAxOC4zMzgtMzEuNDk1IDMwLjU4My01NC41ODkgMzAuNTgzaC0yNDBjLTQyLjk4OCAwLTc4LjA0NC0zMy45MDktNzkuOTEtNzYuNDM3LS4wNTMgMS40NzMtLjA5IDIuOTUtLjA5IDQuNDM3djQwYzAgNDQuMTgzIDM1LjgxNyA4MCA4MCA4MGgyNDBjMzUuMzQ2IDAgNjQtMjguNjUzIDY0LTY0IDAtNi40ODktMy44Ni0xMi4wNzItOS40MTEtMTQuNTgzeiIgZmlsbD0iI2E1NTAyMyIvPjwvZz48Zz48Zz48Y2lyY2xlIGN4PSIzNzMuMzMzIiBjeT0iNDAwLjY2NiIgZmlsbD0iI2YwNGIzNyIgcj0iNDIuNjY3Ii8+PC9nPjxnPjxwYXRoIGQ9Im0zNDEuMzMzIDQwNC42NjdjLTIuMjA5IDAtNC0xLjc5MS00LTQgMC0xOS44NTEgMTYuMTQ5LTM2IDM2LTM2IDIuMjA5IDAgNCAxLjc5MSA0IDRzLTEuNzkxIDQtNCA0Yy0xNS40MzkgMC0yOCAxMi41NjEtMjggMjggMCAyLjIwOS0xLjc5MSA0LTQgNHoiIGZpbGw9IiNmZjY5NTUiLz48L2c+PC9nPjxnPjxnPjxjaXJjbGUgY3g9IjEzOC42NjciIGN5PSI0MDAuNjY2IiBmaWxsPSIjZjA0YjM3IiByPSI0Mi42NjciLz48L2c+PGc+PHBhdGggZD0ibTEwNi42NjcgNDA0LjY2N2MtMi4yMDkgMC00LTEuNzkxLTQtNCAwLTE5Ljg1MSAxNi4xNDktMzYgMzYtMzYgMi4yMDkgMCA0IDEuNzkxIDQgNHMtMS43OTEgNC00IDRjLTE1LjQzOSAwLTI4IDEyLjU2MS0yOCAyOCAwIDIuMjA5LTEuNzkxIDQtNCA0eiIgZmlsbD0iI2ZmNjk1NSIvPjwvZz48L2c+PGc+PHBhdGggZD0ibTkwIDMwMmMtNC40MTggMC04LTMuNTgyLTgtOCAwLTU2LjI0MyA0NS43NTctMTAyIDEwMi0xMDIgNC40MTggMCA4IDMuNTgyIDggOHMtMy41ODIgOC04IDhjLTQ3LjQyMSAwLTg2IDM4LjU3OS04NiA4NiAwIDQuNDE4LTMuNTgyIDgtOCA4eiIgZmlsbD0iI2YwYmU4YyIvPjwvZz48Zz48cGF0aCBkPSJtMzIgNDE0aDQ0OGM4LjgzNyAwIDE2IDcuMTYzIDE2IDE2IDAgOC44MzctNy4xNjMgMTYtMTYgMTZoLTQ0OGMtOC44MzcgMC0xNi03LjE2My0xNi0xNiAwLTguODM3IDcuMTYzLTE2IDE2LTE2eiIgZmlsbD0iI2Q3ZTZmMCIvPjwvZz48Zz48cGF0aCBkPSJtNzcuMzMzIDQ0NmgzNTcuMzM0bC0zNC42NjcgMzJoLTI4OHoiIGZpbGw9IiNhNWMzZGMiLz48L2c+PGc+PHBhdGggZD0ibTMzNS45NjMgMjA3LjQ3N2MuMDIzLS41NTIuMDM3LTEuMDU2LjAzNy0xLjQ3OCAwLTI2LjUxLTIxLjQ5LTQ4LTQ4LTQ4LS40MjIgMC0uOTI1LjAxNC0xLjQ3Ny4wMzctMS41MDQuMDQ2LTIuOTkuMTYtNC40NTcuMzQxLTI4LjA1OSAyLjg2OS0xMjIuMDY2IDIzLjY2Ni0xMjIuMDY2IDExMS42MjMgMCAzNS4zNDYgMjguNjU0IDY0IDY0IDY0IDg3Ljk1OCAwIDEwOC43NTQtOTQuMDA3IDExMS42MjItMTIyLjA2Ni4xODEtMS40NjcuMjk1LTIuOTUzLjM0MS00LjQ1N3oiIGZpbGw9IiNhNTUwMjMiLz48L2c+PGc+PHBhdGggZD0ibTE4NiAyNzhjLTQuNDE4IDAtOC0zLjU4Mi04LTggMC0zMC45NzggMTQuMTAzLTU1LjMyNiA0MS45MTctNzIuMzcyIDIxLjM5Ni0xMy4xMTMgNDcuODM4LTE5LjY5MyA2My45NzktMjEuMzQ0bC40NDktLjA1MWMuODU1LS4xMDUgMS43OTgtLjE3NyAyLjcyOS0uMjA0LjAzNC0uMDAyLjc0OC0uMDI3LjkwNC0uMDI5aC4wNjNjNC4zOSAwIDcuOTY0IDMuNTQgNy45OTkgNy45MzcuMDM0IDQuNDE5LTMuNTE5IDguMDI4LTcuOTM3IDguMDYzbC0uNDY1LjAxOWMtLjUzMS4wMTctLjk4LjA1MS0xLjQyMy4xMDRsLS42MDguMDY5Yy0xNC41NTUgMS40ODgtMzguMjI5IDcuMzctNTcuMzMyIDE5LjA3OC0yMy4zODMgMTQuMzMxLTM0LjI3NSAzMi45OTMtMzQuMjc1IDU4LjczIDAgNC40MTgtMy41ODIgOC04IDh6IiBmaWxsPSIjZDI2ZTI4Ii8+PC9nPjxnPjxwYXRoIGQ9Im0yMDggMTIyYy0zLjA3MSAwLTYuMTQzLTEuMTcyLTguNDg1LTMuNTE1LTQuNjg3LTQuNjg3LTQuNjg3LTEyLjI4NCAwLTE2Ljk3MSA0LjE0NC00LjE0NCA0LjE0NC0xMC44ODYgMC0xNS4wMjktMTMuNTAxLTEzLjUwMS0xMy41MDEtMzUuNDcgMC00OC45NzEgNC42ODYtNC42ODYgMTIuMjg1LTQuNjg2IDE2Ljk3MSAwIDQuNjg3IDQuNjg3IDQuNjg3IDEyLjI4NCAwIDE2Ljk3MS00LjE0NCA0LjE0NC00LjE0NCAxMC44ODYgMCAxNS4wMjkgMTMuNTAxIDEzLjUwMSAxMy41MDEgMzUuNDcgMCA0OC45NzEtMi4zNDMgMi4zNDMtNS40MTUgMy41MTUtOC40ODYgMy41MTV6IiBmaWxsPSIjYWFjM2Q3Ii8+PC9nPjxnPjxwYXRoIGQ9Im0yODggMTIyYy0zLjA3MSAwLTYuMTQzLTEuMTcyLTguNDg1LTMuNTE1LTQuNjg3LTQuNjg3LTQuNjg3LTEyLjI4NCAwLTE2Ljk3MSA0LjE0NC00LjE0NCA0LjE0NC0xMC44ODYgMC0xNS4wMjktMTMuNTAxLTEzLjUwMS0xMy41MDEtMzUuNDcgMC00OC45NzEgNC42ODYtNC42ODYgMTIuMjg1LTQuNjg2IDE2Ljk3MSAwIDQuNjg3IDQuNjg3IDQuNjg3IDEyLjI4NCAwIDE2Ljk3MS00LjE0NCA0LjE0NC00LjE0NCAxMC44ODYgMCAxNS4wMjkgMTMuNTAxIDEzLjUwMSAxMy41MDEgMzUuNDcgMCA0OC45NzEtMi4zNDMgMi4zNDMtNS40MTUgMy41MTUtOC40ODYgMy41MTV6IiBmaWxsPSIjYWFjM2Q3Ii8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggMTIyYy0zLjA3MSAwLTYuMTQzLTEuMTcyLTguNDg1LTMuNTE1LTQuNjg3LTQuNjg3LTQuNjg3LTEyLjI4NCAwLTE2Ljk3MSA0LjE0NC00LjE0NCA0LjE0NC0xMC44ODYgMC0xNS4wMjktMTMuNTAxLTEzLjUwMS0xMy41MDEtMzUuNDcgMC00OC45NzEgNC42ODYtNC42ODYgMTIuMjg1LTQuNjg2IDE2Ljk3MSAwIDQuNjg3IDQuNjg3IDQuNjg3IDEyLjI4NCAwIDE2Ljk3MS00LjE0NCA0LjE0NC00LjE0NCAxMC44ODYgMCAxNS4wMjkgMTMuNTAxIDEzLjUwMSAxMy41MDEgMzUuNDcgMCA0OC45NzEtMi4zNDMgMi4zNDMtNS40MTUgMy41MTUtOC40ODYgMy41MTV6IiBmaWxsPSIjYWFjM2Q3Ii8+PC9nPjxnPjxwYXRoIGQ9Im00NjQgMzgyYy0xNC44NiAwLTE0Ljg2IDE2LTI5LjcyIDE2cy0xNC44Ni0xNi0yOS43Mi0xNmMtMTQuODU4IDAtMTQuODU4IDE2LTI5LjcxNiAxNi0xNC44NTkgMC0xNC44NTktMTYtMjkuNzE3LTE2cy0xNC44NTggMTYtMjkuNzE2IDE2LTE0Ljg1OC0xNi0yOS43MTUtMTZjLTE0Ljg1NiAwLTE0Ljg1NiAxNi0yOS43MTIgMTZzLTE0Ljg1Ni0xNi0yOS43MTEtMTZjLTE0Ljg1NCAwLTE0Ljg1NCAxNi0yOS43MDggMTYtMTQuODU3IDAtMTQuODU3LTE2LTI5LjcxNC0xNi0xNC44NTYgMC0xNC44NTYgMTYtMjkuNzEzIDE2LTE0Ljg1NiAwLTE0Ljg1Ni0xNi0yOS43MTItMTZzLTE0Ljg1NiAxNi0yOS43MTIgMTZjLTE0Ljg1OCAwLTE0Ljg1OC0xNi0yOS43MTQtMTYtOC44MzcgMC0xNiA3LjE2My0xNiAxNnYxNmg0NDh2LTE2YzAtOC44MzctNy4xNjMtMTYtMTYtMTZ6IiBmaWxsPSIjOTFiOTQ1Ii8+PC9nPjwvZz48L3N2Zz4="
            />
            <h2 className="mt-3">Dinner</h2>
          </div>
          {meal !== undefined && meal.mealType.dinner ? (
            <div
              className="borderBody"
              style={{ backgroundColor: "rgba(32, 125, 255, 0.2)" }}
            >
              <img
                className="imgRecipe mt-3"
                src={meal.mealType.dinner.image}
                alt={meal.mealType.dinner.name}
              ></img>
              <h2 className="w-75 ms-5 mt-4 titleRecipeChoose">
                {meal.mealType.dinner.name}
              </h2>
              <button
                id="dinner"
                className="btn btnDeleteMenu fs-6"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </div>
          ) : (
            <div className="borderBody bg-white">
              <form
                onSubmit={onSubmitDinner}
                className="form-inline d-flex my-lg-0 mb-5 w-75 ms-5"
              >
                <input
                  type="search"
                  className="form-control mr-sm-2"
                  name="search__dinner"
                  id="dinner"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.dinner}
                />
                <button type="submit" className="btn btn-success py-2 my-sm-0">
                  Search
                </button>
              </form>
              <Mealtype recipes={dinner} mealtype="dinner" setMeal={setMeal} />
            </div>
          )}

          <div className="d-flex mt-2 ps-5 align-items-center borderTitle bg-white">
            <img
              className="ms-5 me-3 iconMealType mt-3 mb-2"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGMEMzODsiIGQ9Ik00MTcuNzQxLDQxOC41OTZjLTAuODE5LDIxLjg3NCw3LjgxMywzOS43MTgsMjAuNzQ1LDU2LjU3N2M0LjYxMSw2LjAxLDkuNzYxLDExLjg5NiwxNS4yMzIsMTcuNzkyDQoJYzYuMjY5LDcuNTc1LDAuODkxLDE5LjAzNS04Ljk0MiwxOS4wMzVINjcuMjI0Yy05LjgzNCwwLTE1LjIxMi0xMS40Ni04Ljk0Mi0xOS4wMzVjNS40OTItNS45MTcsMTAuNjYzLTExLjgwMiwxNS4yNjMtMTcuNzkyDQoJYzEyLjk2My0xNi44NjksMjEuNTQzLTM0LjU5OSwyMC43MTQtNTYuNTc3VjE2OC42MTJjMC0zMC4wNS0xMC40OTctNTkuMTU3LTI5LjY3Ny04Mi4yODVoLTAuMDENCgljLTUuODAzLTcuMDA1LTguOTg0LTE1LjgyMy04Ljk4NC0yNC45MjFWMTMuMjQzQzU1LjU4Nyw1LjkyNyw2MS41MTQsMCw2OC44MywwaDM3NC4zNGM3LjMxNiwwLDEzLjI0Myw1LjkyNywxMy4yNDMsMTMuMjQzdjQ4LjE2Mw0KCWMwLDkuMDk4LTMuMTgxLDE3LjkxNi04Ljk4NCwyNC45MjFoLTAuMDFjLTE5LjE4LDIzLjEyOC0yOS42NzcsNTIuMjM1LTI5LjY3Nyw4Mi4yODVMNDE3Ljc0MSw0MTguNTk2TDQxNy43NDEsNDE4LjU5NnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNBNTAwMUU7IiBkPSJNNDU2LjQxMywxMy4yNDN2NDYuODc4Yy0xLjA5OCwwLjgyOS0xLjY5OSwxLjI4NS0xLjY5OSwxLjI4NUg1NS41ODdWMTMuMjQzDQoJQzU1LjU4Nyw1LjkyNyw2MS41MTQsMCw2OC44MywwaDM3NC4zNEM0NTAuNDg2LDAsNDU2LjQxMyw1LjkyNyw0NTYuNDEzLDEzLjI0M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNDNzAwMjQ7IiBkPSJNNDUzLjcxOSw0OTIuOTY1Yy01LjQ3MS01Ljg5Ni0xMC42MjEtMTEuNzgyLTE1LjIzMi0xNy43OTJIMTMwLjUxMg0KCWMtOS45MTUsMC0xNi4yMTUtMTAuNDQ3LTExLjc2OC0xOS4zMWM1LjY3MS0xMS4zMDIsOC44NzEtMjMuNDQ0LDguMzUyLTM3LjI2N1YxNjguNjEyYzAtMzAuMDUtMTAuNDk3LTU5LjE1Ny0yOS42NzctODIuMjg1aC0wLjAxDQoJYy01LjgwMy03LjAwNS04Ljk4NC0xNS44MjMtOC45ODQtMjQuOTIxVjEzLjI0M0M4OC40MjUsNS45MjcsOTQuMzUyLDAsMTAxLjY2NywwSDY4LjgzYy03LjMxNCwwLTEzLjI0Myw1LjkyOS0xMy4yNDMsMTMuMjQzdjQ4LjE2Mw0KCWMwLDkuMDk4LDMuMTgxLDE3LjkxNiw4Ljk4NCwyNC45MjFoMC4wMWMxOS4xOCwyMy4xMjgsMjkuNjc3LDUyLjIzNSwyOS42NzcsODIuMjg1djI0OS45ODUNCgljMS4xMzIsMzAuMTMtMTUuNTI1LDUyLjMzNi0zNS45NzcsNzQuMzY5QzUyLjAxMiw1MDAuNTQsNTcuMzksNTEyLDY3LjIyNCw1MTJjMTYuNDc2LDAsMzU4LjY1OCwwLDM3Ny41NTIsMA0KCUM0NTQuNjEsNTEyLDQ1OS45ODgsNTAwLjU0LDQ1My43MTksNDkyLjk2NXoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkNEMDA7IiBkPSJNMTM4LjkwMiwxMDEuNjA0YzAtMi44OTUsMi43MDktNS42MDUsOS4zNDItNS42MDVjNy42NiwwLDkuNDM0LDMuNTUsMTIuNzk3LDMuNTUNCgkJYzQuMTExLDAsNS43OTItNS4xMzgsNS43OTItNy42NjFjMC03LjI4Ni0xMy42MzktOC4yMi0xOC41ODktOC4yMmMtMTEuNjc4LDAtMjMuOTE0LDUuMzI1LTIzLjkxNCwxOS4zMzcNCgkJYzAsMjEuODU5LDI5LjYxMiwxOS44OTcsMjkuNjEyLDMxLjE5OWMwLDQuNDg0LTQuNzY0LDYuMTY1LTkuMDYyLDYuMTY1Yy04LjY4OCwwLTExLjQ4OS02LjkxMy0xNS44OC02LjkxMw0KCQljLTMuNTUsMC02LjM1Miw0LjY3LTYuMzUyLDcuODQ2YzAsNi4xNjUsMTAuMjc1LDEyLjE0MywyMi41MTMsMTIuMTQzYzEzLjU0NSwwLDIzLjM1My03LjI4NywyMy4zNTMtMjAuNzM4DQoJCUMxNjguNTE0LDEwOS4xNzEsMTM4LjkwMiwxMTAuOTQ2LDEzOC45MDIsMTAxLjYwNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZDRDAwOyIgZD0iTTIxNi4xNTcsODQuMjI5Yy0zLjY0MywwLTcuMjg2LDEuMzA4LTcuMjg2LDQuMzl2MzEuNzZsLTE1LjEzMy0yOC44NjUNCgkJYy0zLjU1LTYuODE5LTUuNTExLTcuMjg3LTEwLjc0Mi03LjI4N2MtMy42NDMsMC03LjI4NiwxLjQwMi03LjI4Niw0LjQ4NHY1OS4zMThjMCwyLjk4OSwzLjY0Myw0LjQ4NCw3LjI4Niw0LjQ4NA0KCQljMy42NDIsMCw3LjI4Ny0xLjQ5NCw3LjI4Ny00LjQ4NHYtMzEuNzYxbDE3Ljc0OCwzMi4zMjFjMS43NzUsMy4yNjksNC43NjQsMy45MjMsOC4xMjcsMy45MjNjMy42NDMsMCw3LjI4Ny0xLjQ5NCw3LjI4Ny00LjQ4NA0KCQlWODguNjIxQzIyMy40NDMsODUuNTM4LDIxOS43OTksODQuMjI5LDIxNi4xNTcsODQuMjI5eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkNEMDA7IiBkPSJNMjY1LjQ4MSw4OC41MjZjLTEuMDI4LTMuMjY5LTUuMjMyLTQuODU4LTkuNTI4LTQuODU4cy04LjUwMSwxLjU4OS05LjUyOCw0Ljg1OGwtMTcuMzc1LDU2Ljk4Mg0KCQljLTAuMDkzLDAuMzc0LTAuMTg4LDAuNzQ3LTAuMTg4LDEuMDI4YzAsMy40NTYsNS4zMjUsNS45NzksOS4zNDEsNS45NzljMi4zMzYsMCw0LjIwNS0wLjc0Nyw0Ljc2NC0yLjcwOWwzLjE3Ni0xMS42NzdoMTkuNzENCgkJbDMuMTc2LDExLjY3N2MwLjU2MSwxLjk2MiwyLjQyOSwyLjcwOSw0Ljc2NCwyLjcwOWM0LjAxNiwwLDkuMzQxLTIuNTIyLDkuMzQxLTUuOTc5YzAtMC4yODEtMC4wOTQtMC42NTQtMC4xODgtMS4wMjgNCgkJTDI2NS40ODEsODguNTI2eiBNMjQ5LjEzNCwxMjYuOTJsNi44MTktMjUuMDM1bDYuODE5LDI1LjAzNUgyNDkuMTM0eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkNEMDA7IiBkPSJNMzEwLjc4OCw5Ni45MzRjNy45NCwwLDguMjIxLDUuOTc5LDguMzE0LDguNDA3YzAuMTg4LDMuMzY0LDMuMzYyLDQuMzksNy4yODYsNC4zOQ0KCQljNC45NTEsMCw3LjI4Ny0xLjMwOCw3LjI4Ny02LjkxM2MwLTExLjg2NC0xMC4wODktMTguNTg5LTIzLjQ0Ny0xOC41ODljLTEyLjIzOCwwLTIyLjQxOSw1Ljk3OS0yMi40MTksMjIuMDQ1djI0Ljc1NA0KCQljMCwxNi4wNjcsMTAuMTgyLDIyLjA0NSwyMi40MTksMjIuMDQ1YzEzLjM1OSwwLDIzLjQ0Ny03LjEsMjMuNDQ3LTE5LjUyM2MwLTUuNjA1LTIuMzM2LTYuOTEzLTcuMzgtNi45MTMNCgkJYy0zLjczNiwwLTYuOTEzLDAuOTM0LTcuMTkyLDQuMzljLTAuMjgxLDMuNjQzLTAuNzQ3LDkuMzQxLTguMjIsOS4zNDFjLTUuNDE4LDAtOC41MDEtMi45ODktOC41MDEtOS4zNDF2LTI0Ljc1NA0KCQlDMzAyLjM4Miw5OS45MjIsMzA1LjQ2Myw5Ni45MzQsMzEwLjc4OCw5Ni45MzR6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0QwMDsiIGQ9Ik0zODguNjA0LDE0My4zNmwtMTkuMzM3LTI5LjYxMmwxNS4zMTktMTkuMjQzYzAuNzQ4LTEuMDI4LDAuOTM1LTIuMDU1LDAuOTM1LTIuODAzDQoJCWMwLTMuNjQzLTQuODU4LTcuNDczLTguNTk0LTcuNDczYy0xLjQ5NCwwLTIuODAyLDAuNTYxLTMuODMsMi4wNTVsLTE3LjQ2NywyNC43NTVWODguNjIxYzAtMy4wODMtMy42NDQtNC4zOS03LjI4Ny00LjM5DQoJCWMtMy42NDIsMC03LjI4NiwxLjMwOC03LjI4Niw0LjM5djU5LjQxYzAsMi45ODksMy42NDMsNC40ODQsNy4yODYsNC40ODRjMy42NDIsMCw3LjI4Ny0xLjQ5NCw3LjI4Ny00LjQ4NHYtMTYuOTA4bDMuOTIzLTUuMDQ0DQoJCWwxNS45NzMsMjQuMjg4YzEuMjE0LDEuOTYyLDMuMDgzLDIuNzA5LDUuMDQ0LDIuNzA5YzQuMjA0LDAsOC43ODEtMy42NDMsOC43ODEtNy4yODcNCgkJQzM4OS4zNSwxNDQuOTQ4LDM4OS4wNzIsMTQ0LjEwNywzODguNjA0LDE0My4zNnoiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM4MzAwMTg7IiBkPSJNNjguODMsMGMtNy4zMTYsMC0xMy4yNDMsNS45MjctMTMuMjQzLDEzLjI0M3Y0OC4xNjNoMzIuODM3VjEzLjI0M0M4OC40MjUsNS45MjcsOTQuMzUyLDAsMTAxLjY2NywwDQoJSDY4LjgzeiIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGQjY1NTsiIGQ9Ik0zMDMuNDE0LDI2Mi4zbC00OC4xMTMsMTYuMjgyYy00LjAzNiwxLjM2Ni04LjAzNi0yLjE0OS03LjIwMS02LjMyN2w5Ljk1Ni00OS44MDhsOS45NTYtNDkuODA4DQoJCWMwLjgzNS00LjE3OCw1Ljg3OS01Ljg4NSw5LjA4LTMuMDcybDM4LjE1NywzMy41MjZsMzguMTU3LDMzLjUyNmMzLjIwMSwyLjgxMiwyLjE1Niw4LjAzNC0xLjg3OSw5LjM5OUwzMDMuNDE0LDI2Mi4zeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkI2NTU7IiBkPSJNMjE4LjExOSw0MzYuNzA1bC0xMy4zNCw0OS4wMWMtMS4xMTksNC4xMTEtNi4yNjgsNS40NjktOS4yNjksMi40NDRsLTM1Ljc3NC0zNi4wNTlsLTM1Ljc3NC0zNi4wNTkNCgkJYy0zLjAwMS0zLjAyNS0xLjYwMi04LjE2MywyLjUxOC05LjI0OWw0OS4xMTUtMTIuOTUzbDQ5LjExNS0xMi45NTJjNC4xMi0xLjA4Niw3Ljg3LDIuNjk0LDYuNzUxLDYuODA1TDIxOC4xMTksNDM2LjcwNXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZCNjU1OyIgZD0iTTMyMS42MTksNDE0LjQzNmwtNTkuMjM1LDIwLjA0NWMtNC45NjksMS42ODItOS44OTQtMi42NDYtOC44NjYtNy43ODlsMTIuMjU3LTYxLjMyMWwxMi4yNTctNjEuMzIxDQoJCWMxLjAyOC01LjE0NCw3LjIzOS03LjI0NSwxMS4xNzktMy43ODNsNDYuOTc2LDQxLjI3Nmw0Ni45NzYsNDEuMjc2YzMuOTQxLDMuNDYyLDIuNjU1LDkuODkyLTIuMzEzLDExLjU3MkwzMjEuNjE5LDQxNC40MzZ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGQjY1NTsiIGQ9Ik0xNzUuNzE1LDM0MC4wODVsLTQ5LjM5My0xMS44NDdjLTQuMTQzLTAuOTk0LTUuNjU3LTYuMDk5LTIuNzI0LTkuMTlsMzQuOTU1LTM2Ljg1M2wzNC45NTUtMzYuODUzDQoJCWMyLjkzMS0zLjA5MSw4LjExLTEuODQ5LDkuMzIyLDIuMjM2bDE0LjQzNyw0OC42OTlsMTQuNDM3LDQ4LjY5OWMxLjIxMSw0LjA4NS0yLjQ1NCw3Ljk0OS02LjU5Niw2Ljk1NUwxNzUuNzE1LDM0MC4wODV6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGQjY1NTsiIGQ9Ik0zODUuNDg0LDQzOC44MjNsLTAuNzE1LDUzLjA5NUwzODQuNSw1MTJoLTcyLjg0NWwtMjcuNTk0LTE2LjQyNA0KCQljLTMuODI0LTIuMjgtMy43NTEtNy44NDQsMC4xMzUtMTAuMDJsNDYuMzM5LTI1LjkzNmw0Ni4zMzktMjUuOTI2QzM4MC43NTksNDMxLjUxOCwzODUuNTQ3LDQzNC4zNjcsMzg1LjQ4NCw0MzguODIzeiIvPg0KPC9nPg0KPGc+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRUU4NzAwOyIgY3g9IjI4Ny40NDQiIGN5PSIyMTQuNzMzIiByPSI2LjIwNiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0VFODcwMDsiIGN4PSIyODEuMjM3IiBjeT0iMjQwLjY0OSIgcj0iNi4yMDYiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNFRTg3MDA7IiBjeD0iMzEwLjczOCIgY3k9IjIzNC40NDIiIHI9IjYuMjA2Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRUU4NzAwOyIgY3g9IjM2MC4xMjMiIGN5PSI0ODMuOTE5IiByPSI2LjIwNiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0VFODcwMDsiIGN4PSIzMzUuMDA2IiBjeT0iNDkyLjgwOSIgcj0iNi4yMDYiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNFRTg3MDA7IiBjeD0iMjk5LjE2MyIgY3k9IjM2MC45MjEiIHI9IjYuMjA2Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRUU4NzAwOyIgY3g9IjI5OS44MDYiIGN5PSIzODcuNTYyIiByPSI2LjIwNiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0VFODcwMDsiIGN4PSIzMjYuNzM3IiBjeT0iMzczLjk5OCIgcj0iNi4yMDYiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNFRTg3MDA7IiBjeD0iMTkyLjM4MiIgY3k9IjQxNS44MyIgcj0iNi4yMDYiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNFRTg3MDA7IiBjeD0iMTY4LjEyNSIgY3k9IjQyNi44NzYiIHI9IjYuMjA2Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRUU4NzAwOyIgY3g9IjE5MS4xNyIgY3k9IjQ0Ni4zMjUiIHI9IjYuMjA2Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRUU4NzAwOyIgY3g9IjE4Ni40NjUiIGN5PSIyOTEuMTEyIiByPSI2LjIwNiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0VFODcwMDsiIGN4PSIxNjguMDgzIiBjeT0iMzEwLjQwNiIgcj0iNi4yMDYiLz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNFRTg3MDA7IiBjeD0iMTk2LjcyNCIgY3k9IjMxOS44NDYiIHI9IjYuMjA2Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            />
            <h2 className="mt-3">Snacks</h2>
          </div>
          {meal !== undefined && meal.mealType.snacks ? (
            <div
              className="borderBody boxMarginBottom"
              style={{ backgroundColor: "rgba(32, 125, 255, 0.2)" }}
            >
              <img
                className="imgRecipe mt-3"
                src={meal.mealType.snacks.image}
                alt={meal.mealType.snacks.name}
              ></img>
              <h2 className="w-75 ms-5 mt-4 titleRecipeChoose">
                {meal.mealType.snacks.name}
              </h2>
              <button
                id="snacks"
                className="btn btnDeleteMenu fs-6"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </div>
          ) : (
            <div className="borderBody boxMarginBottom bg-white">
              <form
                onSubmit={onSubmitSnacks}
                className="form-inline d-flex my-lg-0 mb-5 w-75 ms-5"
              >
                <input
                  type="search"
                  className="form-control mr-sm-2"
                  name="search__snacks"
                  id="snacks"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.snacks}
                />
                <button type="submit" className="btn btn-success py-2 my-sm-0">
                  Search
                </button>
              </form>
              <Mealtype recipes={snacks} mealtype="snacks" setMeal={setMeal} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
