/// //////////////////////////////////////////////
/// //////////////////////////////////////////////
// BANKIST APP
const cargasPagina=window.localStorage.getItem('cargasPagina') || 0;
window.localStorage.setItem('cargasPagina',Number(cargasPagina)+1);


// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.innerHTML += html;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/* función que inserta un campo nuevo en lo  accounts, llamado username que tenga las iniciales
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  username: js
};



*/
const createUserNames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra[0])
      .join('');
  });
};
createUserNames(accounts);

function displayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, curval) => acc + curval, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

function displaySummary(acc) {
  // calcular y mostrar depósitos
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur, i, arr) => acc + cur, 0);

  labelSumIn.textContent = `${incomes}€`;

  // calcular  y mostrar retiradas de dinero
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur, i, arr) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  // calcular y mostrar intereses
  // versión simplificada: por cada depósito calcular su interés (según dato del account) y por un año
  // independiente de retiradas de dinero.
  // Para que el interes sea tenido en cuenta, tiene que ser superior a 1€ (cada depósito)

  // const interest = (incomes * acc.interestRate) / 100;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${interest}€`;
}

// EVENTOS ****************************

btnLogin.addEventListener('click',function (e){
  console.log('Me han pulsado');
  e.preventDefault();

  /* obtener la cuenta que nos interesa*/
  const username =inputLoginUsername.value;
  const pin =inputLoginPin.value;
  console.log(username,pin);
  console.log(currentAccount);
const currentAccount = accounts.find(acc.username === username);
if (currentAccount && currentAccount.pin === pin){
labelWelcome.textContent = 'Bienvenido ${currentAccount.owner.split(' ')[0]}';


displayMovements(account1.movements);
displayBalance(account1);
displaySummary(account1);

containerApp.style.opacity = 1;
inputLoginUsername.value='';
inputLoginPin.value='';
// quitar login si lo tiene una
inputLoginPin.blur();


}else {
  console.log('pin incorrecto');
}
});