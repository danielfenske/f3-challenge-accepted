# What is `Dockerfile` doing in `server/Dockerfile`?

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