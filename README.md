# jquery.placecomplete
Google Maps/Place API for jQuery/Select2
## Require

* [Select2](https://select2.github.io/) , tested with version 4.0.3 , (i do not think it will work with version below 4.0)
* [jQuery](https://jquery.com/) , tested with version 2.2.4

## Example

``` html
<script src="jquery.placecomplete.js"></script>
```

``` javascript

$('.placecomplete').placecomplete({
    ajax: {delay:250},
    language: 'en'
});

```

### Available options

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
