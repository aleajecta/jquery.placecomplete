//! jquery.placecomplete.js
//! version : 0.0.1
//! authors : Sébastien Hawkins
//! license : Apache

(function($){

    if(typeof $.fn.select2 == 'undefined'){
        console.log("ERROR: Placecomplete need Select2 plugin.")
    }
    //Google services
    var ac = null; //Autocomplete
    var ps = null; //Place

    //Google config
    // https://developers.google.com/maps/documentation/javascript/reference#AutocompletionRequest
    var googleAutocompleteOptions = {
        types: ["geocode"]
    };

    //Google init
    window.initGoogleMapsAPI = function(){
        ac = new google.maps.places.AutocompleteService();
        ps = new google.maps.places.PlacesService($('<div/>')[0]); //Google need a mandatory element to pass html result , we do not need this.
    }

    //Google Loading
    if (window.google && google.maps && google.maps.places) {
        window.initGoogleMapsAPI();
    } else {
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=initGoogleMapsAPI",
            dataType: "script",
            cache: true
        });
    }

    //Google placeservice result map
    var placeServiceResult = function(data,status){
        var CIVIC = 0, STREET = 1, CITY = 2, SECTEUR = 3, STATE = 4, COUNTRY = 5, ZIPCODE = 6;
        //todo If the result does not have 7 element data map is not the same
        //maybe we will need that html element google put mandatory
        var adrc = data.address_components;
        if(adrc.length != 7) return;

        $('.address input.address').val(adrc[CIVIC].long_name +' '+ adrc[STREET].long_name);
        $('.address input.city').val(adrc[CITY].long_name);
        $('.address input.state').val(adrc[STATE].long_name);
        $('.address input.country').val(adrc[COUNTRY].long_name);
        $('.address input.zipcode').val(adrc[ZIPCODE].long_name);
    }
	
	var placeServiceClear = function(){}

    //Select2 default options
    var select2DefaultOptions = {
        closeOnSelect: true,
        debug: false,
        dropdownAutoWidth: false,
        //escapeMarkup: Utils.escapeMarkup,
        language: 'en',
        minimumInputLength: 2,
        maximumInputLength: 0,
        maximumSelectionLength: 0,
        minimumResultsForSearch: 0,
        selectOnClose: false,
        theme: 'default',
        width: 'resolve',
        placeholder: {
            id: '-1', // the value of the option
            text: 'Search for address'
        },
        ajax:{
            delay:100
        },
        allowClear: true
    };

    //jQuery Plugin
    var pluginDefault = {
        placeServiceResult: placeServiceResult,
        placeServiceClear: placeServiceClear
    }
    $.fn.placecomplete = function (options) {
        this.each(function () {
            //Variable by instance
            var $s2 = $(this);

            //Init select2 for $this
            $s2.select2($.extend(true,{
                ajax: {
                    transport: function (params, success, failure) {
                        // is caching enabled?
                        //TODO(sébastien) ajouter le cache pour google autocomplete
                        if ($s2.data('ajax--cache')) {

                        }
                        else {
                            ac.getPlacePredictions($.extend(googleAutocompleteOptions,params.data),success);
                        }
                    },
                    data: function (params) {
                        return {input: params.term };
                    },
                    processResults: function (data, status) {
                        var response = {results:[]}
                        $.each(data,function(index,item){
                           item.id = item.place_id;
                           item.text = item.description;
                           response.results.push(item)
                        });
                        return response;
                    }
                }
            }, select2DefaultOptions, options || {} ));

            options = $.extend(true,pluginDefault,options);
            $s2.on('select2:select', function (evt) {
                ps.getDetails({ placeId: evt.params.data.place_id}, options.placeServiceResult);
            });
			$s2.on('select2:clear', function (evt) {
                options.placeServiceClear();
            });
        });
        return this;
    };

})(jQuery);
