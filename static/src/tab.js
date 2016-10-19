module.exports=function(arr1,arr2){	
	var len=arr1.length,
		len2=arr2.length;
		
	for(var i=0;i<len;i++){
		
		arr1[i].index=i;
		arr1[i].onclick=function(){
			if(aDiv[this.index].style.display=='block'){
				aDiv[this.index].style.display='none'

			}else{
				for(var j=0;j<len2;j++){
				
					arr2[j].style.display='none';				
					}
				arr2[this.index].style.display='block';
			
				//this.className='active'
			}
			
		}
	}	
}
	