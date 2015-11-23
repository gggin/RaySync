var fs = require("fs");
var fsEx = require('fs-extra');

function DoReCopy(dirname) {
    var xx = fs.readdirSync(dirname);
    for (var key in xx) {
        var file_name = dirname + "/" + xx[key];
        var fd = fs.openSync(file_name, "r");
        if (fs.fstatSync(fd).isDirectory()) {
            fs.close(fd);
            DoReCopy(file_name);
        } else if (fs.fstatSync(fd).isFile()) {
            fs.close(fd);
            fsEx.copySync(file_name, "./allinone/" + xx[key]);
        }
    }
}

DoReCopy("./mxpwd_testfile_jiayang");


