
var fnsort=function(){			
			
					var oTab=document.getElementById("table");
					var aTr=oTab.getElementsByTagName("tr");
					var oBtn1=document.getElementById("btn1");
					var oBtn2=document.getElementById("btn2");
					var arr=[];
					
					//
					//数字排序
					
					oBtn2.onclick=function(){
						arr=[];
						for(var i=1;i<aTr.length;i++){					
						arr.push(aTr[i]);					
						}	
						arr.sort(function(num1,num2){return parseInt(num1.children[2].innerHTML-parseInt(num2.children[2].innerHTML))							
						})
						numSort(arr,oTab,aTr)
											
					}

					//文字首字母排序
					
					oBtn1.onclick = function(){
						arr=[];
						for(i=1;i<aTr.length;i++){
						arr.push(aTr[i])							
						}
				
						arr.sort(function(str1,str2){
							return str1.children[1].innerHTML.localeCompare(str2.children[1].innerHTML)
							
						})
						numSort(arr,oTab,aTr);
					}

					function numSort(arr,oTab,aTr){
							var j=aTr.length-1;													
							var oParent=oTab.children[1];
							for(var i=j;i>0;i--){
								oParent.removeChild(aTr[i]);
							}
							for(var i=0;i<arr.length;i++){
								var aTr2=document.createElement('tr');
								for(j=0;j<arr[i].children.length;j++){
									var aTd=document.createElement('td');
									aTd.innerHTML=arr[i].children[j].innerHTML
									aTr2.appendChild(aTd)				
									}
							
								oParent.appendChild(aTr2)	
								
							}
					}		
					
			
}			