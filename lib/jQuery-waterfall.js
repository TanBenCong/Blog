(function($){
	var defaults = {
		'container': '#wf-con', // 父容器
		'sections': '.post-text', // 子容器
		'lg-columns': '4'
	}
	var win = $(window),
		con , sec;
	var opts = {};
	var sizeReplace = /\b(one|two|three)-(col|cols)$/;

	var $body = $("body")[0];
	var colsReg = [/\bone-col$/,/\btwo-cols$/,/\bthree-cols$/];
	var wf = $.waterfall = $.fn.waterfall = function(){
		opts = $.extend({}, defaults, opts || {});
		con = $(opts.container);
		sec = con.find(opts.sections);
		init();
	};

	//列数改变
	win.resize(function(){
		// var size = $(window).width() + 17;
		// // question
		// var cols = wf.getColumn();
		// var	conName = con[0].className;
		// if(size > 1170){
		// 	conName.replace(sizeReplace,"three-cols");
		// }
		// else if(size > 970){
		// 	conName.replace(sizeReplace,"three-cols");
		// } 
		// else if(size > 750){
		// 	conName.replace(sizeReplace,"two-cols");
		// }
		// else{
		// 	conName.replace(sizeReplace,"one-col");
		// }
		wf.render();
	});
	//获取列数
	wf.getColumn = function(){
		var colClassName = con.attr('class'); 
		for(var i = 0; i < colsReg.length; i++)
		{
			if(colsReg[i].test(colClassName))
			{
				i++;
				return i;
			}
		}
	}
	// 是否支持css3
	function isSupportCss(property){
		for(var i = 0; i < property.length; i++){
			if(property[i] in $body.style)			
				return true			
		}
		return false;
	}
	// 返回当前元素的上当前列数级
	function getPrevDom(index,ele){
		var columns = wf.getColumn();
		if(ele){
			for(var i = 0; i < columns; i++)
			{
				ele = ele.prev();
			}
			return ele;
		}		
		else{
			var i = index - columns;
			i--;
			i = i.toString();
			var s = opts.sections + ":eq(" + i + ")";
			return $(s);
		}
	}
	
	// 获取定位
	function getPosition(ele){
		var t = ele.position().top+ ele.outerHeight() + "px",
			l = ele.position().left+ "px";
		return {
			"position": "absolute",
			"left": l,
			"top": t
		}
	}
	// 设置定位
	function setPosition(ele, location){
		ele.css(location);
	}
	wf.render = function(){
		sec.each(function(index){
			if(index < wf.getColumn()){
				
			}else{
				var that = $(this);
			var	prevEle = getPrevDom(index),
				offset = getPosition(prevEle);
			setPosition(that,offset);
			}
			
		});
	}
	function init(){
		var css3column = ["-webkit-column-count","-moz-column-count","column-count"];
		if(!isSupportCss(css3column)) {
			wf.render();
		}
		wf.render();
	}
})(jQuery)
$.waterfall();



