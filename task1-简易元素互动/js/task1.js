function changeContent(number){
			console.log(number);
			var h=document.getElementById("head1");
			var p=document.getElementById("p1");

			if (number==1) {
				head1.innerHTML="Step1";
				p.innerHTML="这是状态一的情况这是状态一的情况这是状态一的情况这是状态一的情况这是状态一的情况";
				changeButton("step"+number);

			}
			if (number==2) {
				head1.innerHTML="Step2";
				p.innerHTML="这是状态二的情况这是状态二的情况这是状态二的情况这是状态二的情况这是状态二的情况";
				changeButton("step"+number);
			}
			if (number==3) {
				head1.innerHTML="Step3";
				p.innerHTML="这是状态三的情况这是状态三的情况这是状态三的情况这是状态三的情况这是状态三的情况";
				changeButton("step"+number);
			}
			if (number==4) {
				head1.innerHTML="Step4";
				p.innerHTML="这是状态四的情况这是状态四的情况这是状态四的情况这是状态四的情况这是状态四的情况";
				changeButton("step"+number);
			}
			if (number==5) {			
				head1.innerHTML="Step5";
				p.innerHTML="这是状态五的情况这是状态五的情况这是状态五的情况这是状态五的情况这是状态五的情况";
				changeButton("step"+number);
			}
		}
	function changeButton(id){
		var button=document.getElementsByName("button");
		console.log(button);

		for(var i=0;i<button.length;i++){
            console.log(button[i].id+":"+id);
            var style=button[i].style;
			if(button[i].id==id){

				button[i].style.background="-webkit-gradient(linear, 0% 0%, 0% 100%,from(red), to(orange))";
				button[i].style.transform="scale("+1.2+")";
				button[i].style.color="white";
				button[i].style.fontSize=20+"px";
			}else{
				button[i].style=style;
			}
		}
	}