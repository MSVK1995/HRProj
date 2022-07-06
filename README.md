# HRProjRepo

Git repository for maintaining both frontend and backend code

# Backend

## Steps to setup the backend

1. Install python from [Python Org](https://www.python.org/downloads/release/python-392/)
2. Install python venv package - `py -m pip install --user virtualenv`
3. After cloning the project, navigate to 'backend' folder
4. Create a virtual environment `python -m venv djvenv`
5. Activate the virtual env `.\djvenv\Scripts\activate`
6. Note : To exit the VENV, run `deactivate` (keep the env active for project to run)
7. Once inside the venv, install all Django packages `pip install -r requirements.txt`
8. Finally, run the localhost server `python manage.py runserver`
9. In the browser type `localhost:8000/admin`
9. admin login:
*  Email    - admin@test.com
*  Password - admin@1234

# Frontend

## Steps to setup the frontend

1. Install nodejs from [NodeJs Org](https://nodejs.org/en/) {system restart maybe be required}
2. After cloning the project, navigate to 'frontend' folder
3. Open the IDE's or text editor's command prompt and type `npm install`
4. After all the dependencies are installed, run the local server using the command `npm start`