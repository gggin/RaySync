var fs = require("fs");
var fsEx = require('fs-extra');
//暂时只支持同一个目录下的文件夹拷贝 dir1是已经存在的文件夹（已创建） dir2是任意同级目录的文件夹名字（未创建）
var dir1 = "C:/Users/admin/RaySync/ceshi";
var dir2 = "C:/Users/admin/RaySync/trytry";
function is_txtFile(dirname)
{   
    var reg = /[.]/;   
    var res = dirname.split(reg);
    if(res[1] == 'txt')   
        return true;
}

function DoReCopy(Srcname, Desname) 
{
    var xx = fs.readdirSync(Srcname);
    fs.mkdirSync(Desname, 0777);

    for (var key in xx) 
    {
        var file_name = Srcname + "/" + xx[key];
        var fd = fs.openSync(file_name, "r");
        if (fs.fstatSync(fd).isDirectory()) 
        {
            fs.close(fd);  /*
            console.log(Desname);
            console.log(" is Directory");  */
            Srcname = Srcname +"/" + xx[key];
            Desname = Desname +"/" + xx[key];
   
           
         
            
            DoReCopy(Srcname, Desname); 
        } 
        else if (fs.fstatSync(fd).isFile()) 
        {
            fs.close(fd);
            if (is_txtFile(xx[key]))
                fsEx.copySync(file_name, Desname + "/" + xx[key]);
         
            console.log(Desname + "/" + xx[key]);
            console.log(" is file");
        }
    }
}



DoReCopy(dir1, dir2);
