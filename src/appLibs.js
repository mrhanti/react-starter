//3rd party libs go here
import 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap-flex.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'moment';

//These functions forces babel-runtime to be included in the vendor lib instead of the main lib
const loadLibs = async () => await new Promise((r)=> r(0));
loadLibs();