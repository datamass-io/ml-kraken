# ml-kraken

ML-Kraken is a fully cloud-based solution designed and built to improve models management process. Each math model is treated as a separate network service that can be exposed under IP address and defined port. This approach is called MaaS (model as a service).

ML-kraken combines two pieces, backend based on serverless solution and frontend which is an Angular based app. As a native execution platform, we decided to use AWS public cloud. 

<p align="center">
  <img src="readme-media/ml-kraken.png?raw=true" alt="ELK"/>
</p>


## Main features

* R/Spark/Python models deployment
* MaaS (model as a service) - networked models
* models exposed under REST services
* easy integration with real-time analytical systems
* environment that easly scale-up
* ability to keep many model versions in one place
* jupyterhub plugin to communicate with ML-Kraken  

## Demo

<p align="center">
  <img src="readme-media/demo.gif" alt="demo"/>
</p>


## Requirements

* AWS account created
* serverless installed
* npm installed



## Cloud install

Before running build-and-deploy.sh script setup access to your AWS account. The serverless framework looks for .aws folder on your machine.

```
git clone git@github.com:datamass-io/ml-kraken.git
cd ./ml-kraken
./build-deploy.sh
```

## Running a simple R model

Each ML-Kraken model created has an assigned docker container from Amazon ECS. As a result, it is possible to run independent models that can be addressed with REST queries. After clicking the model start button, it takes a while for the container to become operational and establish an external IP. 

<p align="center">
  <img src="readme-media/model_run.gif" alt="request"/>
</p>

Performing calculations on a running model requires sending a POST request with the body containing data in JSON format. Example POST request using Postman:

<p align="center">
  <img src="readme-media/query.png" alt="request"/>
</p>

As above, JSON should contain:
<ul>
  <li>modelData - parameters which are send to model as a input</li>
  <li>metaData - requires specifying the model id to send a request to the correct model</li>
</ul>

After the calculations are finished, a new point will be visible on the graph showing the time from sending the request to the response.

<p align="center">
  <img src ="readme-media/graph.gif" alt="graph"/>
</p>

## Contributing
