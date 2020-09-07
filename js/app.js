// DOM Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Dummy Transactions
const dummyTransactions = [
  {id:1, text:'Flower', amount: -20},
  {id:2, text:'Salary', amount: 300},
  {id:3, text:'Book', amount: -10},
  {id:4, text:'Camera', amount: 150}
];


let transactions = dummyTransactions;

// Add Transaction 
function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };  
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value = '';
    amount.value = '';
  }

}


// Generate random ID
function generateID(){
  return Math.floor(Math.random() * 1000000000);
}
// Add transactions to DOM list
function addTransactionDOM(transaction){
  // Get sign
  const sign = transaction.amount < 0 ? '-': '+';
  // Create Element
  const item = document.createElement('li');
  // Add class based on value
  item.classList.add(transaction.amount < 0? 'minus': 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button> 
  `;
  list.appendChild(item);
}

// update the balance, income and expense
function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc,curr)=> acc + curr, 0).toFixed(2);
  console.log(total);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  
  const expense = Math.abs(amounts
    .filter(amount => amount < 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2));

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
  
}

//Remove transaction by ID
function removeTransaction(id){
  console.log(id);
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
  
}

// Init app

function init(){
  list.innerHTML = '';
  updateValues();
  transactions.forEach(item => addTransactionDOM(item));
}


init();

form.addEventListener('submit', addTransaction)