/**
 * openui5-googlemaps - OpenUI5 Google Maps library
 * @version v0.0.19
 * @link http://jasper07.github.io/openui5-googlemaps/
 * @license MIT
 */sap.ui.define(['jquery.sap.global', './Marker' , 'google.maps'],
	function(jQuery, SuperClass, Gmaps) {
		"use strict";

		var libName = SuperClass.getMetadata()._sLibraryName;

		sap.ui.getCore().getEventBus().subscribe(Gmaps.notifyEvent, function(){
			$.sap.require(libName+'.richmarker');
			//RichMarker = window.RichMarker;
		});

		// add style classes for cluster markers
		$.sap.includeStyleSheet($.sap.getModulePath(libName)+'/css/markerclusters.css');

		var Marker = SuperClass.extend('openui5.googlemaps.CompositeMarker', {
			metadata: {
				properties: {
					count:{
						type: 'int',
						defaultValue: 1,
						bindable: 'bindable'
					}
				}
			},
			renderer: {}/*,
			onAfterRendering: function(){
				debugger;
			}*/
		});

		Marker.prototype.setCount = function(oValue) {
            this.setProperty('count', oValue, true);
            if (this.marker) {
                this.marker.set('count', this.getCount());
            }
        };

		Marker.prototype.setIcon = function(oValue){
			if(this.getCount()>1) return;
			/*if(!!this.marker && !this.marker.setIcon){
				this.marker.setMap(null);
				this.marker = null;
				this.rerender();
				return false;
			}else{*/
				SuperClass.prototype.setIcon.apply(this, arguments);
			/*}*/
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
			{
				max:Number.POSITIVE_INFINITY,
				name:'gmaps-cluster-m5'
			},
		];


		Marker.prototype.setMarker = function() {
			if(!!this.marker){
				this.marker.setMap(null);
				this.marker = null;
			}
			SuperClass.prototype.setMarker.call(this);
		};

		Marker.prototype.createMarker = function(){
			var oMarker;
			var count = this.getCount();
			if(count > 1){
				var clusterStyle = Math.min(count.toString().length, clusterTypes.length);
				var clusterType = clusterTypes[clusterStyle-1].name;
				var $div = $(document.createElement('DIV')).addClass(clusterType).text(count);
				oMarker = window.cmark = new RichMarker(jQuery.extend(this.getOptions(), {
					flat: true,
					anchor: RichMarkerPosition.MIDDLE,
					content: $div[0]
				}));
				oMarker.set('count', this.getCount());
			}else{
				//oMarker = new Gmaps.Marker(this.getOptions());
				oMarker = SuperClass.prototype.createMarker.call(this);
			}
			return oMarker;
		};

		return Marker;

	}, /* bExport= */ true);
