fl.outputPanel.clear(); 
var fileURL = decodeURI(fl.browseForFileURL("select","选择对应的配置文件"));
/*取得配置文件内容*/
var buffConfig = FLfile.read(fileURL);
var buffArr = buffConfig.split("},");
var ReqExpIcon = /\"icon\"\:[0-9]+/;
var ReqExpId = /\"id\"\:[0-9]+/;
var ReqExpName = /\"name.+kind/;
//
var configBuffIconIdArr = [];
for(var i=0; i<buffArr.length; i++)
{
	var buffIcon = buffArr[i].match(ReqExpIcon);
	var buffIconId = buffIcon[0].split(":")[1];
	
	var buffId  = buffArr[i].match(ReqExpId);
	var tempBuffName = buffArr[i].match(ReqExpName);
	var buffName = tempBuffName[0].split(",")[0];
	
	var buffInfo = {'id':buffId, 'name':buffName, "icon":"\"icon\"："+buffIconId};
	
	var buffObj =  {'buffInfo':buffInfo, 'buffIconId':buffIconId}
	configBuffIconIdArr.push(buffObj);
}

/*取得目标库内容*/
var doc  = fl.getDocumentDOM();
var itemArr = doc.library.items;
var swfBuffIconIdArr = [];

for (var i=0; i<itemArr.length; i++)
{
	var obj = itemArr[i];
	if (obj.linkageExportForAS)
	{
		var objData = {'objName':obj.name, 'exportName':obj.linkageClassName}
		var ReqExpBuff = /Buff_[0-9]+/;
		var buffItem = objData.exportName.match(ReqExpBuff);
		if(buffItem!=null)
		{
			var buffItemId = buffItem[0].split("_")[1];
			var targetData = {'objData':objData, 'buffIconId':buffItemId}
			swfBuffIconIdArr.push(targetData);
		}
	}
}

/*比对文件内容,*/
fl.trace("BUFF图标：  配置文件有，SWF中没有的：");
for(var i=0; i<configBuffIconIdArr.length;i++)
{
	var configId = configBuffIconIdArr[i].buffIconId;
	var j=0;
	for(;j<swfBuffIconIdArr.length;j++)
	{
		if(configId == swfBuffIconIdArr[j].buffIconId)
		{
			break;
		}
	}
	if(j>=swfBuffIconIdArr.length)
	{
		fl.trace(configBuffIconIdArr[i].buffInfo.id + "	"+configBuffIconIdArr[i].buffInfo.name+"  "+configBuffIconIdArr[i].buffInfo.icon);
	}
}

fl.trace("\nBUFF图标：  配置文件中没有，SWF中有的：");
for(var i=0; i<swfBuffIconIdArr.length;i++)
{
	var configId = swfBuffIconIdArr[i].buffIconId;
	var j=0;
	for(;j<configBuffIconIdArr.length;j++)
	{
		if(configId == configBuffIconIdArr[j].buffIconId)
		{
			break;
		}
	}
	if(j>=configBuffIconIdArr.length)
	{
		fl.trace("ObjName:"+ swfBuffIconIdArr[i].objData.objName +"	ExportName:" + swfBuffIconIdArr[i].objData.exportName);
	}
}

