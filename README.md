## Name
talenti_backend.

## Description
Repositorio que alberga un esquema de API de consulta y gestión relacionada a la información de supermercados y productos asociados a estos, asi como un inicio de sesión de usuario.

## Installation
Para ejecutar el repositorio de manera correcta, es necesario contar con las siguientes dependencias en su equipo:

node (version 18 o superior)

Posterior a esto, es necesario ejecutar los siguientes comandos:

npm i
npm run tsc
npm start

Para realizar los test correspondientes a las apis, ejecute el comando:

npm run test

## Usage
Las peticiones presentadas en este backend estan en un esquema API REST, por lo cual todas las peticiones se pueden consultar con un CURL mediante una plataforma de consulta de API (ya sea Insomnia o Postman).

Los curl a ejecutar en el ambiente local y de producción son los siguientes:

Registro de usuario:

(Local)
curl --request POST \
  --url http://localhost:4000/api/register_user \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "luis",
	"email": "suilppm@gmail.com",
	"password": "Testing12"
}'

(Servidor)
curl --request POST \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com/api/register_user \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "luis",
	"email": "suilppmasadsd@gmail.com",
	"password": "Testing12"
}'

Login de usuario:

(Local)
curl --request POST \
  --url https://localhost:4000/api/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "suilppm@gmail.com",
	"password": "Testing12"
}'

(Servidor)
curl --request POST \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "suilppm@gmail.com",
	"password": "Testing12"
}'

Registro de status (protegido por login)

(Local)
curl --request POST \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \ 
  --url http://localhost:4000/api/register_status \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Activo"
}'

(Servidor)
curl --request POST \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \ 
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/register_status \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Activo"
}'

Consulta de status disponibles (protegido por login)

(Local)
curl --request GET \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \ 
  --url http://localhost:4000/api/get-status

(Servidor)
curl --request GET \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \ 
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/get-status

Registro de supermercados (protegido por login)

(Local)
curl --request POST \
  --url http://localhost:4000/api/register_supermarket \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM3NzA1ODQsImV4cCI6MTY4Mzc3MTE4NH0.4mfa8iOy4NnoS9q8Gu7FcV8SkIIhAHrlJeKQuOGhUvM' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Forum",
	"description": "Supermercado Mayorista",
	"address": "Los Teques",
	"opening": "9:00",
	"closing": "23:00",
	"statusId": 1
}'

(Servidor)
curl --request POST \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/register_supermarket \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM3NzA1ODQsImV4cCI6MTY4Mzc3MTE4NH0.4mfa8iOy4NnoS9q8Gu7FcV8SkIIhAHrlJeKQuOGhUvM' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Forum",
	"description": "Supermercado Mayorista",
	"address": "Los Teques",
	"opening": "9:00",
	"closing": "23:00",
	"statusId": 1
}'

Consulta de todos los supermercados (protegido por login)

(Local)
curl --request GET \
  --url http://localhost:4000/api/get_supermarket \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM2ODQ4ODYsImV4cCI6MTY4MzY4NTQ4Nn0.KMRja6DUXa3MW8DYaEJkhheC_4FARFPHRuc20FbbIZM'

(Servidor)
curl --request GET \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/get_supermarket \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM2ODQ4ODYsImV4cCI6MTY4MzY4NTQ4Nn0.KMRja6DUXa3MW8DYaEJkhheC_4FARFPHRuc20FbbIZM'

Consulta de un unico supermercado mediante el id(protegido por login)

(Local)
curl --request GET \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \ 
  --url http://localhost:4000/api/get_supermarket/1

(Servidor)
curl --request GET \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \ 
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/get_supermarket/1

Editar un supermercado (protegido por login)

(Local)
curl --request PUT \
  --url http://localhost:4000/api/update_supermarket/4 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM3NzA1ODQsImV4cCI6MTY4Mzc3MTE4NH0.4mfa8iOy4NnoS9q8Gu7FcV8SkIIhAHrlJeKQuOGhUvM' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Forum",
	"description": "Supermercado Mayorista",
	"address": "Los Teques",
	"opening": "9:00",
	"closing": "23:00",
	"statusId": 1
}'

(Servidor)
curl --request PUT \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/update_supermarket/4 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM3NzA1ODQsImV4cCI6MTY4Mzc3MTE4NH0.4mfa8iOy4NnoS9q8Gu7FcV8SkIIhAHrlJeKQuOGhUvM' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Forum",
	"description": "Supermercado Mayorista",
	"address": "Los Teques",
	"opening": "9:00",
	"closing": "23:00",
	"statusId": 1
}'

Eliminar un supermercado mediante su id(protegido por login)

(Local)
curl --request DELETE \
  --url http://localhost:4000/api/delete-supermarket/2

(Servidor)
curl --request DELETE \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/delete-supermarket/2

Registrar producto (protegido por login)

(Local)
curl --request POST \
  --url http://localhost:4000/api/register_product \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \
  --header 'Content-Type: application/json' \
  --data '{
	"supermarketid": 1,
	"name": "ACE",
	"description": "Producto de limpieza",
	"quantity": 10,
	"amount": 1,
	"expired_at": "5/30/2023",
	"statusId": 1
}'

(Servidor)
curl --request POST \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/register_product \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTgxMzAsImV4cCI6MTY4MzgxODczMH0.d1ZW72OTzjSLr2Ka1Y6yJXWOZTN1i8cr3F2PZ8IGK6U' \
  --header 'Content-Type: application/json' \
  --data '{
	"supermarketid": 1,
	"name": "ACE",
	"description": "Producto de limpieza",
	"quantity": 10,
	"amount": 1,
	"expired_at": "5/30/2023",
	"statusId": 1
}'

Consulta de productos por id de supermercado (protegido por login)

(Local)
curl --request GET \
  --url http://localhost:4000/api/get_product_by_supermarket/1 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTg3OTAsImV4cCI6MTY4MzgxOTM5MH0.-UzLZpYaOm8a3czwwznLQZDZjhfaRGPDZcfGX5RkILk'

(Servidor)
curl --request GET \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/get_product_by_supermarket/1 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTg3OTAsImV4cCI6MTY4MzgxOTM5MH0.-UzLZpYaOm8a3czwwznLQZDZjhfaRGPDZcfGX5RkILk'

Consulta de producto por id de producto (protegido por login)

(Local)
curl --request GET \
  --url http://localhost:4000/api/get_product_by_id/6 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTg3OTAsImV4cCI6MTY4MzgxOTM5MH0.-UzLZpYaOm8a3czwwznLQZDZjhfaRGPDZcfGX5RkILk'

(Servidor)
curl --request GET \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/get_product_by_id/6 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTg3OTAsImV4cCI6MTY4MzgxOTM5MH0.-UzLZpYaOm8a3czwwznLQZDZjhfaRGPDZcfGX5RkILk'

Actualizar producto (protegido por login)

(Local)
curl --request PUT \
  --url http://localhost:4000/api/update_product/6 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTg3OTAsImV4cCI6MTY4MzgxOTM5MH0.-UzLZpYaOm8a3czwwznLQZDZjhfaRGPDZcfGX5RkILk' \
  --header 'Content-Type: application/json' \
  --data '{
	"supermarketid": 1,
	"name": "ACE",
	"description": "Producto de limpieza",
	"quantity": 10,
	"amount": 1,
	"expired_at": "5/30/2023",
	"statusId": 1
}'

(Servidor)
curl --request PUT \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/update_product/6 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTg3OTAsImV4cCI6MTY4MzgxOTM5MH0.-UzLZpYaOm8a3czwwznLQZDZjhfaRGPDZcfGX5RkILk' \
  --header 'Content-Type: application/json' \
  --data '{
	"supermarketid": 1,
	"name": "ACE",
	"description": "Producto de limpieza",
	"quantity": 10,
	"amount": 1,
	"expired_at": "5/30/2023",
	"statusId": 1
}'

Eliminar producto (protegido por login)

(Local)
curl --request DELETE \
  --url http://localhost:4000/api/delete_product/1 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTkyNzEsImV4cCI6MTY4MzgxOTg3MX0.G4GFz3lPSOIKpy9haoCucZz1HNWPH8AOjTzyjWiB-vw'

(Servidor)
curl --request DELETE \
  --url http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/delete_product/1 \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VpbHBwbUBnbWFpbC5jb20iLCJpYXQiOjE2ODM4MTkyNzEsImV4cCI6MTY4MzgxOTg3MX0.G4GFz3lPSOIKpy9haoCucZz1HNWPH8AOjTzyjWiB-vw'


## Support
Cualquier duda sobre el funcionamiento de las API o reporte de error, comunicarse al +584241797753 o al correo suillpm@gmail.com

## Authors 
Luis Plaza.

## Project status
Este proyecto fue realizado a manera de test segun las indicaciones suministradas.