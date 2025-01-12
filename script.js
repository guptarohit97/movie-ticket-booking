const container=document.querySelector('.container');
const seats=document.querySelectorAll('.roe .seat:not(.occupied)');
const count=document.getElementById('count')
const total=document.getElementById('total')
const movieSelect=document.getElementById('movie')

// populateUI()

let ticketPrize=+movieSelect.value;

function selectMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected')
    const seatsIndex=[...selectedSeats].map(seat=>[...seats].indexOf(seat))

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const selectedSeatsCount=selectedSeats.length;
    // const selectedSeatsCount=selectedSeats.length;
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrize;
}
function populateUI(){

    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!==null && selectedSeats.length>0)
    {
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!==null)
    {
        movieSelect.selectedIndex=selectedMovieIndex;
    }
}
movieSelect.addEventListener('click', e=>{
    ticketPrize=+e.target.value;
    selectMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

container.addEventListener("click",function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
    }
    updateSelectedCount();
});

updateSelectedCount();