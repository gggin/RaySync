# For both Python 2.x and 3.x
try:
    read_input = raw_input
except NameError:
    read_input = input
###############################################

import vdisk

app_key = '2517708176'
app_secret = 'e6b0cec7284817b9c93a31202299475a'
callback_url = 'http://123.57.34.194/'

x = vdisk.OAuth2(app_key, app_secret, callback_url);


import platform
if cmp(platform.system(), "Windows")==0 :
    import webbrowser
    webbrowser.open(x.authorize())



accepted = 'n'
while accepted.lower() == 'n':
    accepted = read_input('Have you authorized me? (y/n) ')
oauth_verifier = read_input('What is the PIN? ')


print x.access_token('authorization_code', oauth_verifier)


