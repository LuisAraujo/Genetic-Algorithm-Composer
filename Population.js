//time 




function Population(sizepopulation) {
	
    //Population type Chromosomu
    this.members = [];
    this.generationNumber = 0;
    this.fitness = Infinity;
	MAXNUMGENES = 20;
    
	//to complete population desired
    while(this.members.length < sizepopulation){
        //number of genes
        var chromosomu = new Chromosomu();
        //number of genes
        genesNumber = MAXNUMGENES;

        //for number genes time
        for(var i=0; i < genesNumber; i++){
            var noterandom = getNewNote();
            var heightrandom = getNewHeight();
            var durationrandom = getNewDuration();
            

            //temp gene
            var tempGene = new Gene(noterandom, heightrandom, durationrandom);
            //add gene in chromosomu
			
            chromosomu.addGene(tempGene);
        }
		
		chromosomu.calcFitness();
        //add chromosomu in population
        this.members.push(chromosomu);
    }

};

Population.prototype.sort = function() {
    this.members.sort(function(a, b) {
        return a.fitness - b.fitness;
    });

    this.members.sort()
};


Population.prototype.generation = function(numGeneration){

    var arrMembers = [];
    var oldBest = this.members[0];
	//save the best
	arrMembers.push(this.members[0]);

   for(var i = 0; i < this.members.length-2; i+=2){

       var ch = this.members[i].crossover(this.members[i+1],  "mix" );

	   ch[0].mutate();
	   ch[0].calcFitness();
	
	   ch[1].mutate();
	   ch[1].calcFitness();
       
	    arrMembers.push(ch[0]);
	    arrMembers.push(ch[1]);
	

   }
   
    arrMembers.sort(function(a, b) {
        return b.fitness - a.fitness;
    });
  
    this.members = [];
    
	for(var j = 0; j < arrMembers.length; j++){
        this.members[j] = arrMembers[j];
    }
	//VIEW

	view(this.members, this.generationNumber);
	
    this.generationNumber++;

    if((this.generationNumber > MAXGENERATION) | ( this.members[0].fitness == 0)){
		stopNow = true;
	}
    
	if(!stopNow){
      setTimeout(function(){ this.generation(numGeneration)}.bind(this), 10);	
	}else{
		view2(this.members);
	}
};





