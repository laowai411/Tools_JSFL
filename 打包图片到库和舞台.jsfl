
//脚本使用说明:
//1.打开Flash 软件.
//选择新建一个Flash javaScript文件.
//copy下面的代码到新建的Flash javaScript文件中.
//设置好命令名称，保存.
//然后在Flash 的菜单中选择命令，就可以看到设定的命令了.点击即可使用.



fl.outputPanel.clear();

fl.outputPanel.trace("脚本开始执行");  

//打开图片目录  
var folder = fl.browseForFolderURL("png图片目录"); 

//取的文件列表句柄  
var list = FLfile.listFolder(folder,"files"); 

//获取文档类.
var doc = fl.getDocumentDOM();  

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