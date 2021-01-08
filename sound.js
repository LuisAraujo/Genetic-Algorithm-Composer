var scurrentime = 0;
var fntimeline;
var limittime = 10;
var durnote = 0.2;
arrayMusic = [];
var loopmode = false;
 
function startTimeline(){
	
	//copy for array auxiliar
	var arrayMusicAux = arrayMusic.slice();
	
	//set interval
	fntimeline = setInterval(function(){
       // console.log(scurrentime.toFixed(2));
       // console.log(scurrentime.toFixed(2));
	   //length is 0, time of reset all
		if(arrayMusicAux.length == 0) {		   
			
			/*wait play last note
			if( (arrayMusic[arrayMusic.length-1][2]+arrayMusic[arrayMusic.length-1][1]) > scurrentime){
				scurrentime+=0.1;
			}*/
			
			if(loopmode){  
				arrayMusicAux = arrayMusic.slice();
				scurrentime = 0;
			
			}else if(arrayMusic[arrayMusic.length-1][1]+arrayMusic[arrayMusic.length-1][2] < scurrentime.toFixed(2)){
				//console.log(arrayMusic[arrayMusic.length-1][1]+arrayMusic[arrayMusic.length-1][2] ,scurrentime.toFixed(2))
			   stopTimeline();
			   return;
			}
		
		}else if(arrayMusicAux[0][2] == scurrentime.toFixed(2)){
				//console.log(arrayMusicAux[0][2]);
				playnote(arrayMusicAux[0][0], arrayMusicAux[0][1]);
				arrayMusicAux.shift();
		}
		
	    scurrentime += 0.01;
		currenttime = scurrentime.toFixed(2);
	   
	}, 10);	
	
}

function stopTimeline(){
 clearInterval(fntimeline);	
 scurrentime = 0;
 oscillator.stop(context.currentTime);
}


//this function get note, calculate the frenquecy and call playsound
function playnote(frenquecy, duration){
	var note = frenquecy.split(".");
	if(note[0] == "P")
		return;
	var n_frenquecy = getValueFrequency(note[0]);
    
	for(var i=1; i < note[1]; i++)
		n_frenquecy += n_frenquecy;
	
	playsound(n_frenquecy,duration);

}


function startSound(arrayParam){

	arrayMusic = arrayParam;
	
	context = new  AudioContext();
	
	if(context == null)
		context = new  webkitAudioContext();

	oscillator = context.createOscillator();
	oscillator.connect(context.destination);
	
}

//This function return values of frequency of note in 0 octave
function getValueFrequency(values){
	if(values == "C") return 32.7; 
	if(values == "C#") return 34.6;
	if(values == "D") return 36.7; 
	if(values == "D#") return 38.9;
	if(values == "E")return 41.2;	  
	if(values == "F")return 43.7;	  
	if(values == "F#")return 46.2;	  
	if(values == "G")return 49.0;	  
	if(values == "G#")return 51.9;	  
	if(values == "A") return 55.0;	  
	if(values == "A#") return 58.3;   
	if(values == "B") return 61.7;	  
}

//play sound with oscilator (frequency of note, duration of note)
function playsound(frenquecy, duration){
	oscillator = context.createOscillator();
	oscillator.connect(context.destination);
	oscillator.type = "square";
	oscillator.frequency.value = frenquecy;
	oscillator.start(0);
	oscillator.stop(context.currentTime + duration);
}
//})();