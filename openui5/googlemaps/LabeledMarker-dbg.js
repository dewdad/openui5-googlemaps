/**
 * openui5-googlemaps - OpenUI5 Google Maps library
 * @version v0.0.19
 * @link http://jasper07.github.io/openui5-googlemaps/
 * @license MIT
 */sap.ui.define(['jquery.sap.global', './Marker' , 'google.maps'],
    function(jQuery, Control, Gmaps) {
        "use strict";

		var libName = Control.getMetadata()._sLibraryName;

		sap.ui.getCore().getEventBus().subscribe(Gmaps.notifyEvent, function(){
			$.sap.require(libName+'.markerwithlabel');
			MarkerWithLabel = window.MarkerWithLabel;
		});

        var Marker = Control.extend('openui5.googlemaps.LabeledMarker', {
            metadata: {
                properties: {
					/*labelText: "$425K",
					labelClass: "labels", // the CSS class for the label
					labelStyle: {marginTop: "0px", marginLeft: "-21px", opacity: 0.75},
					labelVisible: true*/
					labelText:{
						type: 'string',
						bindable: 'bindable'
					},
					labelClass:{
						type: 'string',
						bindable: 'bindable'
					},
					labelStyle:{
						type: 'Object',
						bindable: 'bindable'
					},
					labelVisible:{
						type: 'boolean',
						default: true,
						bindable: 'bindable'
					}
                },
                events: {
                },
                renderer: {}
            }
        });

		Marker.prototype.createMarker = function(){
			console.log("overrider here");
			return new MarkerWithLabel(this.getOptions());
		};

		Marker.prototype.setLabelText = function(oValue) {
			this.setProperty('labelText', oValue, true);
			if (this.marker) {
				this.marker.setLabelText(this.getLabelText());
			}
		};

        return Marker;

    }, /* bExport= */ true);
