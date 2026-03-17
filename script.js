let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const filterCategory = document.getElementById("filterCategory");

addBtn.addEventListener("click", addExpense);

function saveExpenses(){
localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(){

if(description.value === "" || amount.value === "" || category.value === ""){
alert("Please fill all fields");
return;
}

const expense = {
id: Date.now(),
description: description.value,
amount: Number(amount.value),
category: category.value
};

expenses.push(expense);

saveExpenses();

animateButton();

displayExpenses();

updateCategories();

description.value="";
amount.value="";
category.value="";
}

function animateButton(){

addBtn.textContent="Added ✔";
addBtn.classList.add("bg-green-500");

setTimeout(()=>{
addBtn.textContent="➕ Add Expense";
addBtn.classList.remove("bg-green-500");
},1000);

}

function displayExpenses(list = expenses){

expenseList.innerHTML="";

list.forEach(expense =>{

const li=document.createElement("li");

li.className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition";

li.innerHTML=`
<div>
<p class="font-semibold text-gray-800">${expense.description}</p>
<p class="text-sm text-gray-500">${expense.category}</p>
</div>

<div class="flex items-center gap-3">

<span class="font-bold text-blue-600">Ksh ${expense.amount}</span>

<button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
onclick="deleteExpense(${expense.id})">
Delete
</button>

</div>
`;

expenseList.appendChild(li);

});

calculateTotal(list);

}

function deleteExpense(id){

expenses = expenses.filter(expense => expense.id !== id);

saveExpenses();

displayExpenses();

updateCategories();

}

function calculateTotal(list){

let sum = 0;

list.forEach(expense=>{
sum += expense.amount;
});

total.textContent=sum;

}

function updateCategories(){

filterCategory.innerHTML='<option value="all">All Categories</option>';

const categories=[...new Set(expenses.map(e=>e.category))];

categories.forEach(cat=>{

const option=document.createElement("option");

option.value=cat;
option.textContent=cat;

filterCategory.appendChild(option);

});

}

filterCategory.addEventListener("change",()=>{

if(filterCategory.value==="all"){
displayExpenses();
}else{

const filtered=expenses.filter(e=>e.category===filterCategory.value);

displayExpenses(filtered);

}

});

displayExpenses();
updateCategories();