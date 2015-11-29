var fs = require("fs");
var fsEx = require('fs-extra');

var crypto = require('crypto');

// dir1是已经存在的文件夹（已创建） dir2是任意同级目录的文件夹名字（未创建）
var dir1 = "./ceshi";
var dir2 = "E:/study/code/nodejs_test/trytry";
var newAdd = new Array();  //用来存储新加的文件夹的

//程序的测试步骤是 先注释掉最后一行cmpdir 执行DoReCopy将文件夹拷贝过去

//再接着对dir1中的文件进行修改 （暂时只对 文件以及文件夹的添加 文件内容的修改 做了识别）

//再接着注释掉倒数第二行的DoReCopy  执行cmpdir  将dir1同步到了dir2中





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

 
//这块应该属于第一次的上传 建立新的文件夹 
function DoReCopy(Srcname, Desname) 
{
//  console.log("in DoReCopy");
    var xx = fs.readdirSync(Srcname);
    fs.mkdirSync(Desname, 0777);

    for (var key in xx) 
    {
        var file_name = Srcname + "/" + xx[key];
//      console.log("DoReCopydir  " + file_name);
        var fd = fs.openSync(file_name, "r");
        if (fs.fstatSync(fd).isDirectory()) 
        {
            fs.close(fd);  

            Srcname = Srcname +"/" + xx[key];
            Desname = Desname +"/" + xx[key];




            DoReCopy(Srcname, Desname); 
        } 
        else if (fs.fstatSync(fd).isFile()) 
        {
            fs.close(fd);
            if (is_txtFile(xx[key]))
                fsEx.copySync(file_name, Desname + "/" + xx[key]);
        }
    }
//  console.log("out DoReCopy");
}






function contains(arr, obj) {
//  console.log("in contains     " + arr.length + "  "+ obj);

    for (var i = 0, l = arr.length; i < l; i++)
    {
        if(arr[i] == obj)
        {
 //         console.log(obj + "exists in array");
            return true;
        }
 //     console.log(arr[i]);
    }

    return false;
}

function cmpDir(dir1, dir2)
{
//  console.log("in cmpdir"  + "   " + dir1 + "  " + dir2  );
    var folder_exists = fs.existsSync(dir2);

    if(folder_exists == true)
    {
        var xx = fs.readdirSync(dir1);

        for (var key in xx) 
        {
            var file_name = dir1 + "/" + xx[key];

            if(contains(newAdd, dir1))
                continue;
//          console.log("cmpdir  "  + dir1 + " " + dir2 + "~~~"+ file_name);
            var fd = fs.openSync(file_name, "r");
            if (fs.fstatSync(fd).isDirectory()) 
            {
                fs.close(fd);  /*
                                  console.log(Desname);
                                  console.log(" is Directory");  */
                dir1 = dir1 +"/" + xx[key];
                dir2 = dir2 +"/" + xx[key];




                cmpDir(dir1, dir2); 
            }

            else if (fs.fstatSync(fd).isFile()) 
            {
                fs.close(fd);
                if (is_txtFile(xx[key]))
                {
                    if (!cmpFile(file_name, dir2 + "/" + xx[key]))
                    {
//                      console.log(dir2 + "/" + xx[key]);
//                      console.log("need to be written");
                        fsEx.copySync(file_name, dir2 + "/" + xx[key]);

                    }

                }

            }
        }


    }
    else
    {
        DoReCopy(dir1, dir2);
        newAdd.push(dir1);
    }

//  console.log("out cmpdir" + "   " + dir1 + "  " + dir2  );

}


//DoReCopy(dir1, dir2)

cmpDir(dir1, dir2);
