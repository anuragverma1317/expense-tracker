let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let myChart;

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

    let editBtn = document.createElement("button");
editBtn.innerHTML = "Edit";
editBtn.onclick = function() {
  let newName = prompt("Naya naam:", expenses[i].name);
  let newAmount = prompt("Naya amount:", expenses[i].amount);

  if (newName !== null && newAmount !== null && newName !== "" && Number(newAmount) > 0) {
    expenses[i].name = newName;
    expenses[i].amount = Number(newAmount);
    saveToStorage();
    displayExpenses();
  }
};

let deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "Delete";
deleteBtn.onclick = function() {
  expenses.splice(i, 1);
  saveToStorage();
  displayExpenses();
};

li.appendChild(editBtn);
li.appendChild(deleteBtn);
    list.appendChild(li);

    total += expenses[i].amount;
  }

  document.getElementById("totalAmount").innerHTML = total;

  updateChart();
}

function updateChart() {
  let categoryTotals = {};

  for (let i = 0; i < expenses.length; i++) {
    let cat = expenses[i].category;
    let amt = expenses[i].amount;

    if (categoryTotals[cat]) {
      categoryTotals[cat] += amt;
    } else {
      categoryTotals[cat] = amt;
    }
  }

  let labels = Object.keys(categoryTotals);
  let data = Object.values(categoryTotals);

  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("expenseChart");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"]
      }]
    }
  });
}

displayExpenses();