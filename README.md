# jquery.placecomplete
Google Maps/Place API for jQuery/Select2
##Require
-------

* [Select2](https://select2.github.io/) , tested with version 4.0.3 , (i do not think it will work with version below 4.0)
* [jQuery](https://jquery.com/) , tested with version 2.2.4
* `Google Maps API` Loaded on the fly no need to include , make sure you do not have another plugin that load it on the fly it could be loaded twice , but placecomplete will load it only 1 time event if initialize multiple time.

##Example
-------

```html
<script src="jquery.placecomplete.js"></script>
```

```javascript
$('.placecomplete').placecomplete({
    ajax: {delay:250},
    language: 'en'
});
```
**NOTE**
- Select2 v4.0+ will not trigger ajax if initialized on a `<input/>`.
- For this plugin to work with is full feature it should be initialize on a `<select>` element.

###Available options

``` javascript
//Placecomplete options
// Trigger when user select a place in the Select2 box
// data == Object returned by Google Place Service
// status == Status returned by Google Place Service
options.placeServiceResult = function(data,status){}

//Select2 options
options.anySelect2Options , ex: options.ajax {} , the select2 ajax options

$('.placecomplete').placecomplete(options);
```
