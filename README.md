# ml-kraken

ML-Kraken is a fully cloud-based solution designed and built to improve models management process. Each math model is treated as a separate network service that can be exposed under IP address and defined port. This approach is called MaaS (model as a service).

ML-kraken combines two pieces, backend based on serverless solution and frontend which is an Angular based app. As a native execution platform, we decided to use AWS public cloud. 


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


## Contributing
