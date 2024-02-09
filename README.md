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

**🚨 Important:** Reference the `.example-env` file as an example for setting up your private `.env` file.

## Step 1: Download Docker

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed on your computer. You can check this by running `docker ps` in your terminal. If it returns columns like `CONTAINER ID`, `IMAGE`, etc., then you're in business!

## Step 2: Set up your Postgres Docker container

1. Pull the Postgres Docker Official Image:*
```bash
docker pull postgres
```
*Note: this is the equivalent of installing Postgres locally, but we're instead installing it within Docker! No need to run `npm install pg` at any point in time.

2. Spin up a Postgres container for your project by running the following command:*
```bash
docker run --name [YOUR PROJECT NAME] -e POSTGRES_PASSWORD=[YOUR DESIGNATED PASSWORD] -e POSTGRES_USER=[YOUR DESIGNATED USERNAME]  -p [YOUR DESIGNATED LOCAL PORT]:[YOUR DESIGNATED DOCKER PORT] -v [YOUR DESIGNATED VOLUME NAME]:[YOUR DESIGNATED LOCATION OF THE VOLUME] -d postgres
```

*Examples for the above command:
* [YOUR PROJECT NAME] --> project-template
* [YOUR DESIGNATED PASSWORD] --> examplePassword
* [YOUR DESIGNATED USERNAME] --> exampleUsername
* [YOUR DESIGNATED LOCAL PORT]:[YOUR DESIGNATED DOCKER PORT] --> 4321:4321
* [YOUR DESIGNATED VOLUME NAME]:[YOUR DESIGNATED LOCATION OF THE VOLUME] --> pgdata:/var/lib/postgresql/data

After running this command, it should retur the container ID for your newly-created Postgres container, which is confirmation of a successful operation. You should also be able to see your newly-created container and volume within Docker Desktop, matching the names provided in the command.

## Step 3: Set up your NodeJS container

1. Since `node_modules` (and friends) are included in the `.gitignore` file, you'll have to run this command to get all necessary packages locally:
```bash
npm init
```

2. Build your NodeJS image.

**Some background:**
This project template is setting up the NodeJS container with the help of instructions listed in the project's `Dockerfile`. 

Here's what's going on in there:
* `FROM node:12` is telling Docker that we want to pull version 12 of the Node Docker Image Official Image.
* `WORKDIR /app` is defining the working directory, which is where application code and files will be placed.
* `COPY package*.json ./` is copying over the contents in `package.json` and `package-lock.json` from the project over to the `/app` directory in the container. This is important because it contains dependencies like `express`, which is used in this project.
* `RUN npm install` installs the Node.js dependencies based on the `package.json` and `package-lock.json` files copied in the previous step.
* `COPY . .` copies the rest of the application code from the host machine to the `/app` directory inside the container. This includes all the application source code and files.
* `ENV PORT=9090` sets the environment variable PORT to the value 9090. This is often used to specify the port on which the Node.js application will listen, and should match the variable you specify in your .env file.
* `EXPOSE 9090` informs Docker that the application inside the container will use port 9090. However, this doesn't actually publish the port; it's more of a documentation feature, so make sure it matches the variable you specify in your .env file.
* `CMD [ "npm", "start" ]` specifies the default command to run when the container starts. In this case, it's running the npm start command to start the Node.js application.

Before we execute the command to this container, it's recommended that you create an account at [hub.docker.com](hub.docker.com) as a point of reference for defining your NodeJS container.

Execute this command to build your NodeJs container, where `[YOUR DOCKER USERNAME]` is the Docker username you just created and `project-template` is the name of your container. `:1.0` is an optional addition that just helps with specifying which "version" you're on.

```bash
docker build -t [YOUR DOCKER USERNAME]/project-template:1.0 .  
```

Check your Docker Desktop application. You should see the name you just specified in your list of Docker images. You can also verify a successful build by running this command in your terminal:

```bash
docker run docker.io/[YOUR DOCKER USERNAME]/project-template:1.0    
```

The terminal should output something like "Example app listening at http://localhost:[port #]"

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