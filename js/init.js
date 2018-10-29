//Global variables
var allSodas = {};
var currentMoneyInMachineByUser = 0;
var currentItem = {};
var currentMoneyInsideMachine = {};
var totalMoneyInMachine = 0;
$( document ).ready(function() {
  getSodas(function(response) {
    // Parse JSON string into object
    allSodas = JSON.parse(response).sodas; //we parse the sodas
    currentMoneyInsideMachine = JSON.parse(response).money //we parse the money
    allMoneyInMachine(currentMoneyInsideMachine); //we update our local global var
    allSodas.forEach((element)=>{
      renderSoda(element) //we render each element
    })
    });
});

//Render the elements on ready
function renderSoda(sodaData){
  $('#dataOfMachine').append(
  '<div class="row">'+
  '<div class="col s12 m12">'+
    '<div class="card blue-grey darken-1">' +
      '<div class="card-content white-text">' +
        '<span class="card-title">' + sodaData.name + '</span>' +
        '<a class="btn-floating halfway-fab waves-effect waves-light red" onClick=(koakuma(' + sodaData.price + '))><i class="material-icons">add</i></a>'+
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

//Koakuma is best girl!
//We retrieve the price from the card! Of course, if they click on the event
function koakuma(price){
  $('#currentPrice').text(price)
  Patchouli(price)
  console.log(currentItem)
}

//We check if the user can actually afford it
function payForIt(){
  Remilia(); //NERD!
}

function Remilia(){ //I mean, don't get me wrong. Remilia is fine and all but...you know
  //whole sets of validations!!
  if(totalMoneyInMachine >= currentMoneyInMachineByUser){
    //The machine can return exchange
    if(currentMoneyInMachineByUser >= currentItem.price && currentItem.available > 0){
      //the user can afford to buy it
      //-------------------------------- MOST IMPORTANT METHOD!!
      sekibanki(currentMoneyInMachineByUser - currentItem.price) //Here, we all the method to format the change.
      //---------------------------------
    }else{
      //the user can't afford it
      alert('Either, you dont have money or, we dont have the item :/ ')
    }
  }else{
    //We can't return 
    alert('We dont have enough money to give you the extra. Sorry!')
  }
}
//-------------------------------- MOST IMPORTANT METHOD!!
function sekibanki(exchangeToReturn){
  console.log(exchangeToReturn)
  alert(exchangeToReturn)
}
//-------------------------------- This is just to aid you.

function changeValue (){
  currentMoneyInMachineByUser = parseInt($('#moneyByUser').val())
}



function allMoneyInMachine(allMoney){
  allMoney.forEach((money)=>{
    totalMoneyInMachine += (money.value * money.ammount)
  })
}



//GET DATA FROM LOCAL BASE
//We need to GET the data from the local server. 
function getSodas(callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('POST', '../database/database.json', true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function Patchouli(price){
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