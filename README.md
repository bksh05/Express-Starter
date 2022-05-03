# Express Pilot

Boilerplate Project for building RESTful APIs and microservices using Node.js, Express, Typescript, and MongoDB.


## Key Highlights
<ul>
  <li> Typescript integration </li>
  <li> ES2017 latest features like Async/Await </li>
  <li> Cors Enabled </li>
  <li> Uses <a href="https://github.com/helmetjs/helmet">helmet</a> to set some HTTP headers for security </li>
  <li> Load environment variables from .env files with <a href="https://github.com/rolodato/dotenv-safe">dotenv</a></li>
  <li> JWT based Authentication and Authorization for the APIs using <a href="https://www.passportjs.org/">passport.js</a></li>
  <li> Predefined Register and Login api</li>
  <li> Forgot and reset password flow</l1>
  <li> Example of predefined routes with jwt verification </li>
  <li> Logging mechanism using <a href="https://github.com/winstonjs/winston">winston</a> logger </li>
</ul>


## Requirements
<ul>
  <li> <a href="https://nodejs.org/en/download/current/" target="_blank">Node</a> </li>
  <li> Mongo or <a href="">Docker</a></li>
</ul>


## Getting Started

#### Clone the repo
```
git clone https://github.com/bksh05/Express-Pilot.git

cd Express-Pilot/
```

#### Install dependencies
```
npm install
```

#### Set environment variables
```
cp .env-example .env
```

#### Populate the .env file with your own configuration

  The configuration depends upon your mongo installation. If you don't have mongo installed you can check mongo <a href="https://www.mongodb.com/docs/manual/installation/">docs</a> or check steps here to run mongodb on docker.
  
#### Run it locally
```
npm start
```
