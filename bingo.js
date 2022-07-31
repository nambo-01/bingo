$(function(){
    'use strict';
   
    let
      max = 75,
      bingo = [],
      status = true,
      roulette,
      random,
      number,
      result,
      $number = $('#number'),
      $result = $('#result'),
      $sound_play = $('#sound-play'),
      $sound_pause = $('#sound-pause');
      
   
    for(var i = 1; i <= max; i++) {
      bingo.push(i);
      $number.append($('<li>').text(("0" + i).slice(-2)));
    }
   
    bingo.push('★');

    $('#button').on('click', function(){
      if(status) {
        status = false;
        (button2).disabled = true;
        $(this).text('STOP');
        $sound_play.trigger('play');
        $sound_pause.trigger('pause');
        $sound_pause[0].currentTime = 0;
   
        roulette = setInterval(function(){
          random = Math.floor(Math.random() * bingo.length);
          number = bingo[random];
          $result.text(number);
        }, 10);
        
      } else {
        status = true;
        $(this).text('START')
        $sound_pause.trigger('play');
        $sound_play.trigger('pause');
        $sound_play[0].currentTime = 0;
        
        clearInterval(roulette);
        
        result = bingo[random];
        
        $result.text(result);
        
        if(result === '★' ){
          (button2).disabled = false;
          
          const button = document.getElementById('button2'); 
          
          button.addEventListener('click', function(e) {
            
            e.preventDefault();
            bingo.pop();
            
            const inNum = document.getElementById('numForm');
            const numVal = inNum.value;
            $number.find("li").eq(parseInt(numVal, 10) - 1).addClass("hit");
            
            const index = bingo.findIndex((num) => num > numVal);
            console.log(index);
            bingo.splice(index - 1, 1);
            
            
            (button2).disabled = true;

          } );

        } else {
          bingo.splice(random, 1);
 
          $number.find('li').eq(parseInt(result, 10) - 1).addClass("hit");
        }
      }
    });
  });