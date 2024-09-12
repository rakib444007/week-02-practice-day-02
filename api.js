document.getElementById("search-btn").addEventListener('click',(event)=>{

    const searchData = document.getElementById("input-data").value;
    
    AllData(searchData);

    document.getElementById("input-data").value = "";



});


const AllData=(info)=>{

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${info}`)
    .then(res=>res.json())
    .then(data=>{
        DisplayData(data);
        
    })
    .catch((err)=>{

        const ans = document.getElementById("error");
        ans.append("Not found !")
    });



};

const DisplayData=(data)=>{
    

    data.meals.forEach(element => { 

        const container = document.getElementById("meal-container");
       

        const div = document.createElement("div");
        div.classList.add("child");

        div.innerHTML=`
        <img  class="meal-img" onclick="MealDetails('${element.idMeal}')" data-bs-toggle="modal" data-bs-target="#exampleModal" src="${element.strMealThumb}" alt="">
        <h4 class="mt-2 text-danger ">${element.strMeal}</h4>
        
        `;

        container.appendChild(div);


        
    });
    document.getElementById("search-btn").addEventListener('click',(event)=>{
        document.getElementById("error").innerText=" ";
        document.getElementById("meal-container").innerHTML= "";
        
    });

    



};

const MealDetails = (idMeal) =>{

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(res=>res.json())
    .then(data=>{

        data.meals.forEach(element => {
            // console.log(element.strIngredient1);
            const div  = document.createElement("div")
            const details = document.getElementById("modal-body");
            div.innerHTML=`
            <img id="details-img" src="${element.strMealThumb}" alt="">
            <h2>${element.strMeal}</h2>
            <h3>Ingredients</h3>


            
            `;
            details.appendChild(div);
            for(let i = 1; i <= 20; i++) {
                if(element[`strIngredient${i}`] != null && element[`strIngredient${i}`] != "") {
                    const list = document.createElement("li");
                    list.innerText = element[`strIngredient${i}`];
                    details.append(list);
                }
            }
           


        });

    });
    document.getElementById("modal-body").innerHTML = " ";

};



