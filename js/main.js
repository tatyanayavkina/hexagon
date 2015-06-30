'use strict';
/*
main file of application
 */
var app = new Application();
var locale = Localization.ru;
document.addEventListener('DOMContentLoaded', app.checkPageURI.bind(app), false);

