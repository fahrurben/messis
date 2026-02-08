### Messis
Messis is a harvest time tracking app clone. I build this as alternative to Harvest that is not have 
free subscriptions.

I design the application as Software as Service (SAAS). So, this application can handle
multiple client in multi tenant.

The application can running using docker

### Technology
* Django
* Django Rest Framework
* SQLite

### Installation
```
cp .env_local .env

Edit the .env accordingly

docker build -t messis-backend .

docker run -d -p 8000:8000 --env-file .env --name messis-backend messis-backend

docker exec -it messis-backend python manage.py migrate
```