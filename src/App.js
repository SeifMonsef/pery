import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import { closeMenu } from './components/Bar/actions';
import { isMenuVisible } from './components/Bar/reducer';
import SideMenu from './views/SideMenu/index';
import Bar from './components/Bar/Bar.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.getBar = this.getBar.bind(this);
  }
  getBar(){
    if(this.props.location.pathname ==='/cart'){
   return(   <div>
        {this.props.children}
        </div>
   )
    }
    else
    {
  return(    <div>
        <Bar />
        {this.props.children}
      </div>
  )
    }
  }
  hideSidebar() {
    if (this.props.sideMenuVisible) {
      this.props.closeMenu();
    }
  }

  render() {
    return (
      <div className="bigger" >
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <SideMenu isVisible={this.props.sideMenuVisible} closeMenu={this.props.closeMenu} />
        <Sidebar.Pusher dimmed={this.props.sideMenuVisible} onClick={this.hideSidebar} >
        {this.getBar()}
        </Sidebar.Pusher>
      </div>
    );
  }
}

App.propTypes = {
  sideMenuVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
const mapStateToProps = state => ({
  sideMenuVisible: isMenuVisible(state.navbar),
});
App.defaultProps = {
  children: null,
};
export default withRouter(connect(
  mapStateToProps,
  { closeMenu },
)(App));

// Execute the mongoDB file to create, define the collections and connect to the database
require("./api/config/DBConnection");

var express = require("express"),
	MongoClient = require("mongodb").MongoClient,
	logger = require("morgan"),
	path = require("path"),
	compression = require("compression"),
	bodyParser = require("body-parser"),
	config = require("./api/config"),
	fs = require("fs"),
	multer = require("multer"),
	router = express.Router(),
	url = "mongodb://localhost:3000/office-hours",
	app = express();

// Set the secret of the app that will be used in authentication
app.set("secret", config.SECRET);

// Middleware to log all of the requests that comes to the server
app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));


// Middleware to compress the server json responses to be smaller in size
app.use(compression());

app.use(express.static(path.join(__dirname, "dist")));
/*
  Middleware to parse the request body that is in format "application/json" or
  "application/x-www-form-urlencoded" as json and make it available as a key on the req
  object as req.body
*/
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

/*
  Middleware to match the request with one of our defined routes to do a certain function,
  All requests should have /api before writing the route as a convention for api servers
*/

// Middleware to handle any (500 Internal server error) that may occur while doing database related functions
app.use(function(err, req, res, next) {
	if (err.statusCode === 404) return next();
	res.status(500).json({
		// Never leak the stack trace of the err if running in production mode
		err: process.env.NODE_ENV === "production" ? null : err,
		msg: "500 Internal Server Error",
		data: null
	});
});

/*
  Middleware to handle any (404 Not Found) error that may occur if the request didn't find
  a matching route on our server, or the requested data could not be found in the database
*/
app.use(function(req, res) {
	res.status(404).json({
		err: null,
		msg: "404 Not Found",
		data: null
	});
	//res.sendFile(__dirname+ '/dist/index.html')
});

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

module.exports = app;
