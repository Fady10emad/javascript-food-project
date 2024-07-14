$(document).ready(function () {
  function toggleSideNav() {
    $(".side-nav").toggleClass("closed");
    $(".logo-bars i:first").toggleClass("fa-bars fa-x");
  }

  $(".click-to-change").click(function () {
    toggleSideNav();
  });

  $(".side-nav li a").click(function () {
    toggleSideNav();
  });
});

$("document").ready(function () {
  $(".loadingScreen").fadeOut(1000);
});
$("content").ready(function () {
  $(".loadingScreen").fadeOut(1000);
});

let SearchContnet = document.getElementById("SearchContnet");
let CategoryContnet = document.getElementById("CategoryContnet");
let AreaContnet = document.getElementById("AreaContnet");
let IngredientContent = document.getElementById("IngredientContent");
let ContactContnet = document.getElementById("ContactContnet");

let content = document.getElementById("content");
let rowdata = document.getElementById("rowdata");

SearchContnet.addEventListener("click", function () {
  content.innerHTML = "";
  rowdata.innerHTML = "";

  content.innerHTML = `
  
          <h2 class="text-center my-3"> Search For Your Meal </h2>

    <div class="row py-4">
      <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" id="firstletter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
    </div>
  `;
});

function displayMeals(arr) {
  rowdata.innerHTML = "";

  let temp = ` <h2 class="text-center mb-4">Discover Deliciousness</h2>`;

  for (let i = 0; i < arr.length; i++) {
    temp += `
       <div class="col-md-3">
                    <div class="item position-relative overflow-hidden m-3" onclick="getDetails('${arr[i].idMeal}')">
                        <img src="${arr[i].strMealThumb}" class="w-100 rounded-3 " alt="">
                        <div class="layer text-center">
                            <h4 class="text-dark">${arr[i].strMeal}</h4>
                        </div>
                    </div>
                </div> 

      `;
  }
  rowdata.innerHTML = temp;
}

searchByName("");

async function searchByName(value) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    let data = await response.json();
    // console.log(data);

    if (data.meals) {
      displayMeals(data.meals);
    } else {
      rowdata.textContent = "No meals found.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function searchByFLetter(value) {
  if (!document.getElementById("firstletter").value) value = "a";
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
    );
    let data = await response.json();
    // console.log(data);

    if (data.meals) {
      displayMeals(data.meals);
    } else {
      rowdata.textContent = "No meals found.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function DisplayCategory(arr) {
  rowdata.innerHTML = "";
  let temp = `<h2 class="text-center mb-2"> Meals Categorys </h2>`;

  for (let i = 0; i < arr.length; i++) {
    temp += `
       <div class="col-md-3">
                    <div class="item position-relative overflow-hidden m-3" onclick="getByCatecory('${
                      arr[i].strCategory
                    }')">
                        <img src="${
                          arr[i].strCategoryThumb
                        }" class="w-100 rounded-3 " alt="">
                        <div class="layer text-center"> 
                            <h4 class="text-dark">${arr[i].strCategory}</h4>
                            <p class="text-dark px-2">${arr[i].strCategoryDescription
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}</p>
                        </div>
                    </div>
                </div> 

      `;
  }
  rowdata.innerHTML = temp;
}

CategoryContnet.addEventListener("click", async function () {
  content.innerHTML = "";
  rowdata.innerHTML = "";

  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let data = await response.json();
    // console.log(data.categories);

    DisplayCategory(data.categories);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function getByCatecory(categoryStr) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryStr}`
    );
    let data = await response.json();
    // console.log(data);
    displayMeals(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function DisplayArea(arr) {
  rowdata.innerHTML = "";
  let temp = `<h2 class="text-center mb-2"> Choose Area </h2>`;

  for (let i = 0; i < arr.length; i++) {
    temp += `
    
       <div class="col-md-3">
                    <div class="area-icon m-3 text-center fs-3" onclick="getByArea('${arr[i].strArea}')" >
                     <i class="fa-solid fa-earth-europe"></i>
                      <p> ${arr[i].strArea} </p>
                   
                    </div>
                </div> 

      `;
  }
  rowdata.innerHTML = temp;
}

AreaContnet.addEventListener("click", async function () {
  content.innerHTML = "";
  rowdata.innerHTML = "";

  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let data = await response.json();
    // console.log(data.meals);

    DisplayArea(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function getByArea(AreaStr) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaStr}`
    );
    let data = await response.json();
    // console.log(data);
    displayMeals(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function DisplayIngredient(arr) {
  rowdata.innerHTML = "";
  let temp = `<h2 class="text-center mb-2"> Meals Category </h2>`;

  for (let i = 0; i < 20; i++) {
    temp += `
    
<div class="col-md-3">
    <div class="area-icon m-3 text-center fs-3" onclick="getByIngredient('${
      arr[i].strIngredient
    }')">
        <i class="fa-solid fa-drumstick-bite"></i>
        <h3>${arr[i].strIngredient}</h3>
          <p class="fs-6">${arr[i].strDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
    </div>
</div>


      `;
  }
  rowdata.innerHTML = temp;
}

IngredientContent.addEventListener("click", async function () {
  content.innerHTML = "";
  rowdata.innerHTML = "";

  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let data = await response.json();
    // console.log(data.meals);

    DisplayIngredient(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function getByIngredient(IngredientStr) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientStr}`
    );
    let data = await response.json();
    // console.log(data);
    displayMeals(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function DisplayDetails(Details) {
  content.innerHTML = "";
  rowdata.innerHTML = "";

  let RecipesArray = [];

  for (let i = 1; i <= 20; i++) {
    let ingredientKey = `strIngredient${i}`;
    let measureKey = `strMeasure${i}`;

    if (Details[ingredientKey] && Details[ingredientKey].trim() !== "") {
      let ingredient = Details[ingredientKey];
      let measure = Details[measureKey] ? Details[measureKey] : "";
      let item = `${measure} ${ingredient}`;
      RecipesArray.push(item);
    }
  }
  // console.log(RecipesArray)

  let tags = Details.strTags ? Details.strTags.split(",") : [];

  rowdata.innerHTML = `
  
   <div class="col-md-4">
                    <div class="cardd">
                        <img src="${
                          Details.strMealThumb
                        }" class="w-100 rounded-3" alt="">
                        <h4 class="text-center mt-3">${Details.strMeal}</h4>
                    </div>
    </div>

    <div class="col-md-8">

                    <h3>Instructions</h3>
                    <p>${Details.strInstructions}</p>

                    <h3>Area : ${Details.strArea}</h3>
                    <h3>Category : ${Details.strCategory}</h3>

                    <h4>Recipes :</h4>

                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                       ${RecipesArray.map(
                         (item) =>
                           `<li class="alert alert-info m-2 p-1">${item}</li>`
                       ).join("")}                  
                    </ul>

                    <h4>Tags :</h4>

                    <ul class="list-unstyled d-flex flex-wrap">

 ${
   tags.length > 0
     ? tags
         .map((item) => `<li class="alert alert-danger m-2 p-1">${item}</li>`)
         .join("")
     : '<li class="alert alert-warning m-2 p-1">No tags available</li>'
 }


                    </ul>

                  <a href="${
                    Details.strSource
                  }" class="btn btn-success" target="_blank"> Source </a>
                  <a href="${
                    Details.strYoutube
                  }" class="btn btn-danger" target="_blank"> YouTube </a>



                </div>



  
  `;
}

async function getDetails(MealID) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealID}`
    );
    let data = await response.json();
    console.log(data.meals[0]);
    DisplayDetails(data.meals[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

ContactContnet.addEventListener("click", function () {
  content.innerHTML = "";
  rowdata.innerHTML = "";
  content.innerHTML =`
  
  <div class="vh-100  d-flex flex-column justify-content-center align-items-center">
    <form>
        <div class="row g-4 container w-75 align-items-center justify-content-center">
            <div class="col-5">
                <input type="text" id="inputName" placeholder="Enter Your Name" class="form-control" onkeyup="validNameFunction(this.value)">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-5">
                <input type="email" id="inputEmail" placeholder="Enter Your Email" class="form-control" onkeyup="validEmailFunction(this.value)">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-5">
                <input type="number" id="inputPhone" placeholder="Enter Your Phone" class="form-control" onkeyup="validPhoneFunction(this.value)">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-5">
                <input type="number" id="inputAge" placeholder="Enter Your Age" class="form-control" onkeyup="validAgeFunction(this.value)">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-5">
                <input type="password" id="inputPassword" placeholder="Enter Your Password" class="form-control" onkeyup="validPasswordFunction(this.value)">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-5">
                <input type="password" id="inputRePassword" placeholder="Repassword" class="form-control" onkeyup="validRepasswordFunction(this.value)">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
    </form>
    <button type="button" id="submitButton" class="btn btn-outline-danger my-3" disabled>Submit</button>
</div>

  
  
  `;
});

function toggleAlert(isValid, alertId) {
  document
      .getElementById(alertId)
      .classList.replace(
          isValid ? "d-block" : "d-none",
          isValid ? "d-none" : "d-block"
      );
  checkAllFieldsValid();
}

function validNameFunction(value) {
  const isValid = /^[a-zA-Z ]+$/.test(value);
  toggleAlert(isValid, "nameAlert");
}

function validEmailFunction(value) {
  const isValid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
      );
  toggleAlert(isValid, "emailAlert");
}

function validPhoneFunction(value) {
  const isValid =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);
  toggleAlert(isValid, "phoneAlert");
}

function validAgeFunction(value) {
  const isValid = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(value);
  toggleAlert(isValid, "ageAlert");
}

function validPasswordFunction(value) {
  const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
  toggleAlert(isValid, "passwordAlert");
}

function validRepasswordFunction(value) {
  const isValid = document.getElementById("inputPassword").value === value;
  toggleAlert(isValid, "repasswordAlert");
}

function checkAllFieldsValid() {
  const isNameValid = /^[a-zA-Z ]+$/.test(document.getElementById("inputName").value);
  const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("inputEmail").value);
  const isPhoneValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("inputPhone").value);
  const isAgeValid = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("inputAge").value);
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("inputPassword").value);
  const isRepasswordValid = document.getElementById("inputPassword").value === document.getElementById("inputRePassword").value;

  const allValid = isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid;
  document.getElementById("submitButton").disabled = !allValid;
}
