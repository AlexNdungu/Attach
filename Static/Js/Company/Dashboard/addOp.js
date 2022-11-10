//First we hide the drop down
$('#the_level_drop_it').hide();
$('#the_level_drop_it1').hide();


//Now we perform the drop
let level_btn = document.getElementById('level_drop_btn');

let drop_svg_level = document.getElementById('drop_svg_level');

let level_drop_status = false;

level_btn.addEventListener('click', ()=> {

    if(level_drop_status == false){

        $('#the_level_drop_it').show(200);

        level_drop_status = true;

        //Rotate the drop
        drop_svg_level.style.rotate = '180deg';
    }
    else{
        $('#the_level_drop_it').hide(200);

        level_drop_status = false;

        drop_svg_level.style.rotate = '0deg';

    }

});

//Now we add value to the input
let lev_selects = document.getElementsByClassName('lev_select');

let level_put = document.getElementById('level_put');

for(let q = 0; q < lev_selects.length; q++ ){

    lev_selects[q].addEventListener('click', ()=> {

        level_put.value = lev_selects[q].innerText;

        $('#the_level_drop_it').hide(200);


    });

}


//Location

//Now we perform the drop
let level_btn1 = document.getElementById('level_drop_btn1');

let drop_svg_level1 = document.getElementById('drop_svg_level1');

let level_drop_status1 = false;

level_btn1.addEventListener('click', ()=> {

    if(level_drop_status1 == false){

        $('#the_level_drop_it1').show(200);

        level_drop_status1 = true;

        //Rotate the drop
        drop_svg_level1.style.rotate = '180deg';
    }
    else{
        $('#the_level_drop_it1').hide(200);

        level_drop_status1 = false;

        drop_svg_level1.style.rotate = '0deg';

    }

});

//Now we add value to the input
let lev_selects1 = document.getElementsByClassName('lev_select1');

let level_put1 = document.getElementById('level_put1');

for(let q = 0; q < lev_selects1.length; q++ ){

    lev_selects1[q].addEventListener('click', ()=> {

        level_put1.value = lev_selects1[q].innerText;

        $('#the_level_drop_it1').hide(200);


    });

}