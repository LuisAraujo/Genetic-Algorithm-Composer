//Gene
//status ok
function Gene(note, height, durations){
   this.note = note;
   this.height = height;
   this.durations = durations;
   
}

Gene.prototype.copy = function(){
    return new Gene(this.note, this.height, this.durations );
}

Gene.prototype.mutate = function(chromo){
//console.log("ok");
    //factor of mutation
    var randomFactor = Math.random();
   
    //change note with 40%
    if(randomFactor < 0.3){
		this.note = getNewNote();
    }else if(randomFactor < 0.8){
       this.durations = getNewDuration();
    }if(randomFactor < 0.9) {
		this.height = getNewHeight(); 
    }
	

}

Gene.prototype.toString = function(){
	return note;
}