This repository is intended to get a web-application to a solid starting point. The technology stack for this template is:
* Postgresql
* Express
* React
* Node

It is intended to be developed, shipped, and run using Docker and hosted on AWS.

# Firing up the client

First, to run the front-end development server, run:

```bash
npm run client 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Firing up the server

Since `node_modules` (and friends) are included in the `.gitignore` file, you'll have to run these commands to get all necessary packages locally:
```bash
npm init
npm install express
```

To run the back-end development server, run:

```bash
npm run server
```

Test your connection in Postman by sending a route to [http://localhost:9000](http://localhost:9000).

# Postgresql and Docker setup

Rather than installing Postgres locally, this project template containerizes Postgres in Docker by utilizing the Postgres Docker Official Image. Below are step-by-step instructions on getting this setup:

1. Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed on your computer. You can check this by running `docker ps` in your terminal.

2. Pull the Postgres Docker Official Image:*
```bash
docker pull postgres
```
*Note: this is the equivalent of installing Postgres locally, but we're instead installing it within Docker!

3. Create a Postgres container for your project by running the following command:
```bash
docker run --name [YOUR PROJECT NAME] -e POSTGRES_PASSWORD=[YOUR DESIGNATED PASSWORD] -d postgres
```
After running this command, you should receive the container ID for your newly-created Postgres container, which is confirmation of a successful operation.

4. Let's shell into this new container to verify it's configured correctly:
```bash
docker exec -it [YOUR PROJECT NAME] bash
```

After running this command, you should see something like this: `root@272130be907c:/#`, indicating you have succesfully shelled into the container. Below are a few commands you can execute from within the container, as a starting point:
```bash
\l (outputs the list of available databases)
CREATE DATABASE testDatabase (creates a database called testDatabase)
```

# AWS
