angular.module('DoctorQuick.directives', [])


.directive('mdToggle', function($ionicGesture, $timeout) {
	return {
		restrict: 'E',
    replace: 'true',
    require: '?ngModel',
    transclude: true,
		template:
    '<div class="flip-toggle">' +
    '<div ng-transclude></div>' +
    '<label class="toggle">' +
    '<input type="checkbox">' +
    '<div class="track">' +
    '<div class="handle"><span class="handle-label handle-label-a">ON</span><span class="handle-label handle-label-b">OFF</span></div>' +
    '</div>' +
    '</label>' +
    '</div>',
		compile: function(element, attr) {
      var input = element.find('input');
      angular.forEach({
        'name': attr.name,
        'ng-value': attr.ngValue,
        'ng-model': attr.ngModel,
        'ng-checked': attr.ngChecked,
        'ng-disabled': attr.ngDisabled,
        'ng-true-value': attr.ngTrueValue,
        'ng-false-value': attr.ngFalseValue,
        'ng-change': attr.ngChange
      }, function(value, name) {
        if (angular.isDefined(value)) {
          input.attr(name, value);
        }
      });


      if(attr.toggleClass) {
        element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
      }

      return function($scope, $element, $attr) {
        var el, checkbox, track, handle;

        el = $element[0].getElementsByTagName('label')[0];
        checkbox = el.children[0];
        track = el.children[1];
        handle = track.children[0];

        var ngModelController = angular.element(checkbox).controller('ngModel');

        $scope.toggle = new ionic.views.Toggle({
          el: el,
          track: track,
          checkbox: checkbox,
          handle: handle,
          onChange: function() {
            if(checkbox.checked) {
              ngModelController.$setViewValue(true);
            } else {
              ngModelController.$setViewValue(false);
            }
            $scope.$apply();
          }
        });

        $scope.$on('$destroy', function() {
          $scope.toggle.destroy();
        });
      };
    }
	}
})

.directive('showHideContainer', function(){
	return {
		scope: {
		},
		controller: function($scope, $element, $attrs) {
			$scope.show = false;

			$scope.toggleType = function($event){
				$event.stopPropagation();
				$event.preventDefault();

				$scope.show = !$scope.show;

				// Emit event
				$scope.$broadcast("toggle-type", $scope.show);
			};
		},
		templateUrl: 'views/common/show-hide-password.html',
		restrict: 'A',
		replace: false,
		transclude: true
	};
})


.directive('showHideInput', function(){
	return {
		scope: {
		},
		link: function(scope, element, attrs) {
			// listen to event
			scope.$on("toggle-type", function(event, show){
				var password_input = element[0],
						input_type = password_input.getAttribute('type');

				if(!show)
				{
					password_input.setAttribute('type', 'password');
				}

				if(show)
				{
					password_input.setAttribute('type', 'text');
				}
			});
		},
		require: '^showHideContainer',
		restrict: 'A',
		replace: false,
		transclude: false
	};
})

//Use this directive to open external links using inAppBrowser cordova plugin
.directive('dynamicAnchorFix', function($ionicGesture, $timeout, $cordovaInAppBrowser) {
	return {
		scope: {},
		link: function(scope, element, attrs) {
			$timeout(function(){
				var anchors = element.find('a');
				if(anchors.length > 0)
				{
					angular.forEach(anchors, function(a) {

						var anchor = angular.element(a);

						anchor.bind('click', function (event) {
							event.preventDefault();
							event.stopPropagation();

							var href = event.currentTarget.href;
							var	options = {};

							//inAppBrowser see documentation here: http://ngcordova.com/docs/plugins/inAppBrowser/

							$cordovaInAppBrowser.open(href, '_blank', options)
								.then(function(e) {
									// success
								})
								.catch(function(e) {
									// error
								});
						});

					});
				}
			}, 10);
		},
		restrict: 'A',
		replace: false,
		transclude: false
	};
})

.directive('validPin', function($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(pinValue) {
				// $http({
				// 	method: 'POST',
				// 	url: '/api/check/' + attrs.validPin,
				// 	data: {'pin': attrs.validPin}
				// }).success(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', data.isValid);
				// }).error(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', false);
				// });
				if(pinValue==="")
				{
					c.$setValidity('valid-pin', true);
				}
				else
				{
					c.$setValidity('valid-pin', false);
				}
			});
		}
	};
})

.directive('multiBg', function(_){
	return {
		scope: {
			multiBg: '=',
			interval: '=',
			helperClass: '@'
		},
		controller: function($scope, $element, $attrs) {
			$scope.loaded = false;
			var utils = this;

			this.animateBg = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
					$element.css({'background-image': 'url(' + $scope.bg_img + ')'});
				});
			};

			this.setBackground = function(bg) {
				$scope.bg_img = bg;
			};

			if(!_.isUndefined($scope.multiBg))
			{
				if(_.isArray($scope.multiBg) && ($scope.multiBg.length > 1) && !_.isUndefined($scope.interval) && _.isNumber($scope.interval))
				{
					// Then we need to loop through the bg images
					utils.setBackground($scope.multiBg[0]);
				}
				else
				{
					// Then just set the multiBg image as background image
					utils.setBackground($scope.multiBg[0]);
				}
			}
		},
		templateUrl: 'views/common/multi-bg.html',
		restrict: 'A',
		replace: true,
		transclude: true
	};
})

.directive('bg', function() {
	return {
		restrict: 'A',
		require: '^multiBg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, multiBgController) {
			element.on('load', function() {
				multiBgController.animateBg();
		  });
		}
	};
})

.directive('preImg', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			ratio:'@',
			helperClass: '@'
		},
		controller: function($scope) {
			$scope.loaded = false;

			this.hideSpinner = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
				});
			};
		},
		templateUrl: 'views/common/pre-img.html'
	};
})

.directive('spinnerOnLoad', function() {
	return {
		restrict: 'A',
		require: '^preImg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, preImgController) {
			element.on('load', function() {
				preImgController.hideSpinner();
		  });
		}
	};
})

//new directives
.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
})


.directive('shiftInput', ['$parse', function($parse) {
    return {
        restrict: 'A',
        require: ['ngModel'],
        link: function(scope, element, attrs, ctrls) {
            var model=ctrls[0], form=ctrls[1];

            scope.next = function(){
                return model.$valid
            }

            scope.$watch(scope.next, function(newValue, oldValue){
                if (newValue && model.$dirty)
                {
                    var nextinput = element.next('input');
                    if (nextinput.length === 1)
                    {
                        // nextinput[0].focus();
												element.next()[0].focus();
                    }
                }
            })
        }
    }
}])

//directive for change password

.directive('nxEqual', function() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqual) {
                console.error('nxEqual expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.nxEqual, function (value) {
                model.$setValidity('nxEqual', value === model.$viewValue);
            });
            model.$parsers.push(function (value) {
                var isValid = value === scope.$eval(attrs.nxEqual);
                model.$setValidity('nxEqual', isValid);
                return isValid ? value : undefined;
            });
        }
    };
})
//
//favorite  Directive
.directive('buttonStar', function() {
  return {
    scope: true,
    restrict: 'E',
    template: '<button class="btn btn-icon"><span class="ionic_rating_icon_on" ng-class="{active: favorite.star}"></span></button>',
    link: function(scope, elem) {
      elem.bind('click', function() {
        scope.$apply(function(){
          scope.favorite.star = !scope.favorite.star;
        });
      });
    }
  };
})


.directive('accessibleForm', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            // set up event handler on the form element
            elem.on('submit', function () {
                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid');
                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }
    };
})

.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
})

.directive('iconSwitcher', function() {

  return {
    restrict : 'A',

    link : function(scope, elem, attrs) {

      var currentState = true;

      elem.on('click', function() {
        console.log('You clicked me!');

        if(currentState === true) {
          console.log('It is on!');
          angular.element(elem).removeClass(attrs.onIcon);
          angular.element(elem).addClass(attrs.offIcon);
        } else {
          console.log('It is off!');
          angular.element(elem).removeClass(attrs.offIcon);
          angular.element(elem).addClass(attrs.onIcon);
        }

        currentState = !currentState

      });


    }
  };
})

.directive('submit', function() {
  return {
    restrict: 'A',
    link: function(scope, formElement, attrs) {
      var form;
      form = scope[attrs.name];
      return formElement.bind('submit', function() {
        angular.forEach(form, function(field, name) {
          if (typeof name === 'string' && !name.match('^[\$]')) {
            if (field.$pristine) {
              return field.$setViewValue(field.$value);
            }
          }
        });
        if (form.$valid) {
          return scope.$apply(attrs.submit);
        }
      });
    }
  };
})


.directive('autoNext', function() {
    return {
       restrict: 'A',
       link: function(scope, element, attr, form) {
           var otpBox = parseInt(attr.otpBox);
           var maxLength = parseInt(attr.ngMaxlength);
           element.on('keypress', function(e) {
               if (element.val().length > maxLength-1) {
                  var next = angular.element(document.body).find('[otpBox=' + (otpBox+1) + ']');
                  if (next.length > 0) {
                      next.focus();
                      return next.triggerHandler('keypress', { which: e.which});
                  }
                  else  {
                      return false;
                  }
               }
               return true;
           });

       }
    }
});

;
