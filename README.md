# Club Member management software

## Running the application

Use the package manager [npm](https://www.npmjs.com/) to client and server.

## Client app run

Change directory to client folder from the project root.

```bash
cd ./client
```

Make an .env file following env.example

```bash
PORT=3002
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_S3_URL=http://localhost:4000
NEXT_PUBLIC_JWT_SECRET=secret
```

Install packages

```bash
npm install
```

Run app

```bash
npm run dev
```

## Server app run

Change directory to server folder from the project root.

```bash
cd ./server
```

Make an .env file following env.example

```bash
DB_HOST=localhost
DB_PORT=27017
DB_NAME=appdb
JWT_SECRET=secret
JWT_EXPIRES_IN=100
PORT=4000
IS_MONGODB_CLOUD_URL=false
MONGODB_CLOUD_URL=mongodb+srv:// <USER >: <PASSWORD >@cluster0.abcd.mongodb.net/myFirstDatabase?retryWrites=true
```

Install packages

```bash
npm install
```

Run app

```bash
npm run dev
```
