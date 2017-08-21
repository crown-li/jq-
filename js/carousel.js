(function($){
	$.fn.Carousel = function(options){
		var defaults = {
			fullScreen : true,     // 是否全屏
			index : 1,             
			flag  : true,          // 是否自动滚动
			speed : 2000,		   // 滚动速度
			isNav : true,          // 是否显示导航
			isPage: true,          // 是否显示翻页
		}
		
		var op = $.extend(defaults, options);
		
		var animate, timer, stop, nav, fun_animate,plusminus ,screens ,addDom, init = null;
		
		var carousel = $('#carousel');
		var list = $("#wrapper");
		var li = list.find('li');
		var prev = $("#prev");
		var next = $("#next");
		
		var liLength = li.length;
		var tagLiLeng = liLength + 1;
		var animated = false;
		var liWidth = null;
		
		//全屏
		screens = function(){
			if(op.fullScreen){
				$(window).resize(function(){
					 location.reload();
				})
				liWidth = $(window).width();
				carousel.width(liWidth)
				list.width(liWidth * tagLiLeng);
				list.children().width(liWidth).find('img').width(liWidth);
			}else{
				liWidth = li.eq(0).width();
				list.width(liWidth * tagLiLeng);
			}
			list.css('left',-liWidth);//页面加载时隐藏动态插入的第一张
		}
		
		//滚动执行方法
		animate = function(offset){
			newLeft = list.position().left + offset;
			
			var maxWidth = liWidth * (liLength - 1);
			if(newLeft < -maxWidth - liWidth){
				list.css('left','0px');
				fun_animate(-liWidth);
			}else if(newLeft > 0){
				list.css('left',-maxWidth - liWidth);
				fun_animate(-maxWidth);
			} else{
				fun_animate(newLeft);
			}
		};
		
		//添加节点
		addDom = function(){
			//添加第一个节点到最后一个节点
			list.append(li.eq(0).clone());
			//添加最后一个节点到第一个节点
			list.prepend(li.eq(liLength-1).clone());
		};
		
		//滚动动画
		fun_animate = function(lef){
			if(animated) return 
			animated = true;
			list.animate({left:lef},function(){
				//导航切换
				$('#pagination span').eq(op.index - 1).addClass('on').siblings().removeClass('on');
				animated = false;
			})
		};
		
		//自动滚动
		timer = function(){
			if(op.flag){
				auto = setInterval(function(){
					plusminus(-liWidth);
				},op.speed)
			}
		};
		
		//停止滚动
		stop = function(){
			clearInterval(auto);
		};
		
		//显示导航
		nav = function(){
			if(op.isNav){
				var spans = '<span></span>';
				var arr = new Array(liLength + 1);
				spans = arr.join(spans);
				list.after('<div id="pagination">'+ spans +'</div>');
				$('#pagination span').eq(0).addClass('on');
				// 绑定点击事件
				$('#pagination span').click(function(){
					navClick($(this))
				})
			}
			
		}
		
		//导航点击事件
		navClick = function(e){
			var _index = $('#pagination span').index(e) + 1;
			var offset = liWidth * (op.index - _index);
			animate(offset);
			op.index = _index;
		}
		
		//鼠标滑过
		carousel.mouseover(function(){
			stop();
			if(op.isPage){
				prev.show();
				next.show();
			}
		});
		
		//鼠标移出
		carousel.mouseout(function(){
			timer();
			prev.hide();
			next.hide();
		});
		
		//翻页判断
		plusminus = function(w){
			//animated为真时才能执行翻页
			if(!animated){
				//判断是上或者下，上大于0
				if(w > 0){
					op.index--;
				}else{
					op.index++;
				}
				
				if(op.index < 1){
					op.index = liLength;
				}
				if(op.index > liLength){
					op.index = 1
				}
				
				animate(w);
			}
		};
		
		//prev
		prev.click(function(){
			plusminus(liWidth)
		});
		
		//next
		next.click(function(){
			plusminus(-liWidth)
		});	
		
		//初始化
		init = function(){
			screens();
			
			addDom();
			
			timer();
			
			nav();
		};
		
		init();
			
		return this;
	}
})(jQuery)
