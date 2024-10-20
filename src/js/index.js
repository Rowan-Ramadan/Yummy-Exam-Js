let Imgdata = document.getElementById("Imgdata");
let rowData = document.getElementById("rowData");
let search = document.getElementById("search");
let submitBtn;

$(document).ready(() => {
  searchName("").then(() => {
    $(".loading").fadeOut(500);
    $("body").removeClass("overflow-hidden").addClass("overflow-visible");
  });
});

function openNav() {
  $(".navbar").animate(
    {
      left: 0,
    },
    500
  );

  $(".both-nav").removeClass("fa-bars");
  $(".both-nav").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $("li a")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeNav() {
  let boxWidth = $(".navbar .menu-nav").outerWidth();
  $(".navbar").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".both-nav").addClass("fa-bars");
  $(".both-nav").removeClass("fa-x");

  $("li a").animate(
    {
      top: 300,
    },
    500
  );
}

closeNav();
$(".navbar i.both-nav").click(() => {
  if ($(".navbar").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
// meals=========================================================
function displayMeals(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `
     <div onclick="MealDetails('${array[i].idMeal}')" class="meal relative overflow-hidden group rounded-md cursor-pointer">
          <img
            class="w-full align-middle"
            src="${array[i].strMealThumb}"
            alt=""
          />
          <div
            class="layer flex items-center absolute w-full h-full bg-[#f9f6f6ca] top-full transition-all ease-in-out duration-500 group-hover:top-0"
          >
            <h3 class="text-3xl font-medium">${array[i].strMeal}</h3>
          </div>
    </div>

  `;
  }
  Imgdata.innerHTML = box;
}

searchName("");
// Categories=========================================================
async function Categories() {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);

  search.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  // console.log(response);
  // console.log(response.Categories);
  displayCategories(response.categories);
  $(".loading").fadeOut(300);
}
Categories();

function displayCategories(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `
     <div onclick="CategoriesMeals('${array[i].strCategory}')" class="meal relative overflow-hidden group rounded-md cursor-pointer">
          <img
            class="w-full align-middle"
            src="${array[i].strCategoryThumb}"
            alt=""
          />
          <div
            class="layer text-center absolute w-full h-full bg-[#f9f6f6ca] top-full transition-all ease-in-out duration-500 group-hover:top-0"
          >
            <h3 class="text-3xl font-medium">${array[i].strCategory}</h3>
            <p>${array[i].strCategoryDescription}</p>
          </div>
    </div>
  `;
  }
  Imgdata.innerHTML = box;
}
async function CategoriesMeals(Categories) {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categories}`
  );
  response = await response.json();
  // console.log(response);
  displayMeals(response.meals);
  $(".loading").fadeOut(300);
}

// Area=========================================================

async function Area() {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);
  search.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  // console.log(response);
  // console.log(response.meals);
  displayArea(response.meals);
  $(".loading").fadeOut(300);
}

function displayArea(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `
     <div onclick="areaMeals('${array[i].strArea}')" class="rounded-md text-center text-white cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x "></i>
            <h3 class="text-3xl font-medium">${array[i].strArea}</h3>
    </div>
  `;
  }
  Imgdata.innerHTML = box;
}
async function areaMeals(area) {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  // console.log(response);
  displayMeals(response.meals);
  $(".loading").fadeOut(300);
}

// Ingredients=========================================================

async function Ingredients() {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);
  search.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  // console.log(response);
  // console.log(response.meals);
  displayIngredients(response.meals.slice(0, 20));
  $(".loading").fadeOut(300);
}

function displayIngredients(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `
          <div onclick="ingredientsMeals('${
            array[i].strIngredient
          }')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="text-3xl">${array[i].strIngredient}</h3>
                        <p>${array[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
  `;
  }
  Imgdata.innerHTML = box;
}
async function ingredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  // console.log(response);
  displayMeals(response.meals);
  $(".loading").fadeOut(300);
}
// =============================================================
async function MealDetails(mealID) {
  search.innerHTML = "";
  $(".loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  response = await response.json();
  displayMealDetail(response.meals[0]);
  $(".loading").fadeOut(300);
}
function displayMealDetail(array) {
  search.innerHTML = "";
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (array[`strIngredient${i}`]) {
      ingredients += ` <li class="text-[#055160] bg-[#cff4fc] rounded-md px-3 py-1">
          ${array[`strMeasure${i}`]} ${array[`strIngredient${i}`]}</li>`;
    }
  }
  // console.log(ingredients);

  let tags = array.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
  <li class="bg-red-100 text-red-900 rounded-md px-3 py-1">
       ${tags[i]}</li>`;
  }

  let box = `
   <div class="md:col-span-1">
          <img
            class="w-full rounded-lg"
            src="${array.strMealThumb}"
            alt="Bitterballen"
            class="object-cover h-64"
          />
          <h2 class="text-3xl text-white font-semibold mt-2">
          ${array.strMeal}
          </h2>
        </div>
        <div class="md:col-span-2 text-white">
          <h2 class="text-3xl font-semibold mb-2">Instructions</h2>
          <p class="mb-4">${array.strInstructions}</p>
          <h3 class="text-2xl font-semibold">
            <span class="font-bold">Area:</span> ${array.strArea}
          </h3>
          <h3 class="text-2xl font-semibold">
            <span class="font-bold">Category:</span> ${array.strCategory}
          </h3>
          <h3 class="text-2xl">Recipes:</h3>
          <ul class="list-none flex flex-wrap gap-3 mt-5">
            ${ingredients}
          </ul>

          <h3 class="text-3xl font- mt-4 mb-4">Tags:</h3>
          <ul class="list-none flex flex-wrap gap-3">
             ${tagsStr}
          </ul>
          <div class="mt-6">
            <a
              target="_blank"
              href="${array.strSource}"
              class="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-950 rounded-md px-3 py-2"
              >Source</a
            >
            <a
              target="_blank"
              href="${array.strYoutube}"
              class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-950 rounded-md px-3 py-2"
              >Youtube</a
            >
          </div>
        </div>
  `;

  Imgdata.innerHTML = box;
}

// search name=========================================================
function searchNL() {
  rowData.innerHTML = "";
  search.innerHTML = `
  <div class="flex flex-wrap py-6">
        <div class="w-full md:w-1/2 px-2 mb-4">
          <input
          onkeyup="searchName(this.value)"
            class="block w-full px-3 py-2 text-base font-normal leading-6 appearance-none border border-gray-300 rounded-lg focus:border-custom focus:shadow-custom bg-transparent text-white focus:border-[#86b7fe] focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)] "
            type="text"
            placeholder="Search By Name"
          />
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <input 
           onkeyup="searchletter(this.value)" maxlength="1"
            class="block w-full px-3 py-2 text-base font-normal leading-6 appearance-none border border-gray-300 rounded-lg focus:border-custom focus:shadow-custom bg-transparent text-white focus:border-[#86b7fe] focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)] "
            type="text"
            placeholder="Search By First Letter"
          />
        </div>
      </div>`;

  rowData.innerHTML = "";
}
async function searchName(name) {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  // console.log(response)
  // console.log(response.meals);
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".loading").fadeOut(300);
}
async function searchletter(letter) {
  rowData.innerHTML = "";
  $(".loading").fadeIn(300);

  letter == "" ? (letter = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  response = await response.json();
  // console.log(response)
  // console.log(response.meals);
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".loading").fadeOut(300);
}

// ====================================================
async function contact() {
  Imgdata.innerHTML = "";

  rowData.innerHTML = `
  <div class="w-full max-w-screen-lg py-6">
      <div class="flex flex-wrap max-w-full px-2">
          <div class="w-full md:w-1/2 lg:w-1/2 px-3 mb-5">
              <input
              onkeyup="valid()"
                  type="text"
                  id="nameIn"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Name"
              />
              <div id="nameAlert" class="text-red-900 mt-2 p-4 rounded-md hidden bg-red-200">
                  Special characters and numbers not allowed
              </div>             
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 px-3 mb-5">
              <input
              onkeyup="valid()"
                  type="email"
                  id="emailIn"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Email"
              />
              <div id="emailAlert" class="text-red-900 mt-2 p-4 rounded-md hidden bg-red-200">
                    Email not valid *example@yyy.zzz
                </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 px-3 mb-5">
              <input
              onkeyup="valid()"
                  type="tel"
                  id="phoneIn"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Phone"
              />
              <div id="phoneAlert" class="text-red-900 mt-2 p-4 rounded-md hidden bg-red-200">
                    Enter valid Phone Number
                </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 px-3 mb-5">
              <input
              onkeyup="valid()"
                  type="number"
                  id="ageIn"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Age"
              />
              <div id="ageAlert" class="text-red-900 mt-2 p-4 rounded-md hidden bg-red-200">
                    Enter valid age
                </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 px-3 mb-5">
              <input
              onkeyup="valid()"
                  type="password"
                  id="passwordIn"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Password"
              />
              <div id="passwordAlert" class="text-red-900 mt-2 p-4 rounded-md hidden bg-red-200">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 px-3 mb-5">
              <input
              onkeyup="valid()"
                  type="password"
                  id="repasswordIn"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Repassword"
              />
              <div id="repasswordAlert" class="text-red-900 mt-2 p-4 rounded-md hidden bg-red-200">
                    Enter valid repassword 
                </div>
          </div>
      </div>
      <div class="text-center">
          <button
    id="submitBtn"
    type="button"
    class="text-red-700 border border-red-600 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled
>
    Submit
</button>
      </div>
  </div>`;
  submitBtn = document.getElementById("submitBtn");
  document.getElementById("nameIn").addEventListener("focus", () => {
    nameInTouched = true;
  });

  document.getElementById("emailIn").addEventListener("focus", () => {
    emailInTouched = true;
  });

  document.getElementById("phoneIn").addEventListener("focus", () => {
    phoneInTouched = true;
  });

  document.getElementById("ageIn").addEventListener("focus", () => {
    ageInTouched = true;
  });

  document.getElementById("passwordIn").addEventListener("focus", () => {
    passwordInTouched = true;
  });

  document.getElementById("repasswordIn").addEventListener("focus", () => {
    repasswordInTouched = true;
  });
}
let nameInTouched = false;
let emailInTouched = false;
let phoneInTouched = false;
let ageInTouched = false;
let passwordInTouched = false;
let repasswordInTouched = false;

function valid() {
  if (nameInTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.remove("block");
      document.getElementById("nameAlert").classList.add("hidden");
    } else {
      document.getElementById("nameAlert").classList.remove("hidden");
      document.getElementById("nameAlert").classList.add("block");
    }
  }
  if (emailInTouched) {
    if (emailValidation()) {
      document.getElementById("emailAlert").classList.remove("block");
      document.getElementById("emailAlert").classList.add("hidden");
    } else {
      document.getElementById("emailAlert").classList.remove("hidden");
      document.getElementById("emailAlert").classList.add("block");
    }
  }

  if (phoneInTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.remove("block");
      document.getElementById("phoneAlert").classList.add("hidden");
    } else {
      document.getElementById("phoneAlert").classList.remove("hidden");
      document.getElementById("phoneAlert").classList.add("block");
    }
  }

  if (ageInTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.remove("block");
      document.getElementById("ageAlert").classList.add("hidden");
    } else {
      document.getElementById("ageAlert").classList.remove("hidden");
      document.getElementById("ageAlert").classList.add("block");
    }
  }

  if (passwordInTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.remove("block");
      document.getElementById("passwordAlert").classList.add("hidden");
    } else {
      document.getElementById("passwordAlert").classList.remove("hidden");
      document.getElementById("passwordAlert").classList.add("block");
    }
  }
  if (repasswordInTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.remove("block");
      document.getElementById("repasswordAlert").classList.add("hidden");
    } else {
      document.getElementById("repasswordAlert").classList.remove("hidden");
      document.getElementById("repasswordAlert").classList.add("block");
    }
  }

if (
  nameValidation() &&
  emailValidation() &&
  phoneValidation() &&
  ageValidation() &&
  passwordValidation() &&
  repasswordValidation()) {
  submitBtn.removeAttribute("disabled");
  submitBtn.classList.remove("cursor-not-allowed");
  submitBtn.classList.add("hover:bg-red-600", "hover:text-white", "focus:ring-4", "focus:outline-none", "focus:ring-red-300",);
} else {
  submitBtn.setAttribute("disabled", true);
  submitBtn.classList.add("cursor-not-allowed");
  submitBtn.classList.remove("bg-red-600", "text-white");
}
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameIn").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailIn").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneIn").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageIn").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordIn").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordIn").value ==
    document.getElementById("passwordIn").value
  );
}
