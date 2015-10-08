/**
 * openui5-googlemaps - OpenUI5 Google Maps library
 * @version v0.0.18
 * @link http://jasper07.github.io/openui5-googlemaps/
 * @license MIT
 */sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', 'google.maps', './markerclusterer'],
    function(jQuery, Control, Gmaps, MarkerClusterer) {
        "use strict";

        MarkerClusterer = window.MarkerClusterer;

        var MarkerCluster = Control.extend('openui5.googlemaps.MarkerCluster', {
            metadata: {
                properties: {
                    'averageCenter': {
                        type: 'boolean',
                        bindable: 'bindable',
                        defaultValue: true
                    }
                },
                defaultAggregation: 'markers',
                aggregations: {
                    'markers': {
                        type: 'openui5.googlemaps.Marker',
                        multiple: true,
                        bindable: 'bindable'
                    }
                },
                events: {
                    'click': {},
                    'mouseover': {},
                    'mouseout': {}
                },
                renderer: {}
            }
        });

		var isComposite = null;

        MarkerCluster.prototype.init = function() {
            this.aListeners = [];
        };

        MarkerCluster.prototype.onMapRendered = function(map) {
            this.map = map;
            this.setClusterer();
        };

        MarkerCluster.prototype.onClusterClick = function(oCluster) {
            this.fireClick({
                cluster: oCluster
            });
        };

        MarkerCluster.prototype.onClusterMouseover = function(oCluster) {
            this.fireMouseover({
                cluster: oCluster
            });
        };

        MarkerCluster.prototype.onClusterMouseout = function(oCluster) {
            this.fireMouseout({
                cluster: oCluster
            });
        };

        MarkerCluster.prototype._getMarkers = function() {
            var that = this;
            var aMarkers = [];

            this.getMarkers().forEach(function(oMarker) {
                oMarker.setMarker();
                oMarker.setMap(that.map);
                aMarkers.push(oMarker.marker);
            });
            return aMarkers;
        };

        MarkerCluster.prototype.getOptions = function() {
            var options = {};
			if(isComposite === null) {
				try {
					isComposite = /CompositeMarker$/.test(this.mBindingInfos.markers.template.getMetadata()._sClassName);
				} catch (e) {
					isComposite = false
				}
			}
			if(isComposite) options.calculator = compositeSum;
            options.averageCenter = this.getAverageCenter();
            return options;
        };

        MarkerCluster.prototype.setClusterer = function() {
            this.markerClusterer = new MarkerClusterer(this.map, this._getMarkers(), this.getOptions());
            this.addListener('click', jQuery.proxy(this.onClusterClick, this));
            this.addListener('mouseover', jQuery.proxy(this.onClusterMouseover, this));
            this.addListener('mouseout', jQuery.proxy(this.onClusterMouseout, this));
        };



		// Demostrate calculator usage
		/*var markerCluster = new MarkerClusterer(map, marker_list, {
			gridSize:40,
			minimumClusterSize: 4,
			calculator: function(markers, numStyles) {
				if (markers.length &gt;= 50) return {text: markers.length, index: 3}; // red
				if (markers.length &gt;= 5) return {text: markers.length, index: 2};  // yellow
				return {text: markers.length, index: 0};    }                      // blue
		});*/

        MarkerCluster.prototype.addListener = function(event, callback, object) {
            this.aListeners.push(Gmaps.event.addListener(this.markerClusterer, event, callback));
        };

        MarkerCluster.prototype.removeListeners = function() {
            this.aListeners.forEach(function(oListener) {
                oListener.remove();
            });

            this.aListeners = [];
        };

        MarkerCluster.prototype.reset = function() {
            if (this.markerClusterer) {
                this.removeListeners();
                this.markerClusterer = undefined;
            }
        };

        MarkerCluster.prototype.onReset = function() {
            this.reset();
        };

        MarkerCluster.prototype.exit = function() {
            this.reset();
        };

		var compositeSum = function(markers, numStyles){
			var index = 0;
			var title = "";
			var clusterSize = markers.length;
			for (var i = 0; i < markers.length; i++) {
				var marker = markers[i];
				if(marker.get('count')>1) clusterSize+=marker.get('count')-1;
			}

			index = Math.min(clusterSize.toString().length, numStyles);
			console.log({clusterSize: clusterSize, numStyles: numStyles,index: index});
			return {text: clusterSize, index: index, title: title};
		}

        return MarkerCluster;

    },
    /* bExport= */
    true);
