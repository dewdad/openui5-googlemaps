sap.ui.define(["jquery.sap.global","./Marker","google.maps"],function(e,t,a){"use strict";var r=t.getMetadata()._sLibraryName;sap.ui.getCore().getEventBus().subscribe(a.notifyEvent,function(){$.sap.require(r+".markerwithlabel"),MarkerWithLabel=window.MarkerWithLabel});var i=t.extend("openui5.googlemaps.LabeledMarker",{metadata:{properties:{labelText:{type:"string",bindable:"bindable"},labelClass:{type:"string",bindable:"bindable"},labelStyle:{type:"Object",bindable:"bindable"},labelVisible:{type:"boolean","default":!0,bindable:"bindable"}},events:{},renderer:{}}});return i.prototype.createMarker=function(){return console.log("overrider here"),new MarkerWithLabel(this.getOptions())},i.prototype.setLabelText=function(e){this.setProperty("labelText",e,!0),this.marker&&this.marker.setLabelText(this.getLabelText())},i},!0);