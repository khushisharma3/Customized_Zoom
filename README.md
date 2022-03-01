# Hello Zoom Apps

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html)

Zoom Apps let you embed your application directly in the Zoom Client. Use this template to make something awesome!

## Prerequisites

1. [Node JS](https://nodejs.org/en/)
2. [Docker](https://docker.io/)
3. [Zoom Account](https://support.zoom.us/hc/en-us/articles/207278726-Plan-Types-)
4. [Zoom App]() OAuth Credentials
    1. Client ID
    2. Client Secret
    3. Redirect URI

You can follow [this guide]() to create a Zoom App with the [Zoom Marketplace](https://marketplace.zoom.us/).

## Installation

To get started clone the repo:

```shell
git clone https://github.com/zoom/hello-zoom-apps.git
```

Once cloned navigate to the `hello-zoom-app` directory:

```
cd hello-zoom-apps
```

## Setup

To start, fill out the [.env](.env) file with your **Client ID**, **Client Secret** and **Redirect URI** from your Zoom
App. No other fields need to be updated for development and many will be generated in the next section.

```dotenv
ZM_CLIENT_ID=...
ZM_CLIENT_SECRET=...
ZM_REDIRECT_URI=...
```

#### Zoom for Government

If you are a [ZfG](https://www.zoomgov.com/) customer you can use the `ZM_HOST` variable to change the base URL used for
Zoom.

## Start the App

### Development

Run the `dev` npm script to start in development mode using a Docker container.

```shell
npm run dev
```

The `dev` npm script will:

1. Generate random secrets for development
2. Start MongoDB in a container
3. Start the Zoom App in a container

### Production

You can use the `build` script to output a production docker image of your Zoom App. Make sure that you have configured
production keys and secrets in your .env file or through the Secrets Manager of your cloud platform.

```shell
npm run build
```

To start the app run the container that was built:

```shell
docker run -p 80:80 zoom-app
````

#### Without Docker

Building without Docker requires that you have an instance of MongoDB running natively, you've populated the .env with
secrets, and you have adjusted the MongoDB credentials.

The first step, as usual, is to enter your **Client ID**, **Client Secret** and **Redirect URI** for your Zoom App in
the [.env](.env) file. The following steps are unique to building without Docker:

##### Add your DB and Session Secrets

Run `gen-secrets.sh` to generate development secrets or manually enter your own secrets for production.

##### Change the MongoDB Connection String

Change `MONGO_USER` and `MONGO_PASS` to match the user of your database. Then, adjust the format of `MONGO_URL` to match
the connection string of your server.

##### Start the App

You can use NODE_ENV to set the environment when starting the app locally. Take a look at [package.json](package.json)
for best practices.

###### Development

```shell
npm start
```

###### Production

```shell
NODE_ENV=production npm start
```

## Serve over HTTPS

In order to use the Zoom App within Zoom you'll want to make sure that you're serving over HTTPS and your app is
publicly accessible. Often the easiest way to accomplish this is to use a tool like [Ngrok](https://ngrok.com) with the
port you're serving on:

```shell
ngrok http 3000
```

## Usage

1. Use the Ngrok URL to configure your Zoom App on the Zoom Marketplace with the following information:
    1. Home Page: `{{ Ngrok URL }}/`
    2. Redirect URL: `{{ Ngrok URL }}/auth`

**Example:** `https://foobar.ngrok.com:1234/auth`

2. Navigate to your application on the [Zoom Marketplace](https://marketplace.zoom.us)
3. Click **Install** from the Activation tab to install and open the app in your Zoom Client.

## Deployment

You can deploy this app on any service that allows you to host dynamic Node.js apps. If you're using Docker,
use `docker build` to build for production and deploy to a server that has MongoDB configured natively or in another
container (similar to [docker-compose.yml]())

1. [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
2. [Google Cloud](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/nodejs)
3. [AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/)

## Contribution

Please send pull requests and issues to this project for any problems or suggestions that you have!

### Keeping secrets secret

The application will use loaded data instead of pure environment variables. This adds an extra layer of protection for
secrets while developing. In a production environment, you should use a Secret Manager from your hosting platform
instead.

The [.env](.env) file should never be part of a commit or merge request and is automatically ignored by git after
running one of the following:

1. `npm install`
2. `npm run prepare`
3. `npm run dev`
4. `gen-secrets.sh`

### Code Style

This project uses prettier and eslint to enforce style and protect against coding errors along with a pre-commit git
hook ([husky](https://typicode.github.io/husky/#/)) to ensure files pass checks prior to commit.

### Testing

At this time there are no e2e or unit tests.

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or
our [Developer Forum](https://devforum.zoom.us). Priority support is also available
with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

