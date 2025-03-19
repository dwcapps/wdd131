import recipes from "./recipes.mjs";

function recipeTemplate(info){
    return `<article class="recipe">
            <img src=${info.image} alt="Image of ${info.name}">
            <div class="recipe-info">
                <div class="tag-container">
                    ${tagsTemplate(info)}
                </div>
                <h2 class="name">${info.name}</h2>
                ${ratingTemplate(info)}
                <p class="description">${info.description}</p>
            </div>
        </article>`;
}

function tagsTemplate(info){
    let template = ``;
    info.tags.forEach(tag => {
        template += `<span class="tags">${tag}</span>`;
    });
    return template;
}

function ratingTemplate(info){
    let rating = parseFloat(info.rating);
    let template = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++){
        if (rating > 0){
            if (rating < 1){
                template += `<span aria-hidden="true" class="half-symbol">½</span>`;
                rating = 0;
            }
            else {
                template += `<span aria-hidden="true" class="icon-star">⭐</span>`;
                rating -= 1;
            }
        }
        else{
            template += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    template += `</span>`;
    return template;
}

function renderRecipes(recipeList) {
    const mainElement = document.querySelector("main");
    recipeList.forEach(recipe => {
        let template = recipeTemplate(recipe);
        mainElement.insertAdjacentHTML("beforeend", template);
    });
}

function searchHandler(event){
    event.preventDefault();
    let searchQuery = document.querySelector(".search-bar").value.toLowerCase();
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    let result = filterRecipes(searchQuery);
    renderRecipes(result);
}

function filterRecipes(query){
    let filtered = recipes.filter(recipe => filterBy(recipe, query));
    let sorted = filtered.sort((a,b) => a.name.localeCompare(b.name));
    return sorted;
}

function filterBy(recipe, query){
    // not compact for readability purposes
    if (recipe.name.toLowerCase().includes(query)){
        return true;
    }
    if (recipe.description.toLowerCase().includes(query)){
        return true;
    }
    if (recipe.tags.some(tag => tag.toLowerCase().includes(query))) { 
        return true;
    }
    if (recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))) {
        return true;
    }
    return false;
}

function randomRecipe(){
    let index = Math.floor(Math.random()*recipes.length);
    return recipes[index];
}

function init() {
    renderRecipes([randomRecipe()]);

    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", searchHandler);
}

init();