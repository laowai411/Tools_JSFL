
//脚本使用说明:
//1.打开Flash 软件.
//选择新建一个Flash javaScript文件.
//copy下面的代码到新建的Flash javaScript文件中.
//设置好命令名称，保存.
//然后在Flash 的菜单中选择命令，就可以看到设定的命令了.点击即可使用.


//--------------------------读取参数------------------------------------------------

fl.outputPanel.clear();

fl.outputPanel.trace("脚本开始执行"); 

//默认临时配置文件地址.
var configURL = 'file:///C|/fb4.6/EditerArt/temp/jsflConfig.xml';

//读取临时jsflConfig的参数.
var params = FLfile.read(configURL).split("&");

//工作目录.
var rootPathStr = params[0];

fl.outputPanel.trace("读取config，获得工作目录:" + rootPathStr); 

//打开图片目录  

var folder = rootPathStr + "/" + "make";

fl.outputPanel.trace("folder目录:" + folder); 

//取的文件列表句柄  
var list = FLfile.listFolder(folder,"files"); 

//获取文档类.
var doc = fl.createDocument();  

//存储图片到库.
if(list)
{   
    //循环这个句柄 获得所有的子文件  
    for(var i = 0;i<list.length;i++)
    {  
        var filename = list[i];  
        if(filename.toLowerCase().substr(filename.length - 4) == ".png")
		{  
		    fl.outputPanel.trace("正在导入到库："+ filename); 
            //文件导入到flash/舞台/库  
            doc.importFile(folder + "/" + filename,true);  
		}
     }       
}  

var lib=fl.getDocumentDOM().library;//取得库   
  
var libLength=lib.items.length;//库元素的长度   

fl.outputPanel.trace("库元素长度"+libLength); 

var bitmapArr=new Array();//库里面没有处理的位图  

for( var i = 0;i<libLength;i++)
{
	  if(lib.items[i].itemType=="bitmap")   
　    {   
　         bitmapArr.push(lib.items[i].name);  
           fl.outputPanel.trace("添加一张位图准备处理" + lib.items[i].name); 
　    }   
}

fl.outputPanel.trace("准备开始处理到帧" + bitmapArr.length); 

//开始处理
if(bitmapArr.length>0)     
{   
	var currName = "";
	var fileURL = "";
	for( var i = 0; i <bitmapArr.length;i++)
	{
		currName = bitmapArr[i];
		currName = currName.split(".")[0]+".xml";
		fileURL = folder + "/" +currName;
		fl.outputPanel.trace("fileURL:" + fileURL); 
		var str = FLfile.read( fileURL); 
		if (str) 
		{ 
		fl.outputPanel.trace(str);  
        }
		var arr = str.split("_"); 
		var ix = parseInt(arr[0]);
		var iy = parseInt(arr[1]);
		var iw = parseInt(arr[2]);
		var ih = parseInt(arr[3]);
		var ixx = parseInt(ix + iw/2);
		var iyy = parseInt(iy + ih/2);					  
		fl.outputPanel.trace("ixx: " + ixx); 
		fl.outputPanel.trace("iyy: " + iyy); 
		fl.outputPanel.trace("iw: " + iw); 
		fl.outputPanel.trace("ih: " + ih); 
		lib.selectItem(bitmapArr[i]);
		lib.addItemToDocument({x:ixx,y:iyy});
		fl.outputPanel.trace("cover前添加到第几帧:"+doc.getTimeline().currentFrame);  
		doc.getTimeline().convertToBlankKeyframes();
		fl.outputPanel.trace("cover后准备添加到第几帧:"+doc.getTimeline().currentFrame);  
	}
	doc.getTimeline().removeFrames();
}

//------------------------------发布swf-------------------------------------------------------
  
  var pPath = rootPathStr + "/_Profile_.xml";//发布配置存储路径.
  var publishName = params[3] + "_" + params[2];//发布swf名称和路径.

  var xml, from, to, delta;
  xml = FLfile.read(params[1]);

  //调整发布swf名称.
  from = xml.indexOf("<flashFileName>");
  to = xml.indexOf("</flashFileName>");
  delta = xml.substring(from, to);
  xml = xml.split(delta).join("<flashFileName>" + publishName);

  FLfile.write(pPath, xml);//存储发布配置.
  doc.importPublishProfile(pPath);//应用发布配置.
  doc.save(false);//临时保存fla.
  doc.publish();//发布fla.
  fl.outputPanel.trace("发布完成:" + publishName);  
//-------------------------------------------------------------------------------------