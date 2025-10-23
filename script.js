const board=document.getElementById('board');const msg=document.getElementById('message');
let totalPairs=8;let cards=[],first=null,second=null,lock=false,moves=0,matched=0;

function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function init(){cards=[];const arr=[];for(let i=1;i<=totalPairs;i++){arr.push(i,i);}shuffle(arr);board.innerHTML='';arr.forEach(num=>{const card=document.createElement('div');card.className='card';card.innerHTML=`<div class="card-inner"><div class="card-front">?</div><div class="card-back">${num}</div></div>`;card.dataset.value=num;card.addEventListener('click',()=>flip(card));board.appendChild(card);});moves=0;matched=0;msg.textContent='İki aynı sayıyı bul!';}
function flip(card){if(lock||card.classList.contains('flipped')||card.classList.contains('matched'))return;card.classList.add('flipped');if(!first){first=card;return;}second=card;moves++;lock=true;check();}
function check(){const a=first.dataset.value,b=second.dataset.value;if(a===b){first.classList.add('matched');second.classList.add('matched');matched++;reset();if(matched===totalPairs)popup(`🎉 Tebrikler! Tüm eşleri buldun. Hamle: ${moves}`);}else{setTimeout(()=>{first.classList.remove('flipped');second.classList.remove('flipped');reset();},800);}}
function reset(){first=null;second=null;lock=false;}
function popup(text){const p=document.createElement('div');p.className='popup';p.textContent=text;document.body.appendChild(p);setTimeout(()=>p.classList.add('show'),50);setTimeout(()=>p.classList.remove('show'),2600);setTimeout(()=>p.remove(),3000);}
init();