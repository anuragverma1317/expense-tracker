let expenses = [];

function addExpense() {
  let name = document.getElementById("expenseName").value;
  let amount = Number(document.getElementById("expenseAmount").value);

  if (name === "" || amount <= 0) {
    alert("Sahi naam aur amount daalo!");
    return;
  }

  let expense = { name: name, amount: amount };
  expenses.push(expense);

  displayExpenses();

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}

function displayExpenses() {
  let list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = expenses[i].name + " - ₹" + expenses[i].amount;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = function() {
      expenses.splice(i, 1);
      displayExpenses();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);

    total += expenses[i].amount;
  }

  document.getElementById("totalAmount").innerHTML = total;
}