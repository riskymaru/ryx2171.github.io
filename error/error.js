let time = 1000;
let count = 0;
let mydate = new Date();
let mins = mydate.getMinutes() ;

let currenttemp = 0;

console.log("plugin-added")

function checkTime(){

	mydate = new Date();
  
    currenttemp = mydate.getMinutes();
	//console.log( "Date:", mydate.getMinutes() );
  
    count +=1 ;
    //document.getElementById("demo").innerHTML =(count + ": save: " + mins  + "| time " + currenttemp);
 
    /* later */
    /*if(count > 5){
            //alert('times up')
        //location.reload();
        this.showError();
    }*/

	//forward check
	if( (mins+1) <  currenttemp && (mins != 59) ){
 		//alert('cheat: forward');
        console.log("cheat");
        clearInterval(refreshIntervalId);
        this.showError();
    }else
    //back check
    if ( (mins) > (currenttemp) && (mins != 0)){
        //alert('cheat: backwards');
        console.log("cheat2");
        clearInterval(refreshIntervalId);
        this.showError();
    }
  

  //console.log(count, "mins:", mins, "current:",mydate.getMinutes() );
  mins = mydate.getMinutes() 
}

function showError(){
	document.getElementsByClassName("popup")[0].classList.add("active");
}

var refreshIntervalId = setInterval(checkTime, time);

 
document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
    clearInterval(refreshIntervalId);
    location.reload();
});
	          	




