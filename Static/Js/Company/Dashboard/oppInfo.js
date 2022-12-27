console.log('hello')

//Lets change the collups button
let show = false;
let expandBTN = document.getElementById('expand');
let collupsState = document.getElementById('collupsState');
let colArrow = document.getElementById('colArrow');

//Add event listener
expandBTN.addEventListener('click', ()=> {

    if(show ==  false){

        collupsState.innerHTML = 'Collapse';

        //expandBTN.style.backgroundColor = '#D14343';

        expandBTN.classList.add('exColor');

        colArrow.style.transform = 'rotate('+180+'deg)'; 

        show = true;

    }
    else if(show == true){

        collupsState.innerHTML = 'Expand';

        colArrow.style.transform = 'rotate('+0+'deg)'; 

        expandBTN.classList.remove('exColor');

        show = false;

    }

})
