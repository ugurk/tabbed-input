(function () {

	"use strict";

	var tabbedInput = angular.module( "tabbedInput", [] );

	tabbedInput.directive( 'tabbedInput', [function () {
		return {
			restrict : 'E',
			scope : true,
			bindToController : {
				data : '=tabData'
			},
			controllerAs : 'tabs',
			replace : true,
			template : '<div ng-show="!tabs.isEmptyData()" class="tabbed-input-container"><ul><li ng-repeat="(key, value) in tabs.data"><a href ng-click="tabs.setSelected(key)" ng-class="{\'tabbed-input-current\':tabs.selectedKey==key, \'tabbed-input-valid\':!!value}"><span ng-bind="key"></span></a></li></ul><textarea ng-model="tabs.selectedValue" ng-disabled="!tabs.selectedKey" ng-keyup="tabs.edit()"></textarea></div>',
			controller : function () {

				var self = this;

				self.selectedKey = null;
				self.selectedValue = null;

				self.setSelected = function ( key ) {

					self.selectedKey = key;
					self.selectedValue = self.data[self.selectedKey]

				};

				self.edit = function () {

					self.data[self.selectedKey] = self.selectedValue;

				};

				function init () {

					for ( var k in self.data ) {
						self.selectedKey = k;
						break;

					}

				}

				self.isEmptyData = function () {
					//Why we iterate this: http://jsperf.com/keys-vs-iteration
					var isEmpty = true;
					for ( var key in self.data ) {

						if ( self.data.hasOwnProperty( key ) ) {
							isEmpty = false;
							break;
						}

					}

					if ( !isEmpty && !self.selectedKey ) init();
					return isEmpty;

				};

				return self;

			}
		};
	}] );

})();
