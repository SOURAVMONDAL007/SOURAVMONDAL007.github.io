$(document).ready(function() {
			var newcontent = "";
			var pricelist=[];
			var ratinglist=[];
			var reviewlist=[];
			var name=[]
			var done=[]
			var success = 0;
    $("button").click(function(){
    	var url1 =$("input:text").val()
     	$.ajax({
			url: "https://completion.amazon.com/search/complete",
		        dataType: "jsonp",
		        data: {
		        q: url1,
		        "search-alias": "digital-text",
		        client: "amazon-search-ui",
		        mkt: 1,
				},
    	}).then(function(data1) {
			var content = "<div>";
			//var newcontent = "";
			//var pricelist=[];
			//var ratinglist=[];
			//var reviewlist=[];
			var url12 = "https://cors-anywhere.herokuapp.com/https://www.amazon.fr/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-text&field-keywords="
			for(i=0; i<10; i++){
				if(i>5)
					success=1;				
				url2 = url12 + data1[1][i];
				name.push(data1[1][i]);
				$.get(url2, function(response) {
					var patt=/sx-price-whole">/g;
					var sumprice=0;
					var countprice=0;
					while (patt.test(response)==true){
						var index=patt.lastIndex+1;
						if(response[index]!='<' && isNaN(response[index])==false){
							console.log(response[index]);
							sumprice=sumprice+Number(response[index]);
							console.log(sumprice)
							countprice=countprice+1;
						}
					}
					if(isNaN(sumprice/countprice)==false)
                        pricelist.push((sumprice/countprice).toFixed(1));
                    else
                    	pricelist.push(Math.floor(Math.random()*5)+1);
                    console.log("Price:  "+sumprice/countprice);			
					patt=/class="a-icon-alt">/g;
					var sumrt=0;
					var countrt=0;
					while (patt.test(response)==true){
						var index=patt.lastIndex;
						if(response[index]!='<' && isNaN(response[index])==false){
							console.log(response[index]);
							sumrt=sumrt+Number(response[index]);
							countrt=countrt+1;
						}
					}
					ratinglist.push((sumrt/countrt).toFixed(1));
					console.log("Rating:  "+sumrt/countrt);
					patt=/#customerReviews">/g;
					var sumre=0;
					var countre=0;
					while (patt.test(response)==true){
						var index=patt.lastIndex;
						var str="";
						while(response[index]!='<'){
							console.log(response[index]);
							if(response[index]!=',' && isNaN(response[index])==false){
								str+=response[index];
							}
							index++;
						}
						sumre=sumre+Number(str);
						countre=countre+1;
					}
					reviewlist.push((sumre/countre).toFixed(0));
					console.log("Review:  "+sumre/countre);
				}).then(function(){
				for(i=0; i<10; i++){
				if(typeof ratinglist[i] !== "undefined"){
					if(!done.includes(i)){
            			newcontent += "<tr class='table-info'>";
				//content += "<p>" + data1[1][i] + "</p>";
				//$('#suggested_Result_box').append("<tr><td>" + data1[1][i] + "</td>");
				//$('#suggested_Result_box').append("<td>" + pricelist[i] + "</td>");
				//$('#suggested_Result_box').append("<td>" + reviewlist[i] + "</td>");
				//$('#suggested_Result_box').append("<td>" + ratinglist[i] + "</td>");
				newcontent += "<td>" + name[i] + "</td>";
				newcontent += "<td>" + pricelist[i] + "</td>";
			    newcontent += "<td>" + ratinglist[i] + "</td>";
			    newcontent += "<td>" + reviewlist[i] + "</td>";  
			    newcontent += "</tr>";
				done.push(i);
				}
				}              
            		}
		document.getElementById("suggested_Result_box").innerHTML = newcontent; 
});
			}

	    });
           
		
	});
});
