let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let name = document.getElementById("expenseName").value;
  let amount = Number(document.getElementById("expenseAmount").value);
  let category = document.getElementById("expenseCategory").value;
  let date = document.getElementById("expenseDate").value;

  if (name === "" || amount <= 0) {
    alert("Sahi naam aur amount daalo!");
    return;
  }

  let expense = { name: name, amount: amount, category: category, date: date };
  expenses.push(expense);

  saveToStorage();
  displayExpenses();

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}

function saveToStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
  let list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;
  let selectedFilter = document.getElementById("filterCategory").value;

  for (let i = 0; i < expenses.length; i++) {
    if (selectedFilter !== "All" && expenses[i].category !== selectedFilter) {
      continue;
    }

    let li = document.createElement("li");
    li.innerHTML = expenses[i].name + " (" + expenses[i].category + ") - ₹" + expenses[i].amount + " - " + expenses[i].date;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = function() {
      expenses.splice(i, 1);
      saveToStorage();
      displayExpenses();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);

    total += expenses[i].amount;
  }

  document.getElementById("totalAmount").innerHTML = total;
}