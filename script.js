document.getElementById('searchButton').addEventListener('click', function () {
    const inputText = document.getElementById('inputText').value;
    document.getElementById('foodItems').innerHTML = '';
    if (inputText === '') {
        document.getElementById('warningText').style.display = 'block';
    }
    else {
        getFood(inputText);
        document.getElementById('warningText').style.display = 'none';
    }
});

const displayDetails = name => {
    const mainUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(mainUrl)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        });
};

const renderFoodInfo = (food) => {
    const foodIngredients = [];
    for (let i = 1; i <= 50; i++) {
        if (food[`strIngredient${i}`]) {
            foodIngredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
        }
        else {
            break;
        }
    }
    const foodInformationDiv = document.getElementById('foodInformation');
    foodInformationDiv.innerHTML = `<img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-0">
    ${foodIngredients.map((ingredient) => `<li><i class="icon-check icons"></i>${ingredient}</li>`).join('')}
    </ul>`;
};

function getFood(meal_id) {
    const foodApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_id}`;
    fetch(foodApi)
        .then(res => res.json())
        .then(data => {
            displayFoodItem(data.meals);
        });

    const displayFoodItem = foodItems => {
        const foodItemsDiv = document.getElementById('foodItems');
        if (foodItems != null) {
            foodItems.map(food => {
                const foodItemDiv = document.createElement('div');
                foodItemDiv.className = 'col-md-3';
                const foodInfo = `
                <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                </div>
                `;
                foodItemDiv.innerHTML = foodInfo;
                foodItemsDiv.appendChild(foodItemDiv);
            });
        }
        else {
            document.getElementById('warningText').style.display = 'block';
        }
    };
}
