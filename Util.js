function getNewNote(){
	
	//var arr = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
	var arr = ["C", "D", "E", "F", "G",  "A", "B", ""]
	var index  = parseInt( Math.random() * arr.length ); 
	return arr[index ];
	
}

function getNewDuration(){
	var index  = parseInt( Math.random() * 4 ); 
	return index;
}


function getNewHeight(){
	var index  = 3 + parseInt( Math.random() * 2 ); 
	return index;
}

function getHarmonicRage(tone){
	
	var harmonic = [];
	harmonic["C"] = ["C", "D", "E", "F", "G",  "A", "B"];
	harmonic["D"] = ["D", "E", "F#", "G", "A",  "B", "C#"];
	harmonic["E"] = ["E", "F#", "G#", "A", "B",  "C#", "D#"];
	harmonic["F"] = ["F", "G", "A", "A#",  "C", "D", "E"];
	harmonic["G"] = ["G", "A", "B", "C", "D",  "E", "F#"];
	harmonic["A"] = ["A", "B", "C#", "D", "E",  "F#", "G#"];
	harmonic["B"] = ["B", "C#", "D#", "E", "F#",  "G#", "A#"];
	
	return harmonic[tone];
	
}

function getFormationChords(note){
	
	//maior
	if(note == "C")
		return ["C", "E", "G"];
	else if(note == "D")
		return ["D", "F#", "A"];
	else if(note == "E")
		return ["E", "G#", "B"];
	else if(note == "F")
		return ["F", "A", "C"];
	else if(note == "G")
		return ["G", "B", "D"];
	else if(note == "A")
		return ["A", "C#", "E"];
	else if(note == "B")
		return ["B", "D#", "F#"];
	
	else if(note == "C7")
		return ["C", "D", "G"];
	else if(note == "D7")
		return ["D", "C", "A"];
	else if(note == "E7")
		return ["E", "D", "B"];
	else if(note == "F7")
		return ["F", "D#", "C"];
	else if(note == "G7")
		return ["G", "F", "D"];
	else if(note == "A7")
		return ["A", "B", "E"];
	else if(note == "B7")
		return ["B", "A", "F#"];
	
	//menor
	else if(note == "Cm")
		return ["C", "D#", "G"];
	else if(note == "Dm")
		return ["D", "F", "A"];
	else if(note == "Em")
		return ["E", "G", "B"];
	else if(note == "Fm")
		return ["F", "G#", "C"];
	else if(note == "Gm")
		return ["G", "A#", "D"];
	else if(note == "Am")
		return ["A", "C", "E"];
	else if(note == "Bm")
		return ["B", "D", "F#"];
	
}


function convertNotes( members ){
	console.log(members);
	var time = 0;
	var arrnotes = [];
	
	for(var i = 0; i < members.genes.length; i++){
		
		if(members.genes[i].note == ""){
			time += 1;
			continue;
		}
			
		
		var note = members.genes[i].note + "." + members.genes[i].height;
		var duration = 1;
		
		for(var j = i+1; j < members.genes.length; j++){
			if(members.genes[i].note == members.genes[j].note)
				duration += 1;
			else
				break;
		}
		
		var arr = [note, duration, time];
		arrnotes.push(arr);
		
		time += duration;
	}

	console.log(arrnotes);
	return arrnotes;
}


function view(members, generationNumber){
	
	
	var d = document.getElementById("body");
	
	var textnode = document.createTextNode("Generation: "+(generationNumber+1) + " size:" + +members.length);
    
	var div =  document.createElement("DIV");
	div.appendChild(textnode);
	
	d.appendChild(div);
	

	var textnode = document.createTextNode("Best Fitness: " +members[0].fitness);
	
	var div =  document.createElement("DIV");
	div.appendChild(textnode);
	
	d.appendChild(div);
    
	var str = "";
	for(var j = 0; j <members[0].genes.length; j++)
		str+= members[0].genes[j].note + " - ";
	
	var textnode = document.createTextNode(str);
	var div =  document.createElement("DIV");
	div.appendChild(textnode);
	
	d.appendChild(div);
	
}

function view2(members){
		str = "";
		for(var j = 0; j < harmonic.length; j++){
			
			str+= harmonic[j] + " - ";
		}
		
		var d = document.getElementById("harmony");
		
		var textnode = document.createTextNode(str);

		var div =  document.createElement("DIV");
		div.appendChild(textnode);

		d.appendChild(div);
		
		
		alert("G: " + this.generationNumber+1 + " - fit " + members[0].fitness);
		
		str = "";
		memberslocal = convertNotes(members[0]);
		for(var j = 0; j < memberslocal.length; j++)
			str+= memberslocal[j] + " - ";
		
		var d = document.getElementById("result");
		
		var textnode = document.createTextNode(str);

		var div =  document.createElement("DIV");
		div.appendChild(textnode);

		d.appendChild(div);

		endGeneration(memberslocal);
		
}