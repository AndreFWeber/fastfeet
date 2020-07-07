# fastfeet

#backend

docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
sudo docker run --name redisFastfeet -p 6379:6379 -d -t redis:alpine

yarn install
yarn dev

CREATE DB fastfeet
yarn sequelize db:migrate
yarn sequelize db:seed:all

#web
yarn install
yarn start
