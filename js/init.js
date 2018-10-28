//Global variables
var allSodas = {};
var currentMoneyInMachineByUser = 0;
var currentItem = {};
var currentMoneyInsideMachine = {};
var totalMoneyInMachine = 0;
$( document ).ready(function() {
  getSodas(function(response) {
    // Parse JSON string into object
    allSodas = JSON.parse(response).sodas;
    currentMoneyInsideMachine = JSON.parse(response).money
    allMoneyInMachine(currentMoneyInsideMachine);
    allSodas.forEach((element)=>{
      renderSoda(element)
    })
    });
});

//Render the elements
function renderSoda(sodaData){
  $('#dataOfMachine').append(
  '<div class="row">'+
  '<div class="col s12 m12">'+
    '<div class="card blue-grey darken-1">' +
      '<div class="card-content white-text">' +
        '<span class="card-title">' + sodaData.name + '</span>' +
        '<a class="btn-floating halfway-fab waves-effect waves-light red" onClick=(addSoda(' + sodaData.price + '))><i class="material-icons">add</i></a>'+
        '<p>Price: $' + sodaData.price + '</p>' +
        '<p>Available: ' + sodaData.available + ' units </p>' +
        '<p>Information: $' + sodaData.description + '</p>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '</div>'
)
}

//onClickEvents
function addSoda(price){
  $('#currentPrice').text(price)
  getSodaByPrice(price)
  console.log(currentItem)
}

function payForIt(){
  canIPayIt();
}

function canIPayIt(){
  //whole sets of validations!!
  if(totalMoneyInMachine >= currentMoneyInMachineByUser){
    //The machine can return exchange
    if(currentMoneyInMachineByUser >= currentItem.price && currentItem.available > 0){
      //the user can afford to buy it
      returnExchange(currentMoneyInMachineByUser - currentItem.price)
    }else{
      //the user can't afford it
      alert('Either, you dont have money or, we dont have the item :/ ')
    }
  }else{
    //We can't return 
    alert('We dont have enough money to give you the extra. Sorry!')
  }
}

function returnExchange(exchangeToReturn){
  alert('exchange: ' + exchangeToReturn)
  currentMoneyInsideMachine.map((row)=>{
    if(exchangeToReturn >= row.value && row.ammount > 0){
      var newExchangeToReturn = exchangeToReturn - row.value
      console.log('$' + row.value)
      console.log(newExchangeToReturn)
      return true
    }
  })

}

function changeValue (){
  currentMoneyInMachineByUser = parseInt($('#moneyByUser').val())
}



function allMoneyInMachine(allMoney){
  allMoney.forEach((money)=>{
    totalMoneyInMachine += (money.value * money.ammount)
  })
}



//GET DATA
function getSodas(callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', '../database/database.json', true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function getSodaByPrice(price){
  //Notice that price is unique, meaning, we can use it as ID. IRL this is wrong but, you get the idea
  allSodas.forEach((row)=>{
    if(row.price === price){
      //match
      currentItem = row;
    }else{
      //do nothing
    }
  })
}