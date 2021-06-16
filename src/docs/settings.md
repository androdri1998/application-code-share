## create a database in docker using postgres image
docker run --name [IMAGE_NAME] -e POSTGRES_USER=[USER_NAME] -e POSTGRES_DB=[DATABASE_NAME] -e POSTGRES_PASSWORD=[PASSWORD_DATABASE] -p [PORT]:5432 -d postgres
