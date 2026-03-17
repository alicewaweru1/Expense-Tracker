let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses(){
localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(){

let description = document.getElementById("description").value;
let amount = document.getElementById("amount").value;
let category = document.getElementById("category").value;

if(description === "" || amount === "" || category === ""){
alert("Please fill all fields");
return;
}

let expense = {
id: Date.now(),
description,
amount: Number(amount),
category
};

expenses.push(expense);

saveExpenses();

displayExpenses();

updateCategories();

clearInputs();
}

function clearInputs(){
document.getElementById("description").value="";
document.getElementById("amount").value="";
document.getElementById("category").value="";
}

function displayExpenses(list = expenses){

let expenseList = document.getElementById("expenseList");

expenseList.innerHTML="";

list.forEach(expense => {

let li = document.createElement("li");

li.className="flex justify-between bg-gray-100 p-2 rounded";

li.innerHTML = `
<span>
${expense.description} - Ksh ${expense.amount} (${expense.category})
</span>

<button class="bg-red-500 text-white px-2 rounded"
onclick="deleteExpense(${expense.id})">
Delete
</button>
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

let total = list.reduce((sum, expense)=> sum + expense.amount,0);

document.getElementById("total").textContent = total;

}

function updateCategories(){

let filter = document.getElementById("filterCategory");

let categories = [...new Set(expenses.map(exp => exp.category))];

filter.innerHTML = <option value="all">All Categories</option>;

categories.forEach(cat=>{

let option = document.createElement("option");

option.value = cat;
option.textContent = cat;

filter.appendChild(option);

});

}

function filterExpenses(){

let selected = document.getElementById("filterCategory").value;

if(selected === "all"){
displayExpenses();
}else{

let filtered = expenses.filter(exp => exp.category === selected);

displayExpenses(filtered);

}

}

displayExpenses();

updateCategories();