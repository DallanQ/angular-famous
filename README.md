An alternate approach to integrating Famo.us and AngularJS.
This approach requires you to write a bit more code than [famous-angular](https://github.com/Famous/famous-angular), but the library is simpler.

To test the examples

* run `bower install`
* start a webserver (e.g., `python -m SimpleHTTPServer 9000`)
* point your browser to `http://localhost:9000/examples`

## Comparison with famous-angular

famous-angular is a great project. The following comparison is from my point of view.
 
### Pro's
* Straightforward, thin layer between famous and angular; easy to understand; easier to debug app code
* Less bridge code; easy to keep up to date; less chance for bugs
* DOM ends up looking as it would if you wrote vanilla famous code; no extraneous divs
* Code ends up looking more like vanilla famous code examples; only a few additional concepts to learn
* Famous components are injectable for mocking during unit tests

### Con's
* Can't wire components together declaratively in HTML _(wiring up event handlers happens procedurally as in vanilla famous;
   declarative event handling could be added but it's not required because you can also do it procedurally)_
* Famous-angular's fa-animation functionality is amazing; I have nothing like that _(it should be considered for famous core)_
* I'm only implementing the functionality I need _(I'd be interested in adding more if others wanted to help)_

### Equal
* Both support angular's two-way data binding
* Both can hook into angular's animation framework
 