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

Rather than installing Postgres locally, this project template containerizes Postgres and Node in Docker by utilizing the Postgres Docker Official Image and NodeJS Official Image. Below are step-by-step instructions on getting this set up:

**🚨 Important:** Reference the `.example-env` file as an example for setting up your `.env` file locally.

## Step 1: Download Docker

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed on your computer. You can check this by running `docker ps` in your terminal. If it returns columns like `CONTAINER ID`, `IMAGE`, etc., then you're in business!

## Step 2: Set up your Postgres Docker container

1. Pull the Postgres Docker Official Image:*
```bash
docker pull postgres
```
*Note: this is the equivalent of installing Postgres locally, but we're instead installing it within Docker! No need to run `npm install pg` at any point in time.

2. Configure your `.env` file, which will need to be created locally and should live in the root directory of `/server`. Reference the `.example-env` file for the values you'll need to update, as these will be referenced in `docker-compose.yml`.

## Step 3: Set up your NodeJS container

1. Initialize npm in your project
```bash
npm init
```

2. Build your NodeJS image.

**Some background:**
This project template is setting up the NodeJS container with the help of instructions listed in the project's `Dockerfile`. 

Here's what's going on in there:
* `FROM node:16.13.1-alpine3.14` is telling Docker that we want to pull version 12 of the Node Docker Image Official Image.
* `WORKDIR /app` is defining the working directory, which is where application code and files will be placed.
* `["package.json", "package-lock.json", ".env", "./"]` is copying over the contents from the project over to the `/app` directory in the container. This is important because it contains dependencies like `express`, which is used in this project.
* `RUN npm install` installs the Node.js dependencies based on the `package.json` and `package-lock.json` files copied in the previous step.
* `COPY . .` copies the rest of the application code from the host machine to the `/app` directory inside the container. This includes all the application source code and files.
* `ENV PORT=9090` sets the environment variable PORT to the value 9090. This is often used to specify the port on which the Node.js application will listen, and should match the variable you specify in your .env file.
* `EXPOSE 9090` informs Docker that the application inside the container will use port 9090. However, this doesn't actually publish the port; it's more of a documentation feature, so make sure it matches the variable you specify in your .env file.
* `CMD [ "npm", "run", "dev" ]` specifies the default command to run when the container starts. In this case, it's running the `npm run dev` command (from within the container) to start the Node.js application.

Before we execute the command to this container, it's recommended that you create an account at [hub.docker.com](hub.docker.com) as a point of reference for defining your NodeJS container.

Execute this command to build your NodeJs container, where `[YOUR DOCKER USERNAME]` is the Docker username you just created and `project-template` is the name of your container. `:1.0` is an optional addition that just helps with specifying which "version" you're on.

```bash
docker build -t [YOUR DOCKER USERNAME]/project-template:1.0 .  
```

Check your Docker Desktop application. You should see the name you just specified in your list of Docker images. You can also verify a successful build by running this command in your terminal:

```bash
docker run docker.io/[YOUR DOCKER USERNAME]/project-template:1.0    
```

The terminal should output something like "Example app listening at http://localhost:[YOUR SERVER PORT]"

## Step 4: Running Postgres and Node together using `docker-compose.yml`

Now that Postgres and NodeJS have their own respective containers in Docker, you can run the command below to spin everything up (or tear everything down) at once:

To spin up Postgres and NodeJS together:
```bash
docker compose up
```

To tear it all down:
```bash
docker compose down
```

**🚨 Important: rebuilding containers**

If you, at any time, make changes to the files in your the `/server` directory of your project and want to see those changes reflected in your container, you need to run:

```bash
docker compose build
```

And that's it! You should now be set up to successfully fire up the back-end portion of your project.

# AWS
TODO

# Setup troubleshooting
See `TROUBLESHOOTING.md` for helpful tips on addressing errors you may run into while setting up your project.