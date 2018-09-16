//Arrays werden generiert

first = new Array();
second = new Array();
third = new Array();

var checkdiv = null;
versuche = 0;
gewonnen = false;

first.push(["Kreis4",4]);
first.push(["Kreis3",3]);
first.push(["Kreis2",2]);
first.push(["Kreis1",1]);

//initialisiert alle Elemente in das Array,es gibt verschachtelte Arrays 

function buildStacks(){
	try{
		for(var i=0;i<first.length;i++){
			var html ='<div class="element'+i+' stack1element" id="'+first[i][0]+'"></div>';
			//var html = '<li class="ui-state-default"><div id="'+first[i]+'"></div></li>';
			$("#stack1").append(html);
		}
		for(var i=0;i<second.length;i++){
			var html ='<div class="element'+i+' stack2element" id="'+second[i][0]+'"></div>';
			//var html = '<li class="ui-state-default"><div id="'+second[i]+'"></div></li>';
			$("#stack2").append(html);
		}
		for(var i=0;i<third.length;i++){
			var html ='<div class="element'+i+' stack3element" id="'+third[i][0]+'"></div>';
			//var html = '<li class="ui-state-default"><div id="'+third[i]+'"></div></li>';
			$("#stack3").append(html);
		} // erstellt die Kreise
		for(var i=0;i<1;i++){
			var html ='<p id="counter">Counter:</p><p id="counterout">'+versuche+'</p>';
			//var html = '<li class="ui-state-default"><div id="'+third[i]+'"></div></li>';
			$("#counterbox").append(html);
		}  // erstellt die counter-box
		if(gewonnen == true){
			var html ='<div id="winbox"><p id="wintext">Du hast gewonnen</p><p class="wintextunter">mit '+versuche+' Zuegen!</p>'+
			'<p class="wintextunter">Willst du nochmal spielen?</p>'+ '<input class="selectbuttons" onclick="reset()" type="button" value="Ja"/>'+
			'<input style="margin-left:10px;" class="selectbuttons" onclick="" type="button" value="Nein"/>'+'</div>';
			$("#oberdiv").append(html);
		}
		console.log(first.length)

		// macht die elemente vom stack draggable

		if(first.length != 0){
			$("#"+first[(first.length - 1)][0]+".stack1element").draggable({ revert: true });
		}
		if(second.length != 0){
			$("#"+second[(second.length - 1)][0]+".stack2element").draggable({ revert: true });
	    }
		if(third.length != 0){
			$("#"+third[(third.length - 1)][0]+".stack3element").draggable({ revert: true });
	    }
	    
	 
	   	$("#stack3").droppable({
	    	drop: function(ui,event){
	    		if($(".ui-draggable-dragging").is(".stack1element") == true){
	            	ganzrechts();
	    			}
	    		if($(".ui-draggable-dragging").hasClass("stack2element") == true){
	            	brechts2();
	    			}
	            } 
			});

		$("#stack2").droppable({
	    	drop: function(ui,event){
	    		if($(".ui-draggable-dragging").hasClass("stack3element") == true){
	            	blinks3();
	    			}
	    		if($(".ui-draggable-dragging").hasClass("stack1element") == true){
	            	brechts1();
	    			}
	            }
			});

		$("#stack1").droppable({ // macht die stacks droppable
	    	drop: function(ui,event){
	    		if($(".ui-draggable-dragging").hasClass("stack3element") == true){
	            	ganzlinks();
	    			}
	    		if($(".ui-draggable-dragging").hasClass("stack2element") == true){
	            	blinks2();
	    			}
	            } 
			});	    
	}
	catch(e){
		console.log(e);
	}
}

// stellt alles wieder zurück

function reset(){
	first = new Array();
	second = new Array();
	third = new Array();
	versuche = 0;
	gewonnen = false;
	first.push(["Kreis4",4]);
	first.push(["Kreis3",3]);
	first.push(["Kreis2",2]);
	first.push(["Kreis1",1]);
	$('#oberdiv').load('ajax.html',function(){
		buildStacks();
	});
}

function brechts1(){
	if (first.length > 0){
		checkint = true;
		second.push(first[first.length - 1]);
		console.log(first[first.length - 1] + " zu Second, Gesamt(first):" + first);
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});	
		check(first,second,checkint);
		console.log(checkint);
		if(checkint == true){
			versuche++
			first.pop();
			$('#oberdiv').load('ajax.html',function(){
				buildStacks();
			});
		}	
	}
	else if(first.length == 0){
	console.log("Array ist leer,nichts wird verschoben");
	}
		console.log("Menge von second: " + second);
}

function blinks2(){
	if (second.length > 0){
		checkint = true;
		first.push(second[second.length - 1]);
		console.log(second[second.length - 1] + " zu First, Gesamt(second): " + second);
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});	
		check(second,first,checkint);
		console.log(checkint);
		if(checkint == true){
			versuche++
			second.pop();
			$('#oberdiv').load('ajax.html',function(){
				buildStacks();
			});
		}	
	}
	else if(second.length == 0){
	console.log("Array ist leer,nichts wird verschoben");
	}
		console.log("Menge von first: " + first);
}

function brechts2(){
	if (second.length > 0){
		checkint = true;
		third.push(second[second.length - 1]);
		console.log(second[second.length - 1] + " zu Third, Gesamt(second): " + second);
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});	
		check(second,third,checkint);
		console.log(checkint);
		if(checkint == true){
			versuche++
			second.pop();
			hastdugewonnen();
			$('#oberdiv').load('ajax.html',function(){
				buildStacks();
			});
		}	
	}
	else if(second.length == 0){
	console.log("Array ist leer,nichts wird verschoben");
	}
		console.log("Menge von third:" + third);
}

function blinks3(){
	if (third.length > 0){
		checkint = true;
		second.push(third[third.length - 1]);
		console.log(third[third.length - 1] + " zu Second, Gesamt(third): " + third);
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});	
		check(third,second,checkint);
		console.log(checkint);
		if(checkint == true){
			versuche++
			third.pop();
			$('#oberdiv').load('ajax.html',function(){
				buildStacks();
			});
		}	
	}
	else if(third.length == 0){
	console.log("Array ist leer,nichts wird verschoben");
	}
		console.log("Menge von second: " + second);
}

function ganzrechts(){
	if (first.length > 0){
		checkint = true;
		third.push(first[first.length - 1]);
		console.log(first[first.length - 1] + " zu Third, Gesamt(first): " + first);
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});	
		check(first,third,checkint);
		console.log(checkint);
		if(checkint == true){
			versuche++
			first.pop();
			hastdugewonnen();
			$('#oberdiv').load('ajax.html',function(){
				buildStacks();
			});
		}	
	}
	else if(first.length == 0){
	console.log("Array ist leer,nichts wird verschoben");
	}
		console.log("Menge von third: " + third);
}

function ganzlinks(){
	if (third.length > 0){
		checkint = true;
		first.push(third[third.length - 1]);
		console.log(third[third.length - 1] + " zu First, Gesamt(third): " + third)
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});	
		check(third,first,checkint);
		console.log(checkint);
		if(checkint == true){
			versuche++
			third.pop();
			$('#oberdiv').load('ajax.html',function(){
				buildStacks();
			});
		}	
	}
	else if(third.length == 0){
	console.log("Array ist leer,nichts wird verschoben");
	}
		console.log("Menge von first: " + first);
}

// checkt ob die Regeln eingehalten werden

function check(ary,nextary){
	console.log(ary[ary.length - 1][1]);
	console.log(nextary[nextary.length - 1][1])
	if (nextary.length > 1){
		if(ary[ary.length - 1][1] > nextary[nextary.length - 2][1]){
			console.log("Geht nicht der Kreis der verschoben wird ist groesser als der naechste");
			nextary.pop();
			checkint = false;
		}
		else{
			console.log("test23551")
		}
	}
}

// checkt ob der spieler gewonnen hat

function hastdugewonnen(){
	if(third.length == 4){
		console.log("Du hast gewonnen und hast "+versuche+" Versuche gebraucht");
		gewonnen = true;
		$('#oberdiv').load('ajax.html',function(){
			buildStacks();
		});
	}
}