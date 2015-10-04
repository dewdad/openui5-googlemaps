sap.ui.define(['jquery.sap.global', './Marker' , 'google.maps'],
	function(jQuery, Control, Gmaps) {
		"use strict";

		var libName = Control.getMetadata()._sLibraryName;

		sap.ui.getCore().getEventBus().subscribe(Gmaps.notifyEvent, function(){
			$.sap.require(libName+'.richmarker');
			//RichMarker = window.RichMarker;
		});

		// add style classes for cluster markers
		$.sap.includeStyleSheet($.sap.getModulePath(libName)+'/markerclusters.css');

		var Marker = Control.extend('openui5.googlemaps.CompositeMarker', {
			metadata: {
				properties: {
					count:{
						type: 'int',
						defaultValue: 1,
						bindable: 'bindable'
					}
				},
				events: {
				},
				renderer: {}
			}
		});

		Marker.prototype.setCount = function(oValue) {
            this.setProperty('count', oValue, true);
            if (this.marker) {
                this.marker.set('count', this.getCount());
            }
        };

		var clusterTypes = [
			{
				max:9,
				name:'gmaps-cluster-m1'
			},
			{
				max:99,
				name:'gmaps-cluster-m2'
			},
			{
				max:999,
				name:'gmaps-cluster-m3'
			},
			{
				max:Number.POSITIVE_INFINITY,
				name:'gmaps-cluster-m4'
			},
		];

		Marker.prototype.createMarker = function(){
			var oMarker;
			var count = this.getCount();
			if(count > 1){
				var digitsNum = Math.min(count.toString().length, clusterTypes.length);
				var clusterType = clusterTypes[digitsNum-1].name;
				var $div = $(document.createElement('DIV')).addClass(clusterType).text(count);
				oMarker = window.cmark = new RichMarker(jQuery.extend(this.getOptions(), {
					flat: true,
					anchor: RichMarkerPosition.MIDDLE,
					content: $div[0]
				}));
				oMarker.set('count', this.getCount());
			}else{
				oMarker = new Gmaps.Marker(this.getOptions());
			}
			return oMarker;
		};

		return Marker;

	}, /* bExport= */ true);
