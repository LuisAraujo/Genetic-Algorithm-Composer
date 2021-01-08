//cromossomo
function Chromosomu(genes){
	//fitness of chromosomu
    this.fitness = Infinity;
    //array of Genes
    this.genes = [];

	if(genes != undefined){
        this.genes = genes;
    }

}

//mutate function
Chromosomu.prototype.mutate = function(){

    //amount of genes could can mutate  50% of genes
    var countGene = parseInt(this.genes.length*0.5);

    //loop for change gene
   while(countGene > 0){
       countGene--;
 
       //get a gene with random index over genes length
       //var indexGene = nextInt(this.genes.length-1);
       var currentGene = this.getRandomGene();
	   if(currentGene != undefined)
		currentGene.mutate(this);
   }

};

//getting a random gene fo all genes
Chromosomu.prototype.getRandomGene = function(){
	//randon index;
	var index = parseInt( Math.random()  * this.genes.length );
	
    return this.genes[ index ];
};

//setting a gene
Chromosomu.prototype.setGenes = function(genes){

    this.genes = genes;
};

//adding a gene
Chromosomu.prototype.addGene = function(gene){
   this.genes.push(gene);
};

//remove a gene
Chromosomu.prototype.removeGene = function(index){
    this.genes.splice(index, 1);
};



/* not using */
Chromosomu.prototype.crossover = function(anotherCromo, type){
	if(type == "half")
		return this.crossoverHalfMelody(anotherCromo);
    else if(type == "mix")
		return this.crossoverMixMelody(anotherCromo);
    
};


//cossover option one
Chromosomu.prototype.crossoverHalfMelody = function(anotherCromo){

    var child1 = new Chromosomu();
    var child2 = new Chromosomu();

	for(var l=0; l< this.genes.length/2; l++){
		if( this.genes[l] != undefined)
			child1.genes[l] = this.genes[l];
		if( anotherCromo.genes[l] != undefined)
			child2.genes[l] = anotherCromo.genes[l];
		
	}
	
	for(var l=this.genes.length/2; l< this.genes.length; l++){
		if( anotherCromo.genes[l] != undefined)
			child1.genes[l] = anotherCromo.genes[l];
		if( this.genes[l] != undefined)
			child2.genes[l] = this.genes[l];
		
	}
    
	//console.log(child2);
    return [child1, child2];

}

//cossover option two
Chromosomu.prototype.crossoverMixMelody = function(anotherCromo){

    var child1 = new Chromosomu();
    var child2 = new Chromosomu();

	for(var l=0; l< this.genes.length; l++){
		if( this.genes[l] != undefined){
			if(l%2 == 0){
				child1.genes[l] = this.genes[l];
				child2.genes[l] = anotherCromo.genes[l];
			}else{
				child1.genes[l] = anotherCromo.genes[l];
				child2.genes[l] = this.genes[l];
			}
		}
					
	}
	

    return [child1, child2];

}


//copying a new reference gene
Chromosomu.prototype.copyGenes = function(){

    var newGenes = [];

    for(var i = 0; i < this.genes.length; i++){
        newGenes.push(this.genes[i].copy());
    }

    return newGenes;

}

//cal fitness of this chromosomu
Chromosomu.prototype.calcFitness = function(){

  
    var fitness = 0;
	
    var arr = [];
	
	//convert array note to comparate with harmony
	for(var l=0; l< this.genes.length; l++){
		
		for( var j = 0; j < this.genes[l].durations; j++)
			arr.push( this.genes[l].note );
	}	
	
	//if length of notes and harmonic is not equals
	if(arr.length != harmonic.length)
		fitness-=10;
	
	
	
	for(var i=0; i< harmonic.length; i++){
		
		//considering a 4/4 compass
		if((i%4 == 0) && (arr[i] != "")){
			//get notes of chords
			var chord = getFormationChords(harmonic[i]);
			console.log(chord);
			console.log(arr[i]);
			if(chord != undefined)
				//verify if note of melody is on chords formation
			  if ((arr[i] != chord[0]) && ( arr[i] != chord[1]) && ( arr[i] != chord[2]) ){
				  fitness-=10;
				  console.log("fit - 10");
			  }
		}
	}
	

	this.fitness = fitness;


	
};



Chromosomu.prototype.copy = function(){
    var c = new Chromosomu( this.copyGenes() );
    c.fitness = this.fitness;

    return c;
}


