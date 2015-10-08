sap.ui.define(["jquery.sap.global","sap/ui/core/Control","google.maps","./Animation"],function(t,e,i,n){"use strict";for(var o=0;o<n.length;o++){n[o]}var s=e.extend("openui5.googlemaps.Marker",{metadata:{properties:{lat:{type:"float",bindable:"bindable"},lng:{type:"float",bindable:"bindable"},draggable:{type:"boolean",bindable:"bindable",defaultValue:!1},info:{type:"string",bindable:"bindable"},icon:{type:"any",bindable:"bindable"},visible:{type:"boolean",bindable:"bindable",defaultValue:!0},animation:{type:"int",bindable:"bindable",defaultValue:n.DROP}},events:{click:{},dragEnd:{},infoWindowClose:{}},renderer:{}}});return s.prototype.init=function(){this._dragging=!1,this.aListeners=[],this.iwMaxWidth=360},s.prototype.updatePosition=function(){this.marker&&null!==this.getLat()&&null!==this.getLng()&&(t.sap.clearDelayedCall(this.delayedCallId),this.delayedCallId=t.sap.delayedCall(0,this,function(){this.marker.setPosition(new i.LatLng(this.getLat(),this.getLng()))}))},s.prototype.setLat=function(t){this.setProperty("lat",parseFloat(t),!0),this.updatePosition()},s.prototype.setLng=function(t){this.setProperty("lng",parseFloat(t),!0),this.updatePosition()},s.prototype.setVisible=function(t){this.setProperty("visible",t,!0),this.marker&&this.marker.setVisible(this.getVisible())},s.prototype.setIcon=function(t){this.setProperty("icon",t,!0),this.marker&&this.marker.setIcon(this.getIcon())},s.prototype.getMap=function(){return this.map},s.prototype.setMap=function(t){this.map=t},s.prototype.createMarker=function(){return new i.Marker(this.getOptions())},s.prototype.setMarker=function(){this.marker?(this.marker.setMap(this.map),this.marker.setOptions(this.getOptions())):(this.marker=this.createMarker(),this.marker.setMap(this.map),this.addListener("click",t.proxy(this.onClick,this)),this.getDraggable()&&this.addListener("dragend",t.proxy(this.onDragEnd,this))),this.getInfo()&&!this.infoWindow?(this.infoWindow=new i.InfoWindow({content:this.getInfo(),maxWidth:this.iwMaxWidth}),this.aListeners.push(i.event.addListener(this.infoWindow,"closeclick",t.proxy(this.onInfoWindowClose,this)))):this.infoWindow&&this.infoWindow.setContent(this.getInfo())},s.prototype.getOptions=function(){var t={};return t.position=new i.LatLng(this.getLat(),this.getLng()),t.draggable=this.getDraggable(),t.animation=this.getAnimation(),t.visible=this.getVisible(),t.icon=this.getIcon(),t},s.prototype.onMapRendered=function(t){this.setMap(t),this.setMarker()},s.prototype.addListener=function(t,e){this.aListeners.push(i.event.addListener(this.marker,t,e))},s.prototype.removeListeners=function(){this.aListeners.forEach(function(t){t.remove()}),this.aListeners=[]},s.prototype.infoWindowOpen=function(e){this.infoWindow.open(this.map,this.marker),e&&t.sap.delayedCall(2e3,this,function(){this.infoWindowclose()})},s.prototype.infoWindowClose=function(){this.infoWindow.close()},s.prototype.onClick=function(){this.infoWindow&&this.infoWindowOpen(),this.fireClick({map:this.map,marker:this.marker,context:this.getBindingContext(),location:{lat:this.getLat(),lng:this.getLng()}})},s.prototype.onDragEnd=function(){var t=this.marker.getPosition();this.setLat(t.lat()),this.setLng(t.lng()),this.fireDragEnd({position:t})},s.prototype.onInfoWindowClose=function(){this.fireInfoWindowClose({})},s.prototype.reset=function(){this.marker&&(this.removeListeners(),this.marker.setMap(null))},s.prototype.onReset=function(){this.reset()},s.prototype.exit=function(){this.reset()},s},!0);