import vdisk
import json
import urllib



app_key = '2517708176'
app_secret = 'e6b0cec7284817b9c93a31202299475a'
access_token = "dccedb6662dBDzW2Ko2Uo28Dkvydb9f3"
refresh_token = '95d2f36662dBDzW2Ko2Uo28Dkvyf3342'


localfile = "./1"
onlinefile = "/Ray"


'''
now  the file's framework is  /sandbox/Ray/copy.py  /sandbox/Sun

'''


x = vdisk.Client('sandbox')
#print x.account_info(access_token)
#print x.delta(access_token)

#print x.fileops_create_folder(access_token,"/Sun")

# upload
#print x.files_put(access_token,"/Ray/vdisk.py",open("./vdisk.py","rb"))

#print x.files(access_token,onlinefile)

#print x.files(access_token,'/Ray')

# 
#print x.metadata(access_token,onlinefile)








dict = x.files_list(access_token,onlinefile)
for (d,e) in dict.items():
     print "key:" + d 

#download
#x.file_download(access_token, localfile, onlinefile)
#print x.fileops_create_folder(access_token,"/Ray")