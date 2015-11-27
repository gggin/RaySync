var fs = require("fs");
var fsEx = require('fs-extra');

var crypto = require('crypto');

// dir1是已经存在的文件夹（已创建） dir2是任意同级目录的文件夹名字（未创建）
var dir1 = "./test";
var dir2 = "C:/Users/admin/shishi/trytry";
function is_txtFile(dirname)
{   
    var reg = /[.]/;   
    var res = dirname.split(reg);
    if(res[1] == 'txt')   
        return true;
}

function cmpFile(file1, file2)
{
	var file1_content = fs.readFileSync(file1);
    var file2_content = fs.readFileSync(file2);

    var file1_md5 = crypto.createHash('md5');
    var file2_md5 = crypto.createHash('md5');
	
	file1_md5.update(file1_content);
	file2_md5.update(file2_content);

	var f1_md5 = file1_md5.digest('hex');
	var f2_md5 = file2_md5.digest('hex');

	var file1_sha256 = crypto.createHash('sha256');
    var file2_sha256 = crypto.createHash('sha256');
	
	file1_sha256.update(file1_content);
	file2_sha256.update(file2_content);

	var f1_sha256 = file1_sha256.digest('hex');
	var f2_sha256 = file2_sha256.digest('hex');


	if(f1_md5 == f2_md5 && f1_sha256 == f2_sha256)
	{
		return true;
	}
	else
	{
		return false;
	}
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
