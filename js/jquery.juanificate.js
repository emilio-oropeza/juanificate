(function($){
	$.fn.juanificate = function(options){
		return this.each(function() {
			var element = $(this);						
			if (element.data('juanificate')) return;
			var myplugin = new juanificate(this, options);
			element.data('juanificate', myplugin);
			element.data('juanificate').methods.init();
			
		});
	};
	
	var juanificate = function(target, options){
		var componentObj = {
			genero: (options != undefined && options.genero != undefined)?options.genero:"hombre",
			boca: (options != undefined && options.boca != undefined)?options.boca:1,
			escenario: (options != undefined && options.escenario != undefined)?options.escenario:1,
			ojos: (options != undefined && options.ojos != undefined)?options.ojos:1,
			outfit: (options != undefined && options.outfit != undefined)?options.outfit:1,
			pantalones: (options != undefined && options.pantalones != undefined)?options.pantalones:1,
			peinado: (options != undefined && options.peinado != undefined)?options.peinado:1,
			zapatos: (options != undefined && options.zapatos != undefined)?options.zapatos:1,
			color_choose: 1,
			posicion: "mundial",
			page: 0,
			limit_page: 5,
			index_posicion: 0,
			finish: false,
			elemnts: {
				"background":{
					"url":"images/escenarios/",
					"max1": 16,
					"max2": 0,
					"color": [],
					"needGender": false,
					"specials1": [3,7,8,9,10,11,12,14,15,16],
					"specials2": [],
					"special_tags1": ["starwars1","starwars2","ligamx","ligamx","ligamx","ligamx","ligamx","mundial",
										"mundial","mundial"],
					"special_tags2": []
				},
				"mouth":{
					"url":"images/bocas/",
					"max1": 32,
					"max2": 0,
					"color":[22,23,24,25],
					"needGender": false,
					"specials1": [],
					"specials2": [],
					"special_tags1": [],
					"special_tags2": []
				},
				"eyes":{
					"url":"images/ojos/",
					"max1": 42,
					"max2": 0,
					"color":[],
					"needGender": false,
					"specials1": [],
					"specials2": [],
					"special_tags1": [],
					"special_tags2": []
				},
				"hair":{
					"url":"images/peinados/",
					"max1": 47,
					"max2": 0,
					"color":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,21,22,34],
					"needGender": false,
					"specials1": [23,24,25,26,27,28,29,30,31,32,40,41,42,43,44,45,46,47],
					"specials2": [],
					"special_tags1": ["starwars1","starwars2","starwars2","starwars2","starwars2","starwars2",
										"ligamx","ligamx","ligamx","ligamx","mundial","mundial","mundial","mundial",
										"mundial","mundial","mundial","mundial","mundial","mundial"],
					"special_tags2": []
				},
				"shoes":{
					"url":"images/zapatos/",
					"max1": 27,
					"max2": 11,
					"color":[],
					"needGender": true,
					"specials1": [20,21,22,23,24,25,26],
					"specials2": [11],
					"special_tags1": ["starwars1","starwars2","starwars2","starwars2","starwars2","starwars2","starwars2"],
					"special_tags2": ["starwars2"]
				},
				"outfit":{
					"url":"images/outfit/",
					"max1": 104,
					"max2": 38,
					"color":[],
					"needGender": true,
					"specials1": [5,45,46,47,48,49,50,51,11,12,13,14,15,16,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,
						74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104],
					"specials2": [26, 9, 10, 11, 12, 13, 18,27,28,29,30,31,32,33,34,35,36,37,38],
					"special_tags1": ["starwars2","starwars1","starwars2","starwars2","starwars2","starwars2","starwars2","starwars2",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","mundial","mundial","mundial","mundial",
										"mundial","mundial","mundial","mundial","mundial","mundial",
										"mundial","mundial","mundial","mundial","mundial","mundial",
										"mundial","mundial","mundial","mundial","mundial","mundial",
										"mundial","mundial","mundial","mundial","mundial","mundial",
										"mundial","mundial","mundial"],
					"special_tags2": ["starwars2","ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx"]
				},
				"pants":{
					"url":"images/pantalones/",
					"max1": 30,
					"max2": 14,
					"color":[],
					"needGender": true,
					"specials1": [3,14,15,16,17,18,19,11,12,13,20,21,22,23,24,25,26,27,28,29,30],
					"specials2": [7,8,9,10,11,12,13,14],
					"special_tags1": ["starwars1","starwars2","starwars2","starwars2","starwars2","starwars2","starwars2",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx","ligamx",
										"ligamx","ligamx","ligamx","ligamx","ligamx","ligamx","ligamx"],
					"special_tags2": ["starwars2","ligamx","ligamx","ligamx","ligamx","ligamx","ligamx","ligamx"]
				},
				"starwars":{
					"needGender": true,
					"max1": 30,
					"max2": 11
				},
				"ligamx":{
					"needGender": true,
					"max1": 46,
					"max2": 27
				},
				"mundial":{
					"needGender": true,
					"max1": 46,
					"max2": 27
				}
			},
			methods:{
				init:function(){
					$("#mobile-horizontal-menu").remove();
					$(".gender_juanes").on("click",function(){						
						componentObj.genero = $(this).attr("opcion");
						componentObj.methods.special();
						componentObj.methods.show_all();
						if(componentObj.genero == "mujer"){
							componentObj.limit_page = 3;
						}
						componentObj.methods.show_special_element();
						componentObj.methods.createIndicators();
						$("#juanificate_gender").hide();
					});
					componentObj.methods.resize();					
					$(window).resize(function(){
						componentObj.methods.resize();
					});
					$("button").click(function(){
						componentObj.methods.complete();
					});
					$(".option").each(function(i, el){
						$(el).click(function(){
							componentObj.methods.select_type(i, el);
						});
					});
					$(".colors").each(function(i, el){
						$(el).click(function(){
							componentObj.methods.select_color(i, el);
						});
					});
					$("#top_arrow").on("click", function(){
						componentObj.methods.prev();
					});
					$("#bottom_arrow").on("click", function(){
						componentObj.methods.next();
					});
					$(".indicator").each(function(index, el){
						$(el).click(function(){
							componentObj.methods.showIndiceByPosition(index);
						});
					});
					$("#return_bnt").on("click", function(){
						componentObj.methods.prevType();
					});
					$("#continue_btn").on("click", function(){
						componentObj.methods.nextType();
					});
					$("#menu_indicator").on("click", function(){
						if($(window).width() <= 800){
							componentObj.methods.toogle_menu();
						}
					});
					$("#juanificate_finish").on("click", function(){
						componentObj.methods.complete();
					});
					$(".cover_btn").on("click", function(){
						$("#juanificate_cover").fadeOut("slow");
					});
					$(".gender_juanes").hover(
					  	function() {
						  	$( this ).addClass( "active" );
						}, function() {
					    	$( this ).removeClass( "active" );
						}
					);
					$("#share_close").on("click", function(){
						componentObj.methods.return_finish();
					});
				},
				complete:function(){
					$("#juanificate_result").html("");
					var width_original = $("#juanificate_canvas").width();
					$("#juanificate_canvas").css({
						"width":"500px",
						"height":"500px"
					});
					$("#juanito_in").addClass("juanito_500");
					$(".juanito_elements").addClass("juanito_500");
					html2canvas($("#juanificate_canvas"),{
						onrendered: function(el) {
							var canvas = $(el).appendTo("#juanificate_result");
							$(canvas).attr("id","canvas_500");
						}
					});
					$("#juanito_in").removeClass("juanito_500");
					$(".juanito_elements").removeClass("juanito_500");
					$("#juanificate_canvas").css({
						"width":window.screen.availWidth,
						"height":window.screen.availHeight
					});

					var class_res = "";
					if(window.screen.availWidth > 500 && window.screen.availHeight > 720){
						class_res = "juanito_resolution";
					}else{
						class_res = "juanito_resolution2";
					}
					$("#juanito_in").addClass(class_res);
					$(".juanito_elements").addClass(class_res);
					html2canvas($("#juanificate_canvas"),{
						onrendered: function(el) {
							var canvas = $(el).appendTo("#juanificate_result");
							$(canvas).attr("id","canvas_res");
						}
					});
					$("#juanito_in").removeClass(class_res);
					$(".juanito_elements").removeClass(class_res);
					$("#juanificate_canvas").css({
						"width":width_original,
						"height":"100%"
					});
					componentObj.methods.show_share();
					var url = "?boca="+componentObj.boca+((componentObj.elemnts["mouth"]["color"].indexOf(componentObj.boca)>=0)?"_"+ componentObj.color_choose : "")
						+"&escenario="+componentObj.escenario
						+"&ojos="+componentObj.ojos
						+"&pantalones="+componentObj.pantalones
						+"&peinado="+componentObj.peinado+((componentObj.elemnts["hair"]["color"].indexOf(componentObj.peinado)>=0)?"_"+ componentObj.color_choose : "")
						+"&zapatos="+componentObj.zapatos
						+"&genero="+componentObj.genero
						+"&outfit="+componentObj.outfit;
					var fb_url = "'https://www.facebook.com/sharer.php?u=http://juanfutbol.com/tools/juanificate"+encodeURIComponent(url)+"'";
					var tw_url = "'https://twitter.com/intent/tweet?via=juanfutbol&text=¡Ya me juanifiqué en el @NewCoCDMX! &hashtags=NewCoCDMX&url=http://juanfutbol.com/tools/juanificate"
										+encodeURIComponent(url)+"'";
					$("#a_facebook").attr("href", "javascript:sharePopUp('fb', "+encodeURIComponent(fb_url)+");");
					$("#a_twitter").attr("href", "javascript:sharePopUp('tw', "+encodeURIComponent(tw_url)+");");
				},
				resize:function(){
					var width = $(window).width();
					if(width >800 && !componentObj.finish){
						$("#juanificate_canvas").width(width-75);
						$("#tools_container").width("100%");
						$("#juanificate_menu").removeClass("active");
						$("#juanificate_finish").show();
					}else{
						$("#juanificate_canvas").width("100%");
						componentObj.methods.movil_calculate();
						$("#juanificate_finish").hide();
					}
				},
				select_option:function(index, element){
					$(".tool_option").each(function(i, el){
						$(el).removeClass("active");
						if(i == index){
							$(el).addClass("active");
						}
					});
					var x = index + 1;
					componentObj.methods.setIndexElement(componentObj.posicion, x);
					var url = componentObj.methods.getUrlGender(componentObj.posicion);
					var div = "#juanito_"+componentObj.posicion;
					if(componentObj.posicion === "background"){
						$("#juanificate_canvas").css({"background-image":"url("+componentObj.elemnts[componentObj.posicion]["url"]+x+".png)"});
					}else if(componentObj.elemnts[componentObj.posicion]["color"].indexOf(x) >= 0){							
						$(div).css({"background-image":"url("+componentObj.elemnts[componentObj.posicion]["url"]+url+x+"_"+componentObj.color_choose+".png)"});
						$("#tools_colors").show();
					}else{
						$(div).css({"background-image":"url("+componentObj.elemnts[componentObj.posicion]["url"]+url+x+".png)"});
						$("#tools_colors").hide();
						if(x == 27 && posicion == "hair"){
							$(div).css({"z-index":"10"});
							$("#juanito_mouth").css({"background-image":"url(images/bocas/10.png)"});
							componentObj.methods.setIndexElement("mouth", 10);
						}else if(posicion == "hair"){
							$(div).css({"z-index":"4"});
						}

					}
				},
				select_special_option:function(index, element){
					var posicion = componentObj.methods.get_special_type(element);
					var search = ".tool_option."+posicion;
					$(search).each(function(i, el){
						$(el).removeClass("active");
					});
					$(element).addClass("active");		
					var x = $(element).attr("index");
					componentObj.methods.setIndexElement(posicion, x);
					var url = componentObj.methods.getUrlGender(posicion);
					var div = "#juanito_"+posicion;
					if(posicion === "background"){
						$("#juanificate_canvas").css({"background-image":"url("+componentObj.elemnts[posicion]["url"]+x+".png)"});
					}else if(componentObj.elemnts[posicion]["color"].indexOf(x) >= 0){							
						$(div).css({"background-image":"url("+componentObj.elemnts[posicion]["url"]+url+x+"_"+componentObj.color_choose+".png)"});
						$("#tools_colors").show();
					}else{
						$(div).css({"background-image":"url("+componentObj.elemnts[posicion]["url"]+url+x+".png)"});
						$("#tools_colors").hide();
						if(x == 27 && posicion == "hair"){
							$(div).css({"z-index":"10"});
							$("#juanito_mouth").css({"background-image":"url(images/bocas/10.png)"});
							componentObj.methods.setIndexElement("mouth", 10);
						}else{
							$(div).css({"z-index":"4"});
						}
					}
				},
				get_special_type: function(element){
					if($(element).hasClass("hair")){
						return "hair";
					}else if($(element).hasClass("eyes")){
						return "eyes";
					}else if($(element).hasClass("mouth")){
						return "mouth";
					}else if($(element).hasClass("outfit")){
						return "outfit";
					}else if($(element).hasClass("pants")){
						return "pants";
					}else if($(element).hasClass("shoes")){
						return "shoes";
					}else if($(element).hasClass("background")){
						return "background";
					}
				},
				select_type:function(index, element){
					$(".option").each(function(i, el){
						$(el).removeClass("active");
						if(i == index){
							$(el).addClass("active");
						}
					});
					var text = "";
					componentObj.page = 0;
					componentObj.index_posicion = index;
					switch($(element).attr("id")){
						case "option_hair":
							componentObj.posicion = "hair";
							text = "PEINADOS";
							break;
						case "option_eyes":
							componentObj.posicion = "eyes";
							text = "OJOS";
							break;
						case "option_mouth":
							componentObj.posicion = "mouth";
							text = "BOCAS";
							break;
						case "option_outfit":
							componentObj.posicion = "outfit";
							text = "PLAYERAS";
							break;
						case "option_pants":
							componentObj.posicion = "pants";
							text = "PANTALONES";
							break;
						case "option_shoes":
							componentObj.posicion = "shoes";
							text = "ZAPATOS";
							break;
						case "option_background":
							componentObj.posicion = "background";
							text = "FONDOS";
							break;
						case "option_starwars":
							componentObj.posicion = "starwars";
							text = "STAR WARS";
							break;
						case "option_ligamx":
							componentObj.posicion = "ligamx";
							text = "LIGA MX";
							break;
						case "option_mundial":
							componentObj.posicion = "mundial";
							text = "LA GUÍA";
							break;
					}

					var special = $(element).hasClass("special");
					if(componentObj.elemnts[componentObj.posicion]["needGender"]){
						if(componentObj.genero === "hombre"){
							componentObj.limit_page = Math.floor(componentObj.elemnts[componentObj.posicion]["max1"]/12) + 
							((componentObj.elemnts[componentObj.posicion]["max1"]%12==0)?0:1);
						}else{
							componentObj.limit_page = Math.floor(componentObj.elemnts[componentObj.posicion]["max2"]/12) + 
							((componentObj.elemnts[componentObj.posicion]["max2"]%12==0)?0:1);;
						}
					}else{
						componentObj.limit_page = Math.floor(componentObj.elemnts[componentObj.posicion]["max1"]/12) + 
						((componentObj.elemnts[componentObj.posicion]["max1"]%12==0)?0:1);;
					}
					if(componentObj.limit_page == 1){
						$("#tools_pagging").hide();
					}else{
						$("#tools_pagging").show();
						var size = "container"+componentObj.page;
						$("#pagging_indicator").removeAttr('class');
						$("#pagging_indicator").addClass("size");
					}					
					$("#tools_title_tools div").text(text);
					$("#tools_colors").hide();
					if(special){
						componentObj.methods.show_special_element();
					}else{
						componentObj.methods.show_element();
					}					
					componentObj.methods.showIndiceByPosition(0);
					componentObj.methods.createIndicators();

					if($(window).width() <= 800){
						$("#juanificate_menu").removeClass("active");
						componentObj.methods.movil_calculate();
					}
					
				},
				select_color: function(index, element){
					$(".colors").each(function(i, el){
						$(el).removeClass("active");
						if(i == index){
							$(el).addClass("active");
						}
					});
					var x = index + 1;
					componentObj.color_choose = x;
					var url = componentObj.methods.getUrlGender(componentObj.posicion);
					var div = "#juanito_"+componentObj.posicion;
					$(div).css({"background-image":"url("+componentObj.elemnts[componentObj.posicion]["url"]+
						url+componentObj.methods.getIndexElement(componentObj.posicion)+"_"+
						componentObj.color_choose+".png)"});
				},
				show_element:function(){
					$("#tools_container").html("");
					var max = 0;
					var url = "";
					var special = "specials1";
					var special_tags = "special_tags1";
					if(componentObj.elemnts[componentObj.posicion]["needGender"]){
						if(componentObj.genero === "hombre"){
							max = componentObj.elemnts[componentObj.posicion]["max1"];
							url = componentObj.genero+"/";
						}else{
							max = componentObj.elemnts[componentObj.posicion]["max2"];
							url = componentObj.genero+"/";
							special = "specials2";
							special_tags = "special_tags2";
						}						
					}else{
						max = componentObj.elemnts[componentObj.posicion]["max1"];
					}
					for(var i=1; i <= max; i++){
						var div = $('<div class="tool_option '+componentObj.posicion+'"></div>').appendTo("#tools_container");
						if(componentObj.elemnts[componentObj.posicion]["color"].indexOf(i) >= 0){							
							$(div).css({"background-image":"url("+componentObj.elemnts[componentObj.posicion]["url"]+url+i+"_1.png)"});
						}else{
							$(div).css({"background-image":"url("+componentObj.elemnts[componentObj.posicion]["url"]+url+i+".png)"});
						}
						if( i == componentObj.methods.getIndexElement(componentObj.posicion)){
							$(div).addClass("active");
							if(componentObj.elemnts[componentObj.posicion]["color"].indexOf(i) >= 0){
								$("#tools_colors").show();
							}
						}
						var special_element = componentObj.elemnts[componentObj.posicion][special].indexOf(i);
						if(special_element >= 0){
							componentObj.methods.addStricker(div, special_element, special_tags, componentObj.posicion);
						}
					}
					$(".tool_option").each(function(i, el){
						$(el).click(function(){
							componentObj.methods.select_option(i, el);
						});
					});
				},
				show_special_element:function(){
					$("#tools_container").html("");
					var elements = ["hair", "eyes", "mouth", "outfit", "pants", "shoes", "background"];
					
					for( var j=0; j < 7; j++){
						var max = 0;
						var url = "";
						var special = "specials1";
						var special_tags = "special_tags1";
						if(componentObj.elemnts[elements[j]]["needGender"]){
							url = componentObj.genero+"/";
							max = componentObj.elemnts[elements[j]]["max1"];
							if(componentObj.genero === "mujer"){
								max = componentObj.elemnts[elements[j]]["max2"];								
								special = "specials2";
								special_tags = "special_tags2";
							}
						}else{
							max = componentObj.elemnts[elements[j]]["max1"];
						}
						for( var i=1; i<= max; i++){
							var special_element = componentObj.elemnts[elements[j]][special].indexOf(i);	
							if(special_element >= 0){
								var tag = componentObj.elemnts[elements[j]][special_tags][special_element];
								if(tag.indexOf(componentObj.posicion) >= 0){
									var div = $('<div index="'+i+'" class="tool_option '+elements[j]+' special"></div>').appendTo("#tools_container");
									if(componentObj.elemnts[elements[j]]["color"].indexOf(i) >= 0){							
										$(div).css({"background-image":"url("+componentObj.elemnts[elements[j]]["url"]+url+i+"_1.png)"});
									}else{
										$(div).css({"background-image":"url("+componentObj.elemnts[elements[j]]["url"]+url+i+".png)"});
									}
									if( i == componentObj.methods.getIndexElement(elements[j])){
										$(div).addClass("active");
										if(componentObj.elemnts[elements[j]]["color"].indexOf(i) >= 0){
											$("#tools_colors").show();
										}
									}
									componentObj.methods.addStricker(div, special_element, special_tags, elements[j]);
								}
							}
							
						}
					}					
					$(".tool_option").each(function(i, el){
						$(el).click(function(){
							componentObj.methods.select_special_option(i, el);
						});
					});
				},
				show_all: function(){
					$("#juanificate_canvas").css({"background-image":"url(images/escenarios/"+componentObj.escenario+".png)"});
					$("#juanito_mouth").css({"background-image":"url(images/bocas/"+componentObj.boca+".png)"});
					$("#juanito_eyes").css({"background-image":"url(images/ojos/"+componentObj.ojos+".png)"});
					$("#juanito_hair").css({"background-image":"url(images/peinados/"+componentObj.peinado+".png)"});
					$("#juanito_shoes").css({"background-image":"url(images/zapatos/"+componentObj.genero+"/"+componentObj.zapatos+".png)"});
					$("#juanito_outfit").css({"background-image":"url(images/outfit/"+componentObj.genero+"/"+componentObj.outfit+".png)"});
					$("#juanito_pants").css({"background-image":"url(images/pantalones/"+componentObj.genero+"/"+componentObj.pantalones+".png)"});
				},
				show_share: function(){
					$("#juanificate_menu").hide();
					$("#juanificate_tools").hide();
					$("#juanificate_finish").hide();
					$("#juanificate_canvas").width("100%");
					componentObj.finish = true;
					$("#juanificate_share").show();
					$("#download_avatar").on("click", function(){
						componentObj.methods.download_avatar(this);
					});
					$("#download_wall").on("click", function(){
						componentObj.methods.download_wall(this);
					});
				},
				return_finish: function(){
					$("#juanificate_share").hide();
					componentObj.finish = false;
					componentObj.methods.resize();
					$("#juanificate_menu").show();
					$("#juanificate_tools").show();
					
				},
				getUrlGender: function(posicion){
					var url = "";
					if(componentObj.elemnts[posicion]["needGender"]){
						if(componentObj.genero === "hombre"){
							url = componentObj.genero+"/";
						}else{
							url = componentObj.genero+"/";
						}						
					}
					return url;
				},
				getIndexElement: function(type){
					switch(type){
						case "background":
							return componentObj.escenario;
							break;
						case "mouth":
							return componentObj.boca;
							break;
						case "eyes":
							return componentObj.ojos;
							break;
						case "hair":
							return componentObj.peinado;
							break;
						case "shoes":
							return componentObj.zapatos;
							break;
						case "outfit":
							return componentObj.outfit;
							break;
						case "pants":
							return componentObj.pantalones;
							break;
					}					
				},
				setIndexElement: function(type, val){
					switch(type){
						case "background":
							componentObj.escenario = val;
							break;
						case "mouth":
							componentObj.boca = val;
							break;
						case "eyes":
							componentObj.ojos = val;
							break;
						case "hair":
							componentObj.peinado = val;
							break;
						case "shoes":
							componentObj.zapatos = val;
							break;
						case "outfit":
							componentObj.outfit = val;
							break;
						case "pants":
							componentObj.pantalones = val;
							break;
					}					
				},
				createIndicators: function(){
					$("#pagging_indicator").html("");
					for (var i = 0; i < componentObj.limit_page; i++) {
						var div = $('<div></div>').appendTo("#pagging_indicator");
						$(div).addClass("indicator");
						if( i == componentObj.page){
							$(div).addClass("active");
						}
					};
					$(".indicator").each(function(index, el){
						$(this).click(function(){
							componentObj.methods.showIndiceByPosition(index);
						});
					});
				},
				showIndiceByPosition: function(index){
					componentObj.page = index;
					componentObj.methods.move();
				},
				next: function(){
					var index = componentObj.page + 1;
					if( index < componentObj.limit_page){
						componentObj.page++;
					}else{
						componentObj.page = 0;
					}
					componentObj.methods.move();
				},
				prev: function(){
					var index = componentObj.page - 1;
					if( index < 0){
						componentObj.page = componentObj.limit_page - 1;
					}else{
						componentObj.page--;
					}
					componentObj.methods.move();
				},
				move: function(){
					var top = -390 * componentObj.page;
					$("#tools_container").css({"top":top});
					$(".indicator").each(function(index, el){
						if(index == componentObj.page){
							$(el).addClass("active");
						}else{
							$(el).removeClass("active");
						}
					});
				},
				nextType: function(){
					var index = componentObj.index_posicion + 1;
					if(index < 8){
						var el;
						$(".option").each(function(i, e){
							if(i == index){
								el = e;
							}
						});
						componentObj.index_posicion++;
						componentObj.methods.select_type(index, el);
						if(index == 7){
							$("#continue_btn span").text("FINALIZAR");
							$("#continue_btn").addClass("finish_btn");
						}else{
							$("#continue_btn span").text("CONTINUAR");
							$("#continue_btn").removeClass("finish_btn");
						}
					}else{
						componentObj.methods.complete();
					}
				},
				prevType: function(){
					var index = componentObj.index_posicion - 1;
					if(index < 0){
						$("#juanificate_gender").show();
					}else{
						var el;
						$(".option").each(function(i, e){
							if(i == index){
								el = e;
							}
						});
						componentObj.index_posicion--;
						componentObj.methods.select_type(index, el);
						if(index == 7){
							$("#continue_btn span").text("FINALIZAR");
							$("#continue_btn").addClass("finish_btn");
						}else{
							$("#continue_btn span").text("CONTINUAR");
							$("#continue_btn").removeClass("finish_btn");
						}						
					}
				},
				toogle_menu: function(){
					if($("#juanificate_menu").hasClass("active")){
						$("#juanificate_menu").removeClass("active");
					}else{
						$("#juanificate_menu").addClass("active");
					}
				},
				movil_calculate: function(){
					var size = 0;
					if(componentObj.elemnts[componentObj.posicion]["needGender"] && componentObj.genero === "mujer"){
						size = componentObj.elemnts[componentObj.posicion]["max2"] * 110;							
					}else{
						size = componentObj.elemnts[componentObj.posicion]["max1"] * 110;
					}
					$("#tools_container").width(size);
				},
				download_avatar: function(link){
					var canvasId = "canvas_500";
					var filename  = "juanvatar.png";
					if(componentObj.methods.is_mobile()){
						open().document.write('<img src="'+document.getElementById(canvasId).toDataURL()+'"/>');
					}else{
						link.href = document.getElementById(canvasId).toDataURL();
    					link.download = filename;
					}					
				},
				download_wall: function(link){
					var canvasId = "canvas_res";
					var filename  = "juanpaper.png";
					if(componentObj.methods.is_mobile()){
						open().document.write('<img src="'+document.getElementById(canvasId).toDataURL()+'"/>');
					}else{
						link.href = document.getElementById(canvasId).toDataURL();
    					link.download = filename;
					}	
				},
				special: function(){
					if (componentObj.genero == "hombre") {
						componentObj.boca = 1; 
						componentObj.escenario = 13; 
						componentObj.ojos = 1; 
						componentObj.outfit = 38; 
						componentObj.pantalones = 1; 
						componentObj.peinado = 1; 
						componentObj.zapatos = 1;
					}else{
						componentObj.boca = 1; 
						componentObj.escenario = 13; 
						componentObj.ojos = 1; 
						componentObj.outfit = 4; 
						componentObj.pantalones = 1; 
						componentObj.peinado = "15_1"; 
						componentObj.zapatos = 1;
					}
				},
				addStricker: function(element, indexClass, special_tag, posicion){
					var sticker = $('<div class="sticker" />').appendTo($(element));
					var class_name = componentObj.elemnts[posicion][special_tag][indexClass];
					$(sticker).addClass(class_name);
				},
				is_mobile: function(){
					var check = false;
					(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
					return check;
				}
			}
		};
		return componentObj;
	};	
})(jQuery);
$(document).ready(function(){
	$("#indepth_content").juanificate();
	if(location.href.indexOf("/lainsuperableguia") != -1){
		$("#juanificate_cover_normal").hide();
	}else{
		$("#juanificate_cover_book").hide();
	}
}); 