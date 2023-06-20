# ring-alarm-control
Control your Ring Alarm system from anywhere using your phone, without paying a monthly subscription
![screenshot](https://github.com/qwazwsx/ring-alarm-control/assets/20545489/86868b32-bf8a-48be-b34a-f5be9553ebfc)


**Install:**

`npm i ring-alarm-control` or download this repository

**Obtain a Ring Auth Token:**
[read more](https://github.com/dgreif/ring/wiki/Refresh-Tokens#refresh-token-expiration)

`npx -p ring-client-api ring-auth-cli`

enter your credentials, copy the refresh token, and save it for the next step.

**Configure Ring-Alarm-Control**

Find and open the `.secret` file. Paste the refresh token from the previous step into the 'token' property. Then, create a secure password (preferably 50+ characters) and save it to the 'secret' property

**Run it!**

Start the server with 

`npm run server`

you can then access it on `http://localhost:9999#auth=YOUR_SECRET_HERE`

if you want the server to run continuously you can use `forever`

`forever start index.js`


-----
