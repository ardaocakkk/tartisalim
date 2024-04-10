# tartisalim
A social media application for talk about your ideas or discuss about anything with people



## Technologies
- On backend: Python fastapi used
- On frontend: React, chakraui, tailwindcss, materialui used



## Installation
first clone this repo by ```git clone https://github.com/ardaocakkk/tartisalim.git```
- ```cd tartisalim```
- Create Python environment using ```mkvirtualenv tartisalim -p Python3```
- install pip packages

##  Set up
- on your machine go to .env file
- Briefly you can create a .env file using ```code .env```
- by entering this command to your cli "openssl rand -hex 32" you will get a key. This is your secretkey
- SECRET_KEY= ```your secret key```
- ALGORITHM=```HS256```

## To make servers up
- ###For Backend Server
- ```cd server ```
- ```uvicorn app.main:app --reload ```
- make sure backend server is running on port 8000
- ###For Frontend Server
- ```cd client ```
- ```npm init ```
- ```npm start ```
- make sure frontend server is running on port 5000
  
Any contributions are welcomed.
