import vdisk



app_key = '2517708176'
app_secret = 'e6b0cec7284817b9c93a31202299475a'
access_token = "d330f76662dBDzW2Ko2Uo28Dkvyf7cd0"
refresh_token = '95d2f36662dBDzW2Ko2Uo28Dkvyf3342'


localfile = "./1"
onlinefile = "/Ray/copy.py"


'''
now  the file's framework is  /sandbox/Ray/copy.py  /sandbox/Sun

'''


x = vdisk.Client('sandbox')
#print x.account_info(access_token)
#print x.delta(access_token)

#print x.fileops_create_folder(access_token,"/Sun")
#print x.files_put(access_token,"/Ray/copy.py",open("./vdisk_Oauth.py","rb"))

#print x.files(access_token,onlinefile)

#print x.files(access_token,'/Ray')



x.file_download(access_token, localfile, onlinefile)
#print x.fileops_create_folder(access_token,"/Ray")