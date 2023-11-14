User:
npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string,phoneNumber:string,address:string

Order:
npx sequelize-cli model:generate --name Order --attributes UserId:integer,ProductId:integer,quantity:integer

Product:
npx sequelize-cli model:generate --name Product --attributes name:string,description:string,price:integer,stock:integer,imageUrl:string