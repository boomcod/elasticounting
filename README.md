# Elasticounting

Elasticounting is a very simple SPA (Single Page Application) example using Elasticsearch as database (based on [MEAN stack](http://mean.io)). You can import and manage your accounting data (Category/Operation) to Elasticsearch then visualize them through Kibana.</p>

* **Elasticsearch** : Many call example with full client **Elasticsearch.js API** (Ping, search, save/bulk, delete)
* **AngularJs** : Use Route, Controller and Service to use **MVC pattern** on front-end side
* **TypeScript** : Minimal use of TypeScript for business entity
* **Boostrap** : Get some default style
* **Node** : Out light web server
* **Other** : Back-end is currently empty but open to extension (Node/Express/Elasticsearch)

## Getting Started

* Make sure you have Node/npm + bower installed
* In frontend directory, get bower packages: bower install
* In backend directory, get node packages: npm install
* Start the server: node server.js
* Start your elasticsearch instance
* Go to your browser at http://localhost:3000
* Copy/Paste some accouting text in Import section
* Use the Regex to parse the text then click on Send To ElasticSearch 

## Configuration

You can change elasticsearch setting in /config.js file: host/index naming, ...

## Author

Get more projects and information on [BOOM!COD](http://boomcod.com)

