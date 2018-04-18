build:
	@echo "Building PHP Conference Brazil mobile application..."
	@coffee -cj js/application.js js/application.coffee
	@handlebars js/templates/noticias-list.handlebars js/templates/palestrantes-list.handlebars js/templates/agenda-list.handlebars js/templates/tweets-list.handlebars js/templates/palestra-show.handlebars -f js/templates.js
	@cat js/vendor/jquery.js js/vendor/jquery-mobile.js js/vendor/handlebars.js js/templates.js js/application.js > js/phpconf.js
	@uglifyjs -nc js/phpconf.js > js/phpconf.min.js
	@rm js/phpconf.js js/application.js js/templates.js
	@echo "Done!"

clean:
	@rm js/phpconf.min.js