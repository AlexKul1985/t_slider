$(function(){
	
	//console.log(getAllElementsHeight('.content','li','p'));
	// console.log(searchAllElem('.content'));
	//console.log(diffResultHeight('.content'));
	//console.log(getMainElement('.content').get(0).tagName == 'DIV');
	handlerDataAboutHeight('.content');
	$(window).resize(function(){
		handlerDataAboutHeight('.content');
	});
});

//////////////Получить родительский элемент////////////////////////////

function getMainElement(main_selector){
	return $(main_selector);
}

////////////Получить высоту родительского элемента////////////////////

function getMainElementHeight(main_selector){
	if($.type(main_selector) === "object"){
		return main_selector.height();
	}
	var main_element = getMainElement(main_selector);
	return main_element.height();
}







////////Последовательное сравнение суммы высот каждого элемента с высотой родительского///////////

function diffResultHeight(main_selector){
	var main_elem = null;
	if($.type(main_selector) == 'object') {
		main_elem = main_selector;
	}
	else main_elem = getMainElement(main_selector);
	var this_height = 0;
	var height_main = getMainElementHeight(main_elem);
	var child = main_elem.children();
	console.log(child.length);
	for( var i = 0; i < child.length ; i++ ){
		if(child.get(i).tagName == 'UL') {
			var len_child = child.eq(i).children().length;
			for( j = 0; j < len_child; j++ ){
				this_height += child.eq(i).children().eq(j).height();
				if(this_height >= height_main-100){
					return { lenLI:len_child , index1: i , index2: j };
				}
			}
	}
	else {
		this_height += child.eq(i).height();
		if(this_height >= height_main-100) return i;
	}
}
return false;

}

////////////////////////////////////////////

function handlerDataAboutHeight(main_selector){
	var main_elem = getMainElement(main_selector); 
	var child = main_elem.children();
	var len_child = child.length;
	
	var data = diffResultHeight(main_elem); 
	var str = getElementOfContent(data,main_elem);
	console.log(data);
	console.log(str);
	if($.type(data) === 'boolean') return; 
	if($.type(data) === 'number'){
		 console.log('один');
		if( (len_child - 1) - data > 0 ){
			for( var k = data; k < len_child; k++ ){
				child.eq(k).remove();
			}
		}
		else {

			child.eq(data).remove();
		}
	}

	//////////////////// Object ////////////////////////////////////////////

	else {
		if( (data.lenLI - 1) - data.index2 > 0 ){
			
		 console.log('два1');
			
				child.eq(data.index1).find('li:nth-child(n+'+(data.index2+1)+')').remove();
		

		}
		else {
		 console.log('два2');

		child.eq(data.index1).children().eq(data.index2).remove(); 


		}
		
	for( var j = data.index1+1 ; j < len_child; j++){
			child.eq(j).remove();
		}

	}

}


function getElementOfContent( data, main_elem ){
	if( $.type(data) === 'boolean' ) return; 
	var result_str = '';
	var len = main_elem.children().length;
	if( $.type(data) === 'number' ){
		if( len - 1 > data ){
			for( var i = data; i < len; i++ ) {
				if(main_elem.children().eq(i).get(0).tagName === 'UL'){

					result_str += '<ul>'+main_elem.children().eq(i).html()+'</ul>';
				}
				else {
					result_str +='<p>'+ main_elem.children().eq(i).html()+'</p>';
				}
			}

		}
		else {
			if(main_elem.children().eq(data).get(0).tagName === 'UL'){
				result_str += '<ul>'+main_elem.children().eq(data).html()+'</ul>';
				}
			else {
				result_str += '<p>'+main_elem.children().eq(data).html()+'</p>';
			}	
		}	

	}
	else{
		var len_child = main_elem.children().eq(data.index1).children().length;
		for( var j = data.index2; j < len_child ; j++ ){
			if( j == data.index2 ) result_str +='<ul>';
			result_str += '<li>'+main_elem.children().eq(data.index1).children().eq(j).html()+'</li>';
			if( j == len_child - 1 ) {
				result_str +='</ul>';
			}
		}
		if( data.index1 <  len - 1 ){
			for( var k = data.index1 + 1; k < len; k++ ) {
				if(main_elem.children().eq(k).get(0).tagName === 'P'){
					result_str += '<p>'+main_elem.children().eq(k).html()+'</p>';
					
				}
				else{
					result_str += '<ul>'+main_elem.children().eq(k).html()+'</ul>';
				}
			}
		}

	}
	return result_str;
}






