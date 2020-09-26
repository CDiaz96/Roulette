let button = document.querySelector('button')
let bet = document.querySelector('input').value
let playerWins = 0
let playerLoses = 0
let amount = document.getElementById('betMoney').innerHTML;

button.addEventListener('click', play)
// button for invoking the button listerner
function play() {
  wheel = document.querySelector('#wheel')

  wheel.classList.toggle("spin");

  function removeClass() {
    wheel.classList.toggle("spin");
    bet = document.querySelector('input').value
    console.log(bet)
    if (bet) {
      fetch(`/randomize`)
        .then(response => response.json())
        .then((result) => {
          winResult(result)
        });
    } else {
      console.log('Enter a Value!')
    }
  }
  setTimeout(removeClass, 2000)

}

//======This Function displays the win or loss message======//
function displayCompleteMessage(msg) {
  document.getElementById("result").innerHTML = msg;
}

// this function keeps tracks of when the player loses
function winResult(result) {

  let bet = document.querySelector('input').value
  console.log(bet)
  console.log(amount)

  if (result === 'win') {

    amount = parseInt(amount) + parseInt(bet)
    document.getElementById('betMoney').innerHTML = amount
    playerWins++
    document.getElementById("playerWins").innerHTML = playerWins;
    displayCompleteMessage("You won");
    update()

  } else {
    amount = parseInt(amount) - parseInt(bet)
    document.getElementById('betMoney').innerHTML = amount
    playerLoses++
    document.getElementById("playerLoses").innerHTML = playerLoses;
    displayCompleteMessage("You Lost");
    update()
  }
}




function update() {
  fetch('/updateDatabase', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': "playerOne",
      'playwinTotal': document.getElementById("playerWins").innerHTML,
      'playerloseTotal': document.getElementById("playerLoses").innerHTML,
      'money': document.getElementById('betMoney').innerHTML
    })
  })

}
