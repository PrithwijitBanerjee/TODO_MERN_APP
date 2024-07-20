# To-Do-App API Documentation: 
-------------------------------------------
# User related API endpoints: 

1. http://localhost:5000/api/v1/users/signUp

requested body: email, phoneNo, userName, password, role(optional: admin/regular)

requested params: none

requested method: POST


2. http://localhost:5000/api/v1/users/signIn

requested body: email, password

requested params: none

requested method: POST

3. http://localhost:5000/api/v1/users/forgotPassword

requested body: email, password

requested params: none

requested method: POST


4. http://localhost:5000/api/v1/users/list (Private API only Admin)

requested body: none

requested params: none

requested method: GET


5. http://localhost:5000/api/v1/users/del/:id (Private API only Admin)

requested body: none

requested params: id

requested method: DELETE


6. http://localhost:5000/api/v1/users/export_to_csv

requested body: none

requested params: none

requested method: GET






-----------------------------------------------------------------------------------
# Todo related API endpoints: 


1. http://localhost:5000/api/v1/todos/list 

requested body: none

requested params: none

requested method: GET

2. http://localhost:5000/api/v1/todos/list/:id

requested body: none

requested params: id

requested method: GET

3. http://localhost:5000/api/v1/todos/search/:keywords

requested body: none

requested params: keywords

requested method: GET

4. http://localhost:5000/api/v1/todos/list/active/all (Private API)

requested body: none

requested params: none

requested method: GET

5. http://localhost:5000/api/v1/todos/list/search/js

requested body: none

requested params: none

requested method: GET

6. http://localhost:5000/api/v1/todos/list/add (Private API)

requested body: title.desc, status, imgUrl

requested params: none

requested method: POST

7. http://localhost:5000/api/v1/todos/list/edit/:id (Private API)

requested body: title.desc, status, imgUrl

requested params: id

requested method: PUT/PATCH

8. http://localhost:5000/api/v1/todos/list/del/:id (Private API)

requested body: none

requested params: id

requested method: DELETE



--------------------------------------------------------------------

# Relationship between collections in MongoDb 

1) todos -> users (one to one) (1:1)

2) users -> todos (one to many) (1:n)