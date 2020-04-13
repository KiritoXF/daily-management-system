/**
 +------------------------------------------------------------------------------------+
 + iceEditor(富文本编辑器)
 +------------------------------------------------------------------------------------+
 + iceEditor v1.1.2
 * MIT License By www.iceui.net
 + 作者：ice
 + 官方：www.iceui.net
 + 时间：2019-06-25
 +------------------------------------------------------------------------------------+
 + 版权声明：该版权完全归iceUI官方所有，可转载使用和学习，但请务必保留版权信息
 +------------------------------------------------------------------------------------+
 + iceEditor是一款简约风格的富文本编辑器，体型十分娇小，无任何依赖，整个编辑器只有一个
 + 文件，功能却很不平凡！简约的唯美设计，简洁、极速、使用它的时候不需要引用jQuery、font
 + css……等文件，因为整个编辑器只是一个Js，支持上传图片、附件！支持添加音乐、视频！
 +------------------------------------------------------------------------------------+
*/
;var ice = ice || {};
ice.editor = function(id){

	//------------------------参数配置 开始------------------------
	// 工具栏菜单
	this.menu=[
	'backColor','fontSize','foreColor','bold','italic','underline','strikeThrough','line','justifyLeft',
	'justifyCenter','justifyRight','indent','outdent','line','insertOrderedList','insertUnorderedList','line','superscript',
	'subscript','createLink','unlink','line','hr','table','files','music','video','insertImage',
	'removeFormat','line','code'
	];
	// 文字背景颜色
	this.backColor = [
	'#ffffff','#000000','#eeece1','#1f497d','#4f81bd','#c0504d','#9bbb59','#8064a2','#4bacc6','#f79646',
	'#f2f2f2','#979797','#ddd9c3','#c6d9f0','#dbe5f1','#f2dcdb','#ebf1dd','#e5e0ec','#dbeef3','#fdeada',
	'#d8d8d8','#595959','#c4bd97','#8db3e2','#b8cce4','#e5b9b7','#d7e3bc','#ccc1d9','#b7dde8','#fbd5b5',
	'#bfbfbf','#3f3f3f','#938953','#548dd4','#95b3d7','#d99694','#c3d69b','#b2a2c7','#92cddc','#fac08f',
	'#a5a5a5','#262626','#494429','#17365d','#366092','#953734','#76923c','#5f497a','#31859b','#e36c09',
	'#7f7f7f','#0c0c0c','#1d1b10','#0f243e','#244061','#632423','#4f6128','#3f3151','#205867','#974806',
	'#c00000','#ff0000','#ffc000','#ffff00','#92d050','#00b050','#00b0f0','#0070c0','#002060','#7030a0'
	];
	//文字颜色
	this.foreColor = this.backColor;
	//编辑器的尺寸
	this.width="100%";
	this.height="400px";
	//查看源码
	this.code=0;
	//窗口最大化和最小化
	this.maxWindow=1;
	//编辑器禁用
	this.disabled=0;
	//图片和附件提交地址
	this.uploadUrl='upload.php';
	//HTML标签过滤黑名单-忽略粘贴过来的HTML标签
	this.htmlTag=['meta','style','script','object','form','iframe'];
	//HTML标签 将该块级元素标签同意格式化为p标签
	this.formatTag=['address','caption','dd','div','dl','dt','fieldset','h1','h2','h3','h4','h5','h6','legend','fieldset','li','noframes','noscript','ol','ul','p','pre','table','tbody','tfoot','th','thead','tr'];

	//------------------------参数配置 结束------------------------
	//构建功能模块唯一id
	this.getTime ='1'+ String(new Date().getTime()).substr(4,8);
	this.iframeId = "_iframe"+this.getTime;
	this.toolId = "_tool"+this.getTime;
	this.linkId = "_createLink"+this.getTime;
	this.musicId = "_music"+this.getTime;
	this.videoId = "_video"+this.getTime;
	this.imageId = "_image"+this.getTime;
	this.imgUploadId = "_imgUpload"+this.getTime;
	this.filesId = "_files"+this.getTime;
	this.filesUploadId = "_filesUpload"+this.getTime;
	this.tableId = "_table"+this.getTime;
	this.dragId = "_drag"+this.getTime;
	
	//获取编辑器对象
	var _z=this;
	this.editor = this.id(id);
	this.textarea = 0;
	// 只能是 textarea 和 div ，其他类型的元素不行
	if (this.editor.nodeName !== 'TEXTAREA' && this.editor.nodeName !== 'DIV') {
		return console.log('暂不支持该标签-->'+this.editor.nodeName+' 推荐使用div');
	}
	if(this.editor.nodeName == 'TEXTAREA'){
		this.editor.style.display='none';
		this.divId = "_div"+this.getTime;
		var div = this.c('div');
		div.className="iceEditor";
		div.id=this.divId;
		this.insertAfter(div,this.editor);

		//加载编辑器的内容
		this.textarea = this.editor;
		this.editor = this.id(this.divId);
		this.value = this.textarea.value;
	}else{
		this.editor.className="iceEditor";
		this.value = this.editor.innerHTML;
		this.editor.innerHTML='';
	}

	//创建编辑器菜单栏
	this.tool = this.c("div");
	this.tool.id=this.toolId;
	this.tool.className="iceEditor-tool noselect";
	this.tool.innerHTML="菜单栏";
	this.editor.appendChild(this.tool);

	//创建iframe
	this.iframe = this.c("iframe");
	this.iframe.id=this.iframeId;
	this.iframe.className="noselect";
	this.iframe.frameBorder=0;
	this.editor.appendChild(this.iframe);

	//创建编辑器的高度可拖拽容器
	this.drag = this.c("div");
	this.drag.id=this.dragId;
	this.drag.className="iceEditor-drag noselect";
	this.drag.innerHTML='<svg class="icon" aria-hidden="true"><use xlink:href="#icon-drag"></use></svg>';
	this.editor.appendChild(this.drag);

	//创建禁用编辑器的遮罩
	this.disableds = this.c("div");
	this.disableds.className="iceEditor-disabled";
	this.editor.appendChild(this.disableds);

	//获取iframe对象
	this.w = this.iframe.contentWindow; //获取iframe Window 对象
	this.d = this.iframe.contentDocument; //获取iframe documen 对象

	//为了兼容万恶的IE 创建iframe中的body
    this.d.open();
    this.d.write('<html><head><style>body{font-family:"Microsoft YaHei";color:#363636;margin:15px;word-wrap:break-word;word-break:break-all;}img{max-width:100%;}p{margin:0;margin-bottom:5px;}.iceEditor-code{font-family:Courier New;font-size:13px;line-height:20px;}table{margin:10px 0;}table td{padding:8px;line-height:1.42857143;border:1px solid #bdbdbd;}</style></head><body><p>'+this.value+'<p><p><br></p></body></html>');
    this.d.close();

	// 设置元素为可编辑
	this.d.body.designMode = 'On';  //打开设计模式
	this.d.body.contentEditable = true;// 设置元素为可编辑
	
	//内容区
	this.content = this.d.body;

	//改变textarea内容
	if(this.textarea)setInterval(function(){_z.textarea.innerHTML=_z.d.body.innerHTML},1000);
	
	//编辑器拖拽增高
	this.drag.onmousedown=function(){
		var y = event.clientY;
		var ch = _z.iframe.clientHeight;
		document.onmousemove=function(){
			var h = event.clientY - y;
			if(ch>=100){
				_z.iframe.height = ch + h + "px";
				_z.height=ch + h + "px";
			}else{
				_z.iframe.height = "100px";
				_z.height=ch + h + "px";
			}
		}
		document.onmouseup = function(){document.onmousemove = null;document.onmouseup = null;}
	}
	this.init();   //初始化参数
	this.create(); //创建编辑器
	this.paste();  //监听粘贴
}
//光标控制器
ice.editor.prototype={
	id:function(a){return document.getElementById(a)},
	c:function(a){return document.createElement(a)},
	//初始化参数
	init:function(){
		this.files=null;
		this.insertImage=null;
		this.element=this.d.body;
		var _z=this;
		var _w=this.w;
		var _d=this.d;
		this.element.focus();
		this.range=_d.all?_d.selection.createRange():this.range=_w.getSelection();
	},
	//dom后面插入节点
	insertAfter:function(n,obj){
		var parent = obj.parentNode;
		if(parent.lastChild == obj){
			parent.appendChild(n,obj);
		}else{
			parent.insertBefore(n,obj.nextSibling);
		}
	},
	//插入HTML
	setHTML:function(html,a){
		this.element.focus();
		var range = this.range.getRangeAt(0);
		//将选中的文档放在html中的DOM内
		if(!a)html.appendChild(range.extractContents());
		//删除选中的内容
		range.deleteContents();
		//创建文档碎片并放入新节点
		range.insertNode(this.w.document.createDocumentFragment().appendChild(html));//合并范围至末尾
		//合并范围至末尾
		range.collapse(false);
	},
	//插入文字内容
	setText:function(text){
		this.element.focus();
		var range = this.range.getRangeAt(0);
		range.deleteContents();
		var el = document.createElement('div');
		el.appendChild(document.createTextNode(text));
		var frag = document.createDocumentFragment(), node, lastNode;
		while((node = el.firstChild)){
			lastNode = frag.appendChild(node);
		}
		range.insertNode(frag);
		if(lastNode){
			range = range.cloneRange();
			range.setStartAfter(lastNode);
			range.collapse(true);
			this.range.removeAllRanges();
			this.range.addRange(range);
		}
	},
	//获取选中的HTML
	getSelectHTML:function(){
		var p = this.c('p');
		p.appendChild(this.range.getRangeAt(0).cloneContents());
		return p.innerHTML;
	},
	//获取选中的内容
	getSelectText:function(){
		if(this.range.toString()=='false' || this.range.toString()==''){
			return '';
		}else{
			return this.range.toString();
		}
	},
	//转义：HTML转成字符串
	toText:function(html){
		var temp = this.c("div");
		(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
	},
	//转义：字符串转成HTML
	toHTML:function(text){
		var temp = this.c("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	},
	//数组查询
	inArray:function(needle,array){  
		if(typeof needle=="string"||typeof needle=="number"){  
			for(var i in array)if(needle===array[i])return true;
			return false;  
		}  
	},
	//弹窗
	popup:function(options){
		options = options || {};
		var width = options.width || '400';     //默认宽度
		var height = options.height || '200';   //默认高度
		var title = options.title || '';        //默认不显示标题
		var content = options.content || '';    //默认内容
		return '<div class="iceEditor-popup"><div class="iceEditor-popup-box"></div><div class="iceEditor-popup-main" style="width:' + width + 'px;height:' + height + 'px;"><div class="iceEditor-popup-title"><span>' + title + '</span><span class="iceEditor-popup-close">╳</span></div><div class="iceEditor-popup-content">' + content +'</div></div></div>';
	},
	//获取对象距离窗口页面的顶部和左部的距离
	getCoords:function(el){ 
		var box = el.getBoundingClientRect(), 
		doc = el.ownerDocument, 
		body = doc.body, 
		html = doc.documentElement, 
		clientTop = html.clientTop || body.clientTop || 0, 
		clientLeft = html.clientLeft || body.clientLeft || 0, 
		top = box.top  - clientTop, 
		left = box.left - clientLeft;
		return { 'top': top, 'left': left };
	},
	//阻止冒泡
	pd:function(event){ 
		window.event ? window.event.cancelBubble = true : e.stopPropagation();
	},
	//附件上传
	filesUpload:function(){
		var _z = this;
		var close = this.files.getElementsByClassName('iceEditor-popup')[0];
		this.id(this.filesUploadId).onchange=function(){
			//创建iframe
			var iframe = _z.c("iframe");
			iframe.name = "fileUpload";
			iframe.style.display="none";
			document.body.appendChild(iframe);
			//创建form
			var form = _z.c("form"); 
			form.method = "POST"; 
			form.enctype = "multipart/form-data"; 
			form.action = _z.uploadUrl; 
			form.target = "fileUpload";
			iframe.appendChild(form);
			//创建input
			var input = _z.c("input"); 
			input.type = "file"; 
			input.name = "file[]";
			input.multiple = true;
			form.appendChild(input);
			//赋值并提交表单
			input.files=this.files;
			form.submit(); 
			//获取文件下载地址
			var t = window.setInterval(function(){
				var data = iframe.contentDocument.body.innerHTML;
				console.log(data);
				if(data != ''){
					//清除计时器
					window.clearInterval(t);
					//清除iframe
					document.body.removeChild(iframe); 
					var files = eval('(' + data + ')');
					for(var f=0;f<files.length;f++){
						if(files[f].code){
							alert(files[f].error);
						}else{
							var p = _z.c('p');
							var a = _z.c("a");
							a.href = files[f].url;
							a.className = 'download';
							a.download = files[f].name;
							a.innerText = files[f].name;
							a.target = '_blank';
							p.appendChild(a);
							_z.setHTML(p,true);
						}
					}
					close.style.display="none";
				}
			},50);
		}
	},
	//图片上传
	imagesUpload:function(){
		var _z = this;
		var close = this.insertImage.getElementsByClassName('iceEditor-popup')[0];
		//输入连接插入图片
		var url = this.insertImage.getElementsByClassName('insertImage-url')[0];
		var width = this.insertImage.getElementsByClassName('insertImage-width')[0];
		var height = this.insertImage.getElementsByClassName('insertImage-height')[0];
		var value = this.insertImage.getElementsByClassName('insertImage-value')[0];
		//绑定输入连接
		value.onclick=function(){
			var img = _z.c("img");
			img.src = url.value;
			img.width = width.value;
			img.height = height.value;
			_z.setHTML(img);
			close.style.display="none";
			_z.pd(); //阻住冒泡
		}
		//上传图片
		this.id(this.imgUploadId).onchange=function(){
			//创建iframe
			var iframe = _z.c("iframe");
			iframe.name = "fileUpload";
			iframe.style.display="none";
			document.body.appendChild(iframe);
			//创建form
			var form = _z.c("form"); 
			form.method = "POST"; 
			form.enctype = "multipart/form-data"; 
			form.action = _z.uploadUrl; 
			form.target = "fileUpload";
			iframe.appendChild(form);
			//创建input
			var input = _z.c("input"); 
			input.type = "file"; 
			input.name = "file[]";
			input.multiple = true;
			form.appendChild(input);
			//赋值并提交表单
			input.files=this.files;
			form.submit(); 
			//获取文件下载地址
			var t = window.setInterval(function(){
				var data = iframe.contentDocument.body.innerHTML;
				console.log(data);
				if(data != ''){
					//清除计时器
					window.clearInterval(t);
					//清除iframe
					document.body.removeChild(iframe); 
					var files = eval('(' + data + ')');
					for(var f=0;f<files.length;f++){
						var p = _z.c('p');
						var a = _z.c("img");
						a.src = files[f].url;
						p.appendChild(a);
						_z.setHTML(p,true);
					}
					close.style.display="none";
				}
			},50);
		}
	}
};
//工具栏菜单HTML
ice.editor.prototype.menuHTML=function(id){
	var a=[];
	//文字大小
	a.fontSize='<li><a href="javascript:;" class="ice-menu" title="文字大小"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-fontSize"></use></svg></a><ul class="iceEditor-menu-dropdown fontSize"><li><a href="javascript:;" data="fontSize|1">1</a></li><li><a href="javascript:;" data="fontSize|2">2</a></li><li><a href="javascript:;" data="fontSize|3">3</a></li><li><a href="javascript:;" data="fontSize|4">4</a></li><li><a href="javascript:;" data="fontSize|5">5</a></li><li><a href="javascript:;" data="fontSize|6">6</a></li><li><a href="javascript:;" data="fontSize|7">7</a></li><li class="iceEditor-menu-title">文字大小</li></ul></li>';
	//文字背景颜色
	a.backColor='<li><a href="javascript:;" class="ice-menu"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-backColor"></use></svg></a><ul class="iceEditor-menu-dropdown backColor">';
	for(var i=0;i<this.backColor.length;i++){
		a.backColor+='<li><a href="javascript:;" data="backColor|'+this.backColor[i]+'" style="background-color:'+this.backColor[i]+'"></a></li>';
	}
	a.backColor+='<li class="iceEditor-menu-title">文字背景颜色</li></ul></li>';
	//文字颜色
	a.foreColor='<li><a href="javascript:;" class="ice-menu"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-foreColor"></use></svg></i></a><ul class="iceEditor-menu-dropdown backColor">';
	for(var i=0;i<this.foreColor.length;i++){
		a.foreColor+='<li><a href="javascript:;" data="foreColor|'+this.foreColor[i]+'" style="background-color:'+this.foreColor[i]+'"></a></li>';
	}
	a.foreColor+='<li class="iceEditor-menu-title">文字颜色</li></ul></li>';
	//加粗
	a.bold='<li><a href="javascript:;" data="bold"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bold"></use></svg></a></li>';
	//倾斜
	a.italic='<li><a href="javascript:;" data="italic"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-italic"></use></svg></a></li>';
	//下划线
	a.underline='<li><a href="javascript:;" data="underline"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-underline"></use></svg></a></li>';
	//删除线
	a.strikeThrough='<li><a href="javascript:;" data="strikeThrough"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-strike"></use></svg></a></li>';
	//左对齐
	a.justifyLeft='<li><a href="javascript:;" data="justifyLeft"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-alignleft"></use></svg></a></li>';
	//居中对齐
	a.justifyCenter='<li><a href="javascript:;" data="justifyCenter"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-aligncenter"></use></svg></a></li>';
	//右对齐
	a.justifyRight='<li><a href="javascript:;" data="justifyRight"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-alignright"></use></svg></a></li>';
	//缩进
	a.indent='<li><a href="javascript:;" data="indent"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-indent"></use></svg></a></li>';
	//取消缩进
	a.outdent='<li><a href="javascript:;" data="outdent"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-outdent"></use></svg></a></li>';
	//有序列表
	a.insertOrderedList='<li><a href="javascript:;" data="insertOrderedList"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-orderedlist"></use></svg></a></li>';
	//无序列表
	a.insertUnorderedList='<li><a href="javascript:;" data="insertUnorderedList"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-unorderedlist"></use></svg></a></li>';
	//下标
	a.subscript='<li><a href="javascript:;" data="subscript" title="下标"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-subscript"></use></svg></a></li>';
	//上标
	a.superscript='<li><a href="javascript:;" data="superscript" title="上标"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-superscript"></use></svg></a></li>';
	//取消连接
	a.unlink='<li><a href="javascript:;" data="unlink"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-unlink"></use></svg></a></li>';
	a.hr='<li><a href="javascript:;" data="insertHorizontalRule"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-min"></use></svg></a></li>';
	//添加水平线
	a.removeFormat='<li><a href="javascript:;" data="removeFormat"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-remove"></use></svg></a></li>';
	//全选
	a.selectAll='<li><a href="javascript:;" data="selectAll"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-empty"></use></svg></a></li>';
	//表格
	a.table='<li><a href="javascript:;" data="table"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-table"></use></svg></a><ul class="iceEditor-menu-dropdown tableMain" id="'+this.tableId+'"><li><div class="tableBox"><div class="tableBgOff"></div><div class="tableBgOn"></div><div class="tableNum">表格：1×1</div></div></li></ul></li>';
	//附件
	a.files='<li class="iceEditor-menu-popup" id="'+this.filesId+'"><a href="javascript:;" data="files"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-files"></use></svg></a>';
	a.files+=this.popup({width:450,height:250,title:'附件上传',content:'<div class="insertImage"><input type="file" class="fileUpload-input" id="'+this.filesUploadId+'" name="file[]" multiple/><div><svg class="icon ice-upload" aria-hidden="true"><use xlink:href="#icon-files"></use></svg></div><label for="'+this.filesUploadId+'" class="fileUpload-btn">点击上传附件</label></div>'});
	a.files+='</li>';
	//音乐
	a.music='<li><a href="javascript:;"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-music"></use></svg></a><ul class="iceEditor-menu-dropdown createLink"><li><div>音乐连接：<input type="text" id="'+this.musicId+'" value="http://"/></div><a href="javascript:;" data="music" class="createLink-btn">确定</a></li></ul></li>';
	//视频
	a.video='<li><a href="javascript:;"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-video"></use></svg></a><ul class="iceEditor-menu-dropdown createLink"><li><div>视频连接：<input type="text" id="'+this.videoId+'" value="http://"/></div><a href="javascript:;" data="video" class="createLink-btn">确定</a></li></ul></li>';
	//查看源码
	a.code='<li><a href="javascript:;" data="code"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-code"></use></svg></a></li>';
	//创建连接
	a.createLink='<li><a href="javascript:;"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-link"></use></svg></a><ul class="iceEditor-menu-dropdown createLink"><li><div>URL连接：<input type="text" id="'+this.linkId+'" value="http://"/></div><a href="javascript:;" data="createLink" class="createLink-btn">确定</a></li></ul></li>';
	//添加图片
	a.insertImage='<li class="iceEditor-menu-popup" id="'+this.imageId+'"><a href="javascript:;"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-pic"></use></svg></a>';
	a.insertImage+=this.popup({width:450,height:250,title:'图片上传',content:'<div class="insertImage"><div>URL：<input type="text" name="url" class="insertImage-url" placeholder="网络图片地址" value=""/>宽：<input type="text" name="width" class="insertImage-width" placeholder="px" value=""/>高：<input type="text" name="height" class="insertImage-height" placeholder="px" value=""/><a href="javascript:;" class="insertImage-value">确定</a></div><input type="file" class="fileUpload-input" id="'+this.imgUploadId+'" name="file[]" accept="image/*" multiple/><div><svg class="icon ice-upload" aria-hidden="true"><use xlink:href="#icon-pic"></use></svg></div><label for="'+this.imgUploadId+'" class="fileUpload-btn">点击上传图片</label></div>'});
	a.insertImage+='</li>';
	//隔线
	a.line='<li class="line"></li>';
	//窗口最大化和最小化
	a.maxWindowTool='<li class="maxWindow"><a href="javascript:;" data="max"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-max"></use></svg></a></li><li class="minWindow" style="display:none;"><a href="javascript:;" data="min"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-min"></use></svg></a></li>';
	return a;
}
//格式化菜单栏
ice.editor.prototype.menuFormat=function(id) {
	var menuHTML=this.menuHTML();
	var html='<ul class="iceEditor-menu">';
	for(var i=0;i<this.menu.length;i++)html+=menuHTML[this.menu[i]];
	if(this.maxWindow)html+=menuHTML.maxWindowTool;
	html+='<li class="disabled"></li></ul>';
	this.tool.innerHTML=html;

	//弹窗事件
	var _z=this;
	var popup = this.tool.getElementsByClassName('iceEditor-menu-popup');
	for(var i=0;i<popup.length;i++){
		popup[i].onclick=function(){
			var box = this.getElementsByClassName('iceEditor-popup')[0];
			var close = box.getElementsByClassName('iceEditor-popup-close')[0];
			var btn = box.getElementsByClassName('iceEditor-popup-btn')[0];
			box.style.display='block';
			close.onclick=function(){
				box.style.display='none';
				_z.pd(); //阻住冒泡
			}
		}
	}

	//根据菜单配置来初始化菜单功能 ---开始---
	if(this.inArray('createLink',this.menu)) this.link = this.id(this.linkId);
	if(this.inArray('music',this.menu)) this.music = this.id(this.musicId);
	if(this.inArray('video',this.menu)) this.video = this.id(this.videoId);
	if(this.inArray('files',this.menu)){
		this.files = this.id(this.filesId);
		this.filesUpload();
	}
	if(this.inArray('insertImage',this.menu)){
		this.insertImage = this.id(this.imageId);
		this.imagesUpload();
	}
	if(this.inArray('table',this.menu)){
		//表格
		this.table = this.id(this.tableId);
		var tableBox = this.table.getElementsByClassName('tableBox')[0];
		var tableBgOn = this.table.getElementsByClassName('tableBgOn')[0];
		var tableNum = this.table.getElementsByClassName('tableNum')[0];
		tableBox.onmouseover=function(ev){
			var o = _z.getCoords(this),r=1,c=1;
			this.onmousemove=function(ev){
				var Event = ev || event;
				var x = Event.clientX - o.left - 5;
				var y = Event.clientY - o.top - 5;
				if(x<=180 && y<=180){
					r = Math.ceil(x/18);
					c = Math.ceil(y/18);
					tableBgOn.style.width = r*18 + 'px';
					tableBgOn.style.height = c*18 + 'px';
					tableNum.innerHTML='表格：'+r+"×"+c
				}
			}
			this.onmousedown=function(){
				var tableNode=_z.c("table");
				tableNode.width="100%";
				tableNode.border=1;
				tableNode.style.border="1px solid #bdbdbd";
				tableNode.style.borderSpacing=0;
				tableNode.style.borderCollapse="collapse";
				tableNode.className="table table-border";
				for(var x=0;x<c;x++){ 
					var trNode=tableNode.insertRow(); 
					for(var y=0;y<r;y++){ 
						var tdNode=trNode.insertCell();
						tdNode.innerHTML="<br/>";
					} 
				}
				_z.setHTML(tableNode,true);
			}
			this.onmouseout = function() {
				this.onmousemove = null;
				this.onmouseout = null;
			}
		}
	}
	//根据菜单配置来初始化菜单功能 ---结束---
	//初始化编辑器尺寸
	this.editor.style.width=this.width;
	this.iframe.width=this.width;
	this.iframe.height=this.height;
}
//设置菜单的功能
ice.editor.prototype.menuAction=function(id) {
	var menu = this.tool.getElementsByTagName("a");
	var _z = this;
	for(var i=0;i<menu.length;i++){
		menu[i].e=this;
		menu[i].attr = menu[i].getAttribute('data');
		if(menu[i].attr){
			menu[i].onclick = function() {
				switch(this.attr){
					//添加连接
					case 'createLink':
					var a = _z.c("a");
					a.href = _z.link.value;
					_z.setHTML(a);
					break;
					//添加音乐
					case 'music':
					var a = _z.c("audio");
					a.src=_z.music.value;
					a.controls="controls";
					_z.setHTML(a,true);
					break;
					//添加视频
					case 'video':
					var v = _z.c("video");
					v.src=_z.video.value;
					v.width=500;
					v.height=400;
					v.controls="controls";
					_z.setHTML(v,true);
					break;
					//查看源代码
					case 'code':
					var d = _z.tool.getElementsByClassName('disabled')[0];
					if(_z.code){
						_z.tool.className='iceEditor-tool noselect';
						d.style.display='none';
						this.className='';
						_z.code=0;
						_z.d.body.className="";
						_z.d.body.innerHTML=_z.toHTML(_z.getHTML());
					}else{
						_z.tool.className='iceEditor-tool noselect iceEditor-menu-disabled';
						d.style.display='block';
						this.className='active';
						_z.code=1;
						_z.d.body.className="iceEditor-code";
						var text = _z.getHTML();
						//格式化段落
						text = text.replace(/<\/p><p>/gim,"<\/p>\r\n<p>");
						_z.d.body.innerText=text;
					}
					break;
					//最大化
					case 'max':
					var webHeight = window.innerHeight; //页面视口高度
					if (typeof webHeight != "number") {
						if (document.compatMode == "CSS1Compat") {
							webHeight = document.documentElement.clientHeight;
						} else {
							webWidth = document.body.clientWidth;
						}
					}
					_z.editor.style.position='fixed';
					_z.editor.style.zIndex=_z.getTime;
					_z.editor.style.width='100%';
					_z.editor.style.height='100%';
					_z.editor.style.top=0;
					_z.editor.style.left=0;
					_z.iframe.height=webHeight-35-20+'px';
					this.parentNode.style.display='none';
					_z.tool.getElementsByClassName('minWindow')[0].style.display="block";
					break;
					//最小化
					case 'min':
					_z.editor.removeAttribute('style');
					_z.iframe.height=_z.height;
					this.parentNode.style.display='none';
					_z.tool.getElementsByClassName('maxWindow')[0].style.display="block";
					break;
					//默认执行execCommand
					default:
					var b = this.attr.split("|");
					if(b.length>1){
						_z.w.document.execCommand(b[0], false, b[1]);
					}else{
						_z.w.document.execCommand(b[0], false, null);
					}
				}
				return false;
			}
		}
	}
}
//纯文本粘贴
ice.editor.prototype.paste=function(){
	var _z=this;
	this.d.body.addEventListener('paste', function(e) {
		e.preventDefault();
		//获取粘贴的纯文本
		var text = (window.clipboardData || e.clipboardData).getData('Text') || prompt('在这里输入文本');
		text = _z.toText(text);
		//以换行方式分割内容
		var t = text.split('\r\n');
		if(t.length==1){
			_z.setText(text);
			return;
		}
		//创建存放粘贴内容的div
		var h = '';
		for(var i=0;i<t.length;i++){
			if(t[i]){ //有效去除空标签
				var p = _z.c('p');
				p.innerHTML = t[i];
				_z.setHTML(p,true);
			}
		}
	});
	// 去除Crtl+b/Ctrl+i/Ctrl+u等快捷键
	this.d.body.addEventListener('keydown', function(e) {
		// e.metaKey for mac
		if (e.ctrlKey || e.metaKey) {
			switch(e.keyCode){
				case 66: //ctrl+B or ctrl+b
				case 98: 
				case 73: //ctrl+I or ctrl+i
				case 105: 
				case 85: //ctrl+U or ctrl+u
				case 117: {e.preventDefault();break;}
			}
		}   
	});
}
//配置格式化
ice.editor.prototype.create=function() {
	this.menuFormat();
	this.menuAction();
	this.disableds.style.display = this.disabled?'block':'none';
}
//获取编辑器的HTML内容
ice.editor.prototype.getHTML=function() {
	return this.content.innerHTML;
}
//获取编辑器的Text内容
ice.editor.prototype.getText=function() {
	return this.content.innerText;
}
//设置编辑器的内容
ice.editor.prototype.setValue=function(v) {
	this.content.innerHTML=v;
}
//追加编辑器的内容
ice.editor.prototype.addValue=function(v) {
	this.content.innerHTML+=v;
}
//编辑器图标
var svgSprite = '<svg><symbol id="icon-music" viewBox="0 0 1024 1024"><path d="M899.904 454.976c-5.44-0.704-10.304-4.48-14.592-11.2-4.288-6.72-7.552-19.008-9.92-36.992-3.904-29.12-13.824-50.624-29.76-64.448-15.936-13.824-40.64-23.744-74.112-29.696-35.008-6.784-65.92-20.352-92.736-40.96-26.816-20.48-49.216-39.808-67.072-57.664C594.56 198.272 581.376 192.704 572.032 197.184S558.016 209.92 558.016 221.888L558.016 270.08l0 105.408c0 41.856-0.192 87.04-0.576 135.616s-0.576 94.464-0.576 137.792l0 114.368 0 63.872c0.768 17.92-2.112 37.952-8.768 59.904-6.592 22.08-19.072 42.816-37.312 62.272-18.304 19.456-42.56 36.032-72.896 49.92-30.336 13.824-68.096 21.824-113.216 24.128-45.888 2.24-87.296-5.632-124.288-23.552-36.928-17.92-65.536-40.576-85.76-67.776-20.224-27.328-30.144-57.216-29.76-89.664 0.384-32.512 14.976-62.976 43.776-91.328 28.8-28.416 59.904-48.192 93.376-59.392 33.408-11.2 65.728-17.408 96.832-18.496 31.104-1.152 58.944 0.896 83.456 6.144s42.56 10.112 54.272 14.592L456.576 376.512c0-88.192 0.384-187.584 1.152-298.176 0-21.696 5.824-39.424 17.536-53.248C486.848 11.328 502.4 3.264 521.856 1.024 538.176-1.216 551.616 1.92 562.112 10.56c10.496 8.576 21.184 20.544 32.064 35.84 10.88 15.36 24.32 32.704 40.256 52.096 15.936 19.456 37.504 38.528 64.768 57.152 23.36 17.216 43.776 29.504 61.248 36.992s33.856 14.4 49.024 20.736c15.168 6.336 30.144 14.016 44.928 22.976 14.784 8.96 31.104 23.552 49.024 43.712 17.856 19.392 28.8 39.616 32.704 60.544s4.096 40 0.576 57.152-9.152 31.168-16.896 42.048C911.936 450.688 905.344 455.744 899.904 454.976L899.904 454.976z"></path></symbol><symbol id="icon-dir" viewBox="0 0 1024 1024"><path d="M1024 325.008l0-72c0-35.344-28.656-64-64-64L448 189.008 448 131.008c0-35.344-28.656-64-64-64L64 67.008c-35.344 0-64 28.656-64 64l0 194L1024 325.008z"></path><path d="M0 373.008l0 520c0 35.344 28.656 64 64 64l896 0c35.344 0 64-28.656 64-64l0-520L0 373.008z"></path></symbol><symbol id="icon-aligncenter" viewBox="0 0 1024 1024"><path d="M0 64l1024 0 0 128-1024 0zM192 256l640 0 0 128-640 0zM192 640l640 0 0 128-640 0zM0 448l1024 0 0 128-1024 0zM0 832l1024 0 0 128-1024 0z"></path></symbol><symbol id="icon-alignleft" viewBox="0 0 1024 1024"><path d="M0 64l1024 0 0 128-1024 0zM0 256l640 0 0 128-640 0zM0 640l640 0 0 128-640 0zM0 448l1024 0 0 128-1024 0zM0 832l1024 0 0 128-1024 0z"></path></symbol><symbol id="icon-alignright" viewBox="0 0 1024 1024"><path d="M0 64l1024 0 0 128-1024 0zM384 256l640 0 0 128-640 0zM384 640l640 0 0 128-640 0zM0 448l1024 0 0 128-1024 0zM0 832l1024 0 0 128-1024 0z"></path></symbol><symbol id="icon-corner" viewBox="0 0 1024 1024"><path d="M768 256l64 0 0 64-64 0zM640 384l64 0 0 64-64 0zM640 512l64 0 0 64-64 0zM640 640l64 0 0 64-64 0zM512 512l64 0 0 64-64 0zM512 640l64 0 0 64-64 0zM384 640l64 0 0 64-64 0zM768 384l64 0 0 64-64 0zM768 512l64 0 0 64-64 0zM768 640l64 0 0 64-64 0zM768 768l64 0 0 64-64 0zM640 768l64 0 0 64-64 0zM512 768l64 0 0 64-64 0zM384 768l64 0 0 64-64 0zM256 768l64 0 0 64-64 0z"></path></symbol><symbol id="icon-help" viewBox="0 0 1024 1024"><path d="M448 704l128 0 0 128-128 0zM704 256c35.36 0 64 28.64 64 64l0 192-192 128-128 0 0-64 192-128 0-64-320 0 0-128 384 0zM512 96c-111.104 0-215.584 43.264-294.144 121.856s-121.856 183.04-121.856 294.144c0 111.104 43.264 215.584 121.856 294.144s183.04 121.856 294.144 121.856c111.104 0 215.584-43.264 294.144-121.856s121.856-183.04 121.856-294.144c0-111.104-43.264-215.584-121.856-294.144s-183.04-121.856-294.144-121.856zM512 0l0 0c282.784 0 512 229.216 512 512s-229.216 512-512 512c-282.784 0-512-229.216-512-512s229.216-512 512-512z"></path></symbol><symbol id="icon-indent" viewBox="0 0 1024 1024"><path d="M0 64l1024 0 0 128-1024 0zM384 256l640 0 0 128-640 0zM384 448l640 0 0 128-640 0zM384 640l640 0 0 128-640 0zM0 832l1024 0 0 128-1024 0zM0 704l0-384 256 192z"></path></symbol><symbol id="icon-link" viewBox="0 0 1025 1024"><path d="M320.032 704c17.6 17.6 47.264 16.736 65.952-1.952l316.128-316.128c18.656-18.656 19.552-48.352 1.952-65.952s-47.264-16.736-65.952 1.952l-316.128 316.128c-18.656 18.656-19.552 48.352-1.952 65.952zM476.928 675.104c4.576 9.056 6.976 19.168 6.976 29.696 0 17.6-6.752 34.048-19.008 46.304l-163.392 163.392c-12.256 12.256-28.704 18.976-46.304 18.976s-34.048-6.752-46.304-18.976l-99.392-99.392c-12.256-12.256-19.008-28.704-19.008-46.304s6.752-34.048 19.008-46.304l163.392-163.392c12.256-12.256 28.704-19.008 46.304-19.008 10.528 0 20.64 2.432 29.696 6.976l65.344-65.344c-27.872-21.408-61.44-32.16-95.04-32.16-40 0-79.968 15.168-110.304 45.504l-163.392 163.392c-60.672 60.672-60.672 159.936 0 220.608l99.392 99.392c30.336 30.336 70.304 45.504 110.304 45.504s79.968-15.168 110.304-45.504l163.392-163.392c55.808-55.808 60.224-144.288 13.344-205.344l-65.344 65.344zM978.528 144.896l-99.392-99.392c-30.336-30.336-70.304-45.504-110.304-45.504s-79.968 15.168-110.304 45.504l-163.392 163.392c-55.808 55.808-60.224 144.288-13.344 205.344l65.344-65.344c-4.544-9.056-6.976-19.168-6.976-29.696 0-17.6 6.752-34.048 18.976-46.304l163.392-163.392c12.256-12.256 28.704-19.008 46.304-19.008s34.048 6.752 46.304 19.008l99.392 99.392c12.256 12.256 18.976 28.704 18.976 46.304s-6.752 34.048-18.976 46.304l-163.392 163.392c-12.256 12.256-28.704 19.008-46.304 19.008-10.528 0-20.64-2.432-29.696-6.976l-65.344 65.344c27.872 21.408 61.44 32.16 95.04 32.16 40 0 79.968-15.168 110.304-45.504l163.392-163.392c60.672-60.672 60.672-159.936 0-220.608z"></path></symbol><symbol id="icon-orderedlist" viewBox="0 0 1024 1024"><path d="M384 832l640 0 0 128-640 0zM384 448l640 0 0 128-640 0zM384 64l640 0 0 128-640 0zM192 0l0 256-64 0 0-192-64 0 0-64zM128 526.016l0 50.016 128 0 0 64-192 0 0-146.016 128-60 0-50.016-128 0 0-64 192 0 0 146.016zM256 704l0 320-192 0 0-64 128 0 0-64-128 0 0-64 128 0 0-64-128 0 0-64z"></path></symbol><symbol id="icon-outdent" viewBox="0 0 1024 1024"><path d="M0 64l1024 0 0 128-1024 0zM384 256l640 0 0 128-640 0zM384 448l640 0 0 128-640 0zM384 640l640 0 0 128-640 0zM0 832l1024 0 0 128-1024 0zM256 320l0 384-256-192z"></path></symbol><symbol id="icon-symbol" viewBox="0 0 1024 1024"><path d="M704 896l256 0 64-128 0 256-384 0 0-214.208c131.104-56.48 224-197.152 224-361.792 0-214.432-157.6-382.272-352-382.272s-352 167.84-352 382.272c0 164.608 92.896 305.312 224 361.792l0 214.208-384 0 0-256 64 128 256 0 0-32.576c-187.616-66.464-320-227.392-320-415.424 0-247.424 229.216-448 512-448s512 200.576 512 448c0 188-132.384 348.96-320 415.424l0 32.576z"></path></symbol><symbol id="icon-strike" viewBox="0 0 1024 1024"><path d="M731.424 517.024c63.904 47.936 100.576 116.096 100.576 186.976s-36.672 139.04-100.576 186.976c-59.36 44.512-137.28 69.024-219.424 69.024s-160.064-24.512-219.424-69.024c-63.936-47.936-100.576-116.096-100.576-186.976l128 0c0 69.376 87.936 128 192 128s192-58.624 192-128c0-69.376-87.936-128-192-128-82.144 0-160.064-24.512-219.424-69.024-63.936-47.936-100.576-116.096-100.576-186.976s36.672-139.04 100.576-186.976c59.36-44.512 137.28-69.024 219.424-69.024s160.064 24.512 219.424 69.024c63.904 47.936 100.576 116.096 100.576 186.976l-128 0c0-69.376-87.936-128-192-128s-192 58.624-192 128c0 69.376 87.936 128 192 128 82.144 0 160.064 24.512 219.424 69.024zM0 512l1024 0 0 64-1024 0z"></path></symbol><symbol id="icon-table" viewBox="0 0 1024 1024"><path d="M0 64l0 896 1024 0 0-896-1024 0zM384 640l0-192 256 0 0 192-256 0zM640 704l0 192-256 0 0-192 256 0zM640 192l0 192-256 0 0-192 256 0zM320 192l0 192-256 0 0-192 256 0zM64 448l256 0 0 192-256 0 0-192zM704 448l256 0 0 192-256 0 0-192zM704 384l0-192 256 0 0 192-256 0zM64 704l256 0 0 192-256 0 0-192zM704 896l0-192 256 0 0 192-256 0z"></path></symbol><symbol id="icon-underline" viewBox="0 0 1024 1024"><path d="M704 64l128 0 0 416c0 159.072-143.264 288-320 288s-320-128.928-320-288l0-416 128 0 0 416c0 40.16 18.24 78.688 51.36 108.512 36.896 33.216 86.848 51.488 140.64 51.488s103.744-18.304 140.64-51.488c33.12-29.792 51.36-68.352 51.36-108.512l0-416zM192 832l640 0 0 128-640 0z"></path></symbol><symbol id="icon-unlink" viewBox="0 0 1025 1024"><path d="M476.928 675.104c4.576 9.056 6.976 19.168 6.976 29.696 0 17.6-6.752 34.048-19.008 46.304l-163.392 163.392c-12.256 12.256-28.704 18.976-46.304 18.976s-34.048-6.752-46.304-18.976l-99.392-99.392c-12.256-12.256-19.008-28.704-19.008-46.304s6.752-34.048 19.008-46.304l163.392-163.392c12.256-12.256 28.704-18.976 46.304-18.976 10.528 0 20.64 2.432 29.696 6.976l65.344-65.344c-27.872-21.408-61.44-32.16-95.04-32.16-40 0-79.968 15.168-110.304 45.504l-163.392 163.392c-60.672 60.672-60.672 159.936 0 220.608l99.392 99.392c30.336 30.336 70.304 45.504 110.304 45.504s79.968-15.168 110.304-45.504l163.392-163.392c55.808-55.808 60.224-144.288 13.344-205.344l-65.344 65.344zM978.528 144.896l-99.392-99.392c-30.336-30.336-70.304-45.504-110.304-45.504s-79.968 15.168-110.304 45.504l-163.392 163.392c-55.808 55.808-60.224 144.288-13.344 205.344l65.344-65.344c-4.544-9.056-6.976-19.168-6.976-29.696 0-17.6 6.752-34.048 18.976-46.304l163.392-163.392c12.256-12.256 28.704-19.008 46.304-19.008s34.048 6.752 46.304 19.008l99.392 99.392c12.256 12.256 18.976 28.704 18.976 46.304s-6.752 34.048-18.976 46.304l-163.392 163.392c-12.256 12.256-28.704 19.008-46.304 19.008-10.528 0-20.64-2.432-29.696-6.976l-65.344 65.344c27.872 21.408 61.44 32.16 95.04 32.16 40 0 79.968-15.168 110.304-45.504l163.392-163.392c60.672-60.672 60.672-159.936 0-220.608zM233.408 278.624l-192-192 45.248-45.248 192 192zM384.032 0l64 0 0 192-64 0zM0.032 384l192 0 0 64-192 0zM790.656 745.376l192 192-45.248 45.248-192-192zM576.032 832l64 0 0 192-64 0zM832.032 576l192 0 0 64-192 0z"></path></symbol><symbol id="icon-backColor" viewBox="0 0 1024 1024"><path d="M360.021333 512 677.1712 512 518.570667 87.893333Z"></path><path d="M168.618667 1024 868.573867 1024 709.034667 597.333333 328.106667 597.333333Z"></path><path d="M602.368 0 981.538133 1024 1024 1024 1024 0Z"></path><path d="M434.773333 0 0 0 0 1024 55.6544 1024Z"></path></symbol><symbol id="icon-code" viewBox="0 0 1024 1024"><path d="M0 64.003413 0 959.996587l1024 0L1024 64.003413 0 64.003413zM960.006827 896.003413l-896 0 0-640 896 0L960.006827 896.003413zM361.376427 726.621013c6.2464 6.253227 14.4384 9.3824 22.6176 9.3824 8.197973 0 16.384-3.129173 22.6304-9.3824 12.498773-12.499627 12.498773-32.7424 0-45.248l-105.3696-105.376427 105.3696-105.375573c12.498773-12.4928 12.498773-32.749227 0-45.248-12.499627-12.498773-32.7552-12.498773-45.248 0l-128 128c-12.498773 12.498773-12.498773 32.748373 0 45.253973L361.376427 726.621013zM617.3824 726.621013c6.240427 6.253227 14.431573 9.3824 22.624427 9.3824 8.1792 0 16.378027-3.129173 22.6304-9.3824l128-127.994027c12.4928-12.5056 12.4928-32.7552 0-45.253973l-128-128c-12.5184-12.498773-32.7552-12.498773-45.254827 0s-12.499627 32.7552 0 45.248l105.3696 105.375573-105.3696 105.376427C604.883627 693.878613 604.883627 714.12224 617.3824 726.621013z"></path></symbol><symbol id="icon-files" viewBox="0 0 1024 1024"><path d="M0 320l0 640 1024 0L1024 320 0 320zM768 192l-64 0L704 128l-64 0L640 64 0 64l0 192 768 0L768 192z"></path></symbol><symbol id="icon-list" viewBox="0 0 1024 1024"><path d="M700.352 704l0 256 256 0 0-256L700.352 704zM700.352 384l0 255.936 256 0L956.352 384 700.352 384zM700.352 64l0 256 256 0L956.352 64 700.352 64zM380.352 704l0 256 256 0 0-256L380.352 704zM380.352 384l0 255.936 256 0L636.352 384 380.352 384zM380.352 64l0 256 256 0L636.352 64 380.352 64zM60.352 704l0 256 256 0 0-256L60.352 704zM60.352 384l0 255.936 256 0L316.352 384 60.352 384zM60.352 64l0 256 256 0L316.352 64 60.352 64z"></path></symbol><symbol id="icon-save" viewBox="0 0 1029 1024"><path d="M512 638.976 319.488 638.976l0 258.048 192.512 0L512 638.976zM958.464 0 65.536 0C28.672 0 0 28.672 0 65.536l0 770.048L192.512 1024l770.048 0c36.864 0 65.536-28.672 65.536-65.536L1028.096 65.536C1024 28.672 995.328 0 958.464 0zM831.488 958.464 192.512 958.464l0-385.024 638.976 0L831.488 958.464zM897.024 512 126.976 512 126.976 65.536l770.048 0L897.024 512z"></path></symbol><symbol id="icon-min" viewBox="0 0 1024 1024"><path d="M64 448l896 0 0 128-896 0 0-128Z"></path></symbol><symbol id="icon-product" viewBox="0 0 1024 1024"><path d="M398.222222 455.111111 56.888889 455.111111C25.486222 455.111111 0 429.624889 0 398.222222L0 56.888889c0-31.402667 25.486222-56.888889 56.888889-56.888889l341.333333 0c31.402667 0 56.888889 25.486222 56.888889 56.888889l0 341.333333C455.111111 429.624889 429.624889 455.111111 398.222222 455.111111"></path><path d="M967.111111 398.222222l-341.333333 0L625.777778 56.888889l341.333333 0L967.111111 398.222222zM967.111111 0l-341.333333 0c-31.402667 0-56.888889 25.486222-56.888889 56.888889l0 341.333333c0 31.402667 25.486222 56.888889 56.888889 56.888889l341.333333 0c31.402667 0 56.888889-25.486222 56.888889-56.888889L1024 56.888889C1024 25.486222 998.513778 0 967.111111 0"></path><path d="M398.222222 1024 56.888889 1024c-31.402667 0-56.888889-25.486222-56.888889-56.888889l0-341.333333c0-31.402667 25.486222-56.888889 56.888889-56.888889l341.333333 0c31.402667 0 56.888889 25.486222 56.888889 56.888889l0 341.333333C455.111111 998.513778 429.624889 1024 398.222222 1024"></path><path d="M967.111111 1024l-341.333333 0c-31.402667 0-56.888889-25.486222-56.888889-56.888889l0-341.333333c0-31.402667 25.486222-56.888889 56.888889-56.888889l341.333333 0c31.402667 0 56.888889 25.486222 56.888889 56.888889l0 341.333333C1024 998.513778 998.513778 1024 967.111111 1024"></path></symbol><symbol id="icon-empty" viewBox="0 0 1024 1024"><path d="M704 64 960 320 704 320Z"></path><path d="M64 64 64 1024 960 1024 960 384 896 384 896 960 128 960 128 128 640 128 640 64Z"></path></symbol><symbol id="icon-video" viewBox="0 0 1110 1024"><path d="M1024 1024 85.333333 1024C38.186667 1024 0 985.813333 0 938.666667L0 85.333333C0 38.186667 38.186667 0 85.333333 0L1024 0C1071.146667 0 1109.333333 38.186667 1109.333333 85.333333L1109.333333 938.666667C1109.333333 985.813333 1071.146667 1024 1024 1024ZM426.666667 256 426.666667 768 810.666667 512 426.666667 256Z"></path></symbol><symbol id="icon-pic" viewBox="0 0 1024 1024"><path d="M972.797568 0 51.201152 0C22.92289 0 0.00128 22.92161 0.00128 51.199872l0 921.601536c0 28.275702 22.92161 51.199872 51.199872 51.199872l921.596416 0c28.278262 0 51.199872-22.92417 51.199872-51.199872L1023.99744 51.199872C1023.99744 22.92161 1001.07583 0 972.797568 0zM972.797568 460.798848c-245.08382-148.251923-486.398144 127.99392-486.398144 127.99392-226.657447-100.066368-377.973606 91.667239-435.198272 184.311091L51.201152 76.794048c0-14.138491 11.460805-25.599296 25.599296-25.599296l870.396544 0c14.138491 0 25.599296 11.460805 25.599296 25.599296L972.796288 460.798848zM281.599936 179.204032c-56.552685 0-102.399744 45.844499-102.399744 102.397184 0 56.552685 45.847059 102.397184 102.399744 102.397184 56.552685 0 102.399744-45.844499 102.399744-102.397184C383.99968 225.048531 338.152621 179.204032 281.599936 179.204032z"></path></symbol><symbol id="icon-bold" viewBox="0 0 1024 1024"><path d="M437.61370098 62C511.9653834 62 567.40408437 64.9750625 603.94711661 70.90862715 640.4890625 76.85875214 673.17788339 89.24432187 702.0298083 108.08085518 730.86442403 126.91739375 754.89939688 151.9958709 774.13365107 183.31421768 793.36791143 214.6491125 802.98557598 249.75173955 802.98557598 288.65416045 802.98557598 330.83897715 791.17091563 369.53030411 767.57620098 404.74675215 743.9814916 439.96320723 711.96875 466.38278545 671.57259893 483.989975 728.73557597 499.93216455 772.68088848 527.09577295 803.40853643 565.48078965 834.13617911 603.8658125 849.5 648.9925833 849.5 700.86213125 849.5 741.70481152 839.54483018 781.43093545 819.66803222 820.02602393 799.79122812 858.63766661 772.64627188 889.4706875 738.2342542 912.54371152 703.82115722 935.63329589 661.38053222 949.8132125 610.94483018 955.11658643 579.30420518 958.38242714 502.99134893 960.43651455 382.00733018 961.2446917L62 961.2446917 62 62 437.61370098 62ZM230.75 399.5L364.28739893 399.5C443.66832705 399.5 493.01498955 398.3985125 512.2878875 396.1765083 547.16913125 392.20600625 574.5923334 380.59226035 594.55516661 361.33526357 614.51916348 342.09506357 624.5 316.75190732 624.5 285.33825723 624.5 255.25445205 615.87928848 230.82024482 598.67503438 211.9998166 581.46961661 193.19729786 555.88043955 181.81078438 521.92491875 177.8234917 501.7251333 175.61939785 443.66832705 174.5 347.77191465 174.5L230.75 174.5 230.75 399.5ZM230.75 793.25L427.71935411 793.25C504.38265839 793.25 553.03467911 791.52986972 573.6366916 788.09058652 605.25887187 783.49415732 631.02137187 772.30843965 650.90483545 754.51688545 670.78830518 736.72532597 680.75 712.9074667 680.75 683.04772812 680.75 657.79902705 673.07580722 636.3704542 657.74677607 618.76201661 642.39838438 601.16818027 620.24677403 588.33928847 591.25201455 580.3035708 562.25726035 572.2678584 499.35403232 568.25 402.56169277 568.25L230.75 568.25 230.75 793.25Z"></path></symbol><symbol id="icon-max" viewBox="0 0 1024 1024"><path d="M64 128l0 128 0 576 64 0 768 0 64 0 0-64L960 256 960 128 64 128zM896 768 128 768 128 256l768 0L896 768z"></path></symbol><symbol id="icon-del" viewBox="0 0 1024 1024"><path d="M960 192l-192 0L768 64c0-35.328-28.672-64-64-64L320 0C284.672 0 256 28.672 256 64l0 128L64 192C28.672 192 0 220.672 0 256l128 0 0 704c0 35.328 28.672 64 64 64l640 0c35.328 0 64-28.672 64-64L896 256l128 0C1024 220.672 995.328 192 960 192zM320 64l384 0 0 128L320 192 320 64zM832 960 192 960 192 256l640 0L832 960z"></path><path d="M416 832C433.664 832 448 817.6 448 800l0-384C448 398.4 433.664 384 416 384S384 398.4 384 416l0 384C384 817.6 398.336 832 416 832z"></path><path d="M608 832c17.6 0 32-14.4 32-32l0-384C640 398.4 625.6 384 608 384S576 398.4 576 416l0 384C576 817.6 590.4 832 608 832z"></path></symbol><symbol id="icon-unorderedlist" viewBox="0 0 1024 1024"><path d="M0 0l256 0 0 256-256 0zM384 64l640 0 0 128-640 0zM0 384l256 0 0 256-256 0zM384 448l640 0 0 128-640 0zM0 768l256 0 0 256-256 0zM384 832l640 0 0 128-640 0z"></path></symbol><symbol id="icon-remove" viewBox="0 0 1024 1024"><path d="M921.6 512 880.64 512 972.8 972.8C972.8 1001.088 949.888 1024 921.6 1024L102.4 1024C74.112 1024 51.2 1001.088 51.2 972.8L143.36 512 102.4 512C74.112 512 51.2 489.088 51.2 460.8L51.2 409.6C51.2 381.312 74.112 358.4 102.4 358.4L409.6 358.4 409.6 102.4C409.6 45.8496 455.4496 0 512 0 568.5504 0 614.4 45.8496 614.4 102.4L614.4 358.4 921.6 358.4C949.888 358.4 972.8 381.312 972.8 409.6L972.8 460.8C972.8 489.088 949.888 512 921.6 512ZM102.4 972.8 257.6384 972.8C254.1056 967.5008 252.4416 960.9472 253.6192 954.1888L284.7488 726.5024C287.2064 712.6016 300.4672 703.2832 314.3936 705.7408 328.32 708.1984 337.6128 721.4848 335.1808 735.4112L304.0512 963.072C303.4112 966.6816 302.0032 969.9328 300.1088 972.8L921.6 972.8 819.2 512 204.8 512 102.4 972.8ZM563.2 102.4C563.2 74.112 540.288 51.2 512 51.2 483.712 51.2 460.8 74.112 460.8 102.4L460.8 358.4 563.2 358.4 563.2 102.4ZM921.6 409.6 102.4 409.6 102.4 460.8 921.6 460.8 921.6 409.6Z"></path></symbol><symbol id="icon-fontSize" viewBox="0 0 1024 1024"><path d="M321.536 515.008H512V387.968H4.032v126.976H194.56V896h126.976V515.008z m63.552-380.992h634.944v127.04H385.088V134.016z m253.888 127.04h126.976V896H638.976V261.056z"></path></symbol><symbol id="icon-quote" viewBox="0 0 1024 1024"><path d="M448 896v-256H204.8c-6.4-166.4 32-256 179.2-332.8V192C166.4 268.8 57.6 409.6 64 627.2V896h384z m512 0v-256h-243.2c-6.4-166.4 32-256 179.2-332.8V192c-217.6 76.8-326.4 217.6-320 435.2V896h384z"></path></symbol><symbol id="icon-font" viewBox="0 0 1024 1024"><path d="M22.755556 0v278.755556H56.888889c11.377778-73.955556 39.822222-136.533333 91.022222-176.355556C176.355556 73.955556 227.555556 56.888889 301.511111 56.888889h79.644445v790.755555c0 51.2-5.688889 85.333333-11.377778 96.711112-5.688889 17.066667-17.066667 28.444444-34.133334 34.133333-17.066667 11.377778-45.511111 17.066667-73.955555 17.066667H227.555556v28.444444h568.888888v-28.444444h-34.133333c-34.133333 0-56.888889-5.688889-73.955555-17.066667-17.066667-11.377778-28.444444-22.755556-34.133334-34.133333-5.688889-11.377778-11.377778-45.511111-11.377778-96.711112V56.888889h79.644445c51.2 0 85.333333 5.688889 108.088889 11.377778 34.133333 17.066667 62.577778 39.822222 85.333333 68.266666 22.755556 28.444444 39.822222 73.955556 56.888889 136.533334h28.444444V0H22.755556z"></path></symbol><symbol id="icon-lookup" viewBox="0 0 1024 1024"><path d="M960 448V128c0-38.4-25.6-64-64-64H192c-32 0-64 25.6-64 64v768c0 38.4 25.6 64 64 64h704c38.4 0 64-25.6 64-64v-192l-275.2-236.8c6.4-12.8 12.8-32 12.8-44.8 25.6-134.4-89.6-249.6-224-224-76.8 12.8-134.4 70.4-147.2 147.2-25.6 134.4 89.6 249.6 224 224 38.4-6.4 76.8-25.6 102.4-57.6l243.2 217.6v128c0 19.2-12.8 32-32 32h-640c-19.2 0-32-6.4-32-25.6v-704c0-19.2 12.8-32 32-32h640c19.2 0 32 12.8 32 32V448h64z m-416 57.6C448 531.2 364.8 448 390.4 352c12.8-44.8 44.8-83.2 89.6-89.6 96-25.6 179.2 57.6 153.6 153.6-6.4 44.8-44.8 83.2-89.6 89.6z" fill=""></path><path d="M320 640h256v64H320zM320 768h448v64H320z" fill=""></path></symbol><symbol id="icon-italic" viewBox="0 0 1024 1024"><path d="M670 195.6h205.4V64.7H350.5v130.9h191.9L347.2 828.4H148.6v130.9h524.9V828.4H474.9z"></path></symbol><symbol id="icon-format" viewBox="0 0 1024 1024"><path d="M64 64c0-35.328 29.184-64 64.128-64h639.68A64 64 0 0 1 832 64v192c0 35.328-29.184 64-64.128 64H128.192A64 64 0 0 1 64 256V64z m768 64h128v64h-128V128zM448 448h448v64H448V448z m448-256h64v320h-64V192zM448 512h64v64H448V512zM384 576h192v351.872a96 96 0 0 1-192 0V576z" fill=""></path></symbol><symbol id="icon-subscript" viewBox="0 0 1157 1024"><path d="M986.70404 871.981313v66.663206h170.666667v85.355481h-255.977853v-194.67428l170.666667-79.995847v-66.663206h-170.666667v-85.355481h255.977853v194.67428l-170.666667 79.995847zM864.0526 0h-181.297344L432.092742 250.662514 181.341639 0H0l341.333333 341.333333L0 682.666667h181.341639l250.751103-250.662514 250.662514 250.662514h181.297344l-341.333334-341.333334L864.0526 0z"></path></symbol><symbol id="icon-superscript" viewBox="0 0 1157 1024"><path d="M986.810657 274.676626v66.656707h170.648454v85.34244h-255.990893V231.987195l170.684878-79.988049V85.342439h-170.684878V0h255.990893v194.688578l-170.648454 79.988048z m-122.67748 66.656707h-181.357237l-250.672927 250.672927-250.745776-250.672927H0l341.333333 341.333334L0 1024h181.357237l250.745776-250.636503 250.672927 250.636503h181.357237l-341.369758-341.333333 341.369758-341.333334z"></path></symbol><symbol id="icon-drag" viewBox="0 0 1024 1024"><path d="M192 256h640v64H192z m0 192h640v64H192z m0 192h640v64H192z"></path></symbol><symbol id="icon-foreColor" viewBox="0 0 1024 1024"><path d="M896.1024 869.4784L544.09216 0h-69.40672L170.68032 777.9328C131.54304 892.416 74.6496 955.392 0 966.8608V1024h373.43232v-57.1392h-69.40672c-49.84832 0-76.45184-22.9376-80.09728-68.83328 3.64544-42.00448 10.69056-72.4992 21.38112-91.5456l42.78272-114.23744h298.57792l69.40672 165.74464c3.3792 10.99776 5.50912 17.5104 6.47168 19.72224-0.4096-2.74432-0.77824-5.24288-1.26976-8.25344 1.90464 8.00768 2.29376 10.67008 1.26976 8.25344 2.7648 18.16576 4.23936 30.84288 4.23936 37.62176 3.39968 38.0928-23.22432 55.17312-80.09728 51.5072h-53.26848V1024H1024v-57.1392c-63.95904 0-106.72128-32.4608-127.8976-97.3824zM314.71616 614.4l117.18656-308.77696 122.88 308.77696H314.71616z"></path></symbol><symbol id="icon-tab" viewBox="0 0 1024 1024"><path d="M320 128H128v128h192V128z m384 0v128h192V128h-192zM128 320v576h768V320H128zM64 64h896v896H64V64z m320 64v128h256V128H384z"></path></symbol></svg>';
var css='.iceEditor{color:#353535;font-family:"Microsoft YaHei";font-size:14px;background:#fff;position:relative;border:solid 1px #ccc}.iceEditor *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.iceEditor a{color:#606060;text-decoration:none;-webkit-tap-highlight-color:transparent}.iceEditor a:hover{color:#000}.iceEditor input{padding:3px;border:1px solid #B7B7B7;font-family:inherit;font-size:inherit;vertical-align:middle}.iceEditor .icon{width:16px;height:16px;fill:currentColor;overflow:hidden;vertical-align:middle}.noselect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.iceEditor-menu-dropdown{transition:all .3s ease;-webkit-transition:all .3s ease;-moz-transition:all .3s ease;-o-transition:all .3s ease;-ms-transition:all .3s ease}.iceEditor-menu-dropdown::before{content:"";display:block;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid #676767;position:absolute;top:-8px;left:9px}.iceEditor-menu .iceEditor-menu-title{width:100%;text-align:center;height:30px;line-height:30px;border-top:1px solid #efefef}.iceEditor-menu-disabled .iceEditor-menu .icon{color:#ccc}.iceEditor-menu-disabled .iceEditor-menu .active .icon{color:#606060}.iceEditor-tool{width:100%;background:#eee;border-bottom:solid 1px #ccc;position:relative}.iceEditor-tool:after,.iceEditor-tool:before{display:table;content:" "}.iceEditor-tool:after{clear:both}.iceEditor-menu{width:100%;padding:0 10px;display:inline-block;float:left}.iceEditor-menu a{list-style:none;float:left;width:35px;height:35px;text-align:center;line-height:35px;cursor:pointer}.iceEditor-menu a:hover{background:#cdcdcd}.iceEditor-menu .active{background:#e0e0e0;position:relative;z-index:999}.iceEditor-menu .disabled{background:rgba(255,255,255,0);width:100%;height:100%;position:absolute;left:0;top:0;display:none}.iceEditor-menu .icon{font-size:16px}.iceEditor-menu li{display:inline-block;float:left}.iceEditor-menu li:hover .iceEditor-menu-dropdown{top:44px;opacity:1;visibility:visible}.iceEditor-menu .maxWindow,.iceEditor-menu .minWindow{float:right}.iceEditor-menu .line{height:35px;border-right:1px solid #ccc;width:1px;margin:0 10px;vertical-align:middle}.iceEditor-menu .fileUpload-input{display:none}.iceEditor-menu .fileUpload-btn{float:none;width:auto;font-size:15px;background:#00b7ee;height:40px;line-height:40px;padding:0 30px;color:#fff;display:inline-block;margin:0 auto 15px auto;cursor:pointer;box-shadow:0 1px 1px rgba(0,0,0,.1)}.iceEditor-menu .fileUpload-btn:hover{background:#009ccb}.iceEditor-menu-dropdown{top:80px;opacity:0;visibility:hidden;position:absolute;background:#fff;z-index:999;-webkit-box-shadow:0 2px 9px 0 rgba(0,0,0,.2);box-shadow:0 2px 9px 0 rgba(0,0,0,.2);border-bottom:2px solid #676767;border-top:1px solid #676767}.iceEditor-menu-dropdown a{width:auto;color:#151515;background:#fff;border-top:1px solid #efefef;padding:0 20px;margin:0}.iceEditor-menu-dropdown a:hover{color:#151515;background:#efefef}.iceEditor-menu-dropdown.backColor{width:230px;padding:5px}.iceEditor-menu-dropdown.backColor a{width:20px;height:20px;padding:0;margin:1px}.iceEditor-menu-dropdown.fontSize{width:342px}.iceEditor-menu-dropdown.createLink{width:350px}.iceEditor-menu-dropdown.createLink li{width:100%}.iceEditor-menu-dropdown.createLink a{width:100%}.iceEditor-menu-dropdown.createLink div{width:100%;height:50px;text-align:center;line-height:50px}.iceEditor-menu-dropdown.createLink input{width:230px}.insertImage{text-align:center}.insertImage .iceEditor-popup-btn{width:100%;border:0;color:#fff;background:#03A9F4;border-top:1px solid #efefef;padding:0 20px;margin:0;height:35px;text-align:center;line-height:35px;cursor:pointer;margin-top:20px;outline:0}.insertImage .iceEditor-popup-btn:hover{color:#151515;background:#efefef}.insertImage-url{width:140px;height:27px;outline:0;margin-right:15px}.insertImage-width{width:50px;height:27px;outline:0;margin-right:15px}.insertImage-height{width:50px;height:27px;outline:0}.iceEditor-menu .insertImage-value{width:auto;display:inline-block;float:none;color:#fff;height:27px;line-height:25px;padding:0 10px;background:#939393;vertical-align:middle;margin-left:5px;border:1px solid #7b7b7b}.iceEditor-menu .insertImage-value:hover{background:#7b7b7b!important;color:#fff}.iceEditor-menu-dropdown.tableMain .tableBox{position:relative;width:190px;height:214px;padding:5px;overflow:hidden}.iceEditor-menu-dropdown.tableMain .tableBgOn{position:absolute!important;top:5px;left:5px;z-index:4;width:18px;height:18px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC) repeat}.iceEditor-menu-dropdown.tableMain .tableBgOff{width:180px;height:180px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC) repeat}.iceEditor-menu-dropdown.tableMain .tableNum{height:30px;line-height:30px;text-align:center;color:#757575}.iceEditor-content{width:100%;height:100%;padding:20px;position:relative}.iceEditor-content:focus{outline:0}.iceEditor-drag{color:#757575;background:#eee;text-align:center;height:12px;line-height:0;cursor:n-resize}.iceEditor-disabled{position:absolute;width:100%;height:100%;top:0;left:0;background:rgba(191,191,191,.79);z-index:99999999;display:none}.iceEditor-popup{display:none}.iceEditor-popup-main{width:400px;height:200px;position:fixed;margin:auto;top:0;bottom:0;left:0;right:0;background:#fff;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.12);box-shadow:0 1px 1px rgba(0,0,0,.12);z-index:2}.iceEditor-popup-box{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.33);opacity:.5;filter:alpha(opacity=50);z-index:1}.iceEditor-popup-title{width:100%;height:30px;line-height:30px;background:#2f2f2f;padding:0 10px;color:#fff}.iceEditor-popup-close{float:right;padding:0 10px;color:#fff;font-size:18px;cursor:pointer}.iceEditor-popup-close:hover{color:#8fe5ff}.iceEditor-popup-content{width:100%;padding:10px;color:#000;overflow:auto;float:left}.iceEditor-popup .ice-upload{width:45px;height:45px;color:#bababa;margin:45px 20px 10px}.iceEditor-popup-main{animation-name:popup;animation-duration:.5s;-webkit-animation-name:popup;-webkit-animation-duration:.5s;-moz-animation-name:popup;-moz-animation-duration:.5s;-ms-animation-name:popup;-ms-animation-duration:.5s;-o-animation-name:popup;-o-animation-duration:.5s}@keyframes popup{0%{top:-100px;opacity:0}to{top:0;opacity:1}}@media (max-width:768px){.iceEditor-menu .line{display:none}.iceEditor-popup-main{margin:0!important;width:90%!important;height:90%!important;top:5%!important;left:5%!important}@keyframes popup{0%{margin-top:-50px}to{margin-top:0}}}';
(function svg(){var c=document.createElement('style'),d,s,b=document.body;c.type='text/css';if(c.styleSheet){c.styleSheet.cssText=css;}else{c.innerHTML=css;}document.getElementsByTagName('head')[0].appendChild(c);d=document.createElement("div");d.innerHTML=css+svgSprite;svgSprite=null;s=d.getElementsByTagName("svg")[0];if(s){s.setAttribute("aria-hidden","true");s.style.position="absolute";s.style.width=0;s.style.height=0;s.style.overflow="hidden";if(b.firstChild){b.firstChild.parentNode.insertBefore(s,b.firstChild)}else{b.appendChild(s)}}})();

export default ice;