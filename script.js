const board = document.getElementById('board');
const messageEl = document.getElementById('message');
let totalPairs = 8;
let deck = [];
let first = null, second = null;
let lock = false, moves = 0, matched = 0;

function createDeck(pairs){
  const arr = [];
  for(let i=1;i<=pairs;i++){ arr.push(i); arr.push(i); }
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}

function render(pairs){
  board.innerHTML='';
  deck = createDeck(pairs);
  deck.forEach((n, idx) => {
    const card = document.createElement('div');
    card.className='card';
    card.dataset.value = n;
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="inner">
        <div class="face front">?</div>
        <div class="face back">${n}</div>
      </div>`;
    card.querySelector('.inner').addEventListener('click', onClick);
    board.appendChild(card);
  });
  // grid columns responsive
  const cols = Math.ceil(Math.sqrt(pairs*2));
  board.style.gridTemplateColumns = 'repeat(' + Math.min(6,cols) + ', 1fr)';
  moves = 0; matched = 0; first = second = null; lock = false;
  messageEl.textContent = 'Kartlardan iki aynı sayıyı bul.';
}

function onClick(e){
  if(lock) return;
  const inner = e.currentTarget;
  const card = inner.parentElement;
  if(card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  if(!first){ first = card; return; }
  second = card;
  moves++;
  check();
}

function check(){
  const a = first.dataset.value, b = second.dataset.value;
  if(a===b){
    first.classList.add('matched');
    second.classList.add('matched');
    matched++;
    resetTurn();
    if(matched>=totalPairs) showCongrats(`🎉 Tebrikler! Tüm eşleri buldun. Hamle: ${moves}`);
  } else {
    lock = true;
    setTimeout(()=>{
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      resetTurn();
    },700);
  }
}

function resetTurn(){ first = second = null; lock = false; }

function showCongrats(text){
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = text;
  document.body.appendChild(popup);
  setTimeout(()=>popup.classList.add('show'),50);
  setTimeout(()=>{popup.classList.remove('show'); setTimeout(()=>popup.remove(),350)},2600);
}

render(totalPairs);
