angular.module("ngDirective", [])
    .directive("ngPut", function () {
        return {
            restrict: "A",
            scope: {
                ngPut: "="
            },
            link: function (scope, elem, attr) {
                elem[0].onfocus = function (event) {
                    scope.$apply(function () {
                        if (this.value.trim() !== "") {
                            scope.ngPut = event.target.value;
                        }
                    });
                };
                elem[0].onblur = function (event) {
                    scope.$apply(function () {
                        if (this.value.trim() !== "") {
                            scope.ngPut = event.target.value;
                        }
                    });
                };
                elem[0].onkeyup = function (event) {
                    scope.$apply(function () {
                        scope.ngPut = event.target.value;
                    });
                };
            }
        }
    })
    .directive("ngFile", function () {
        return {
            restrict: "A",
            scope: {
                ngFile: "="
            },
            link: function (scope, elem, attr) {
                elem[0].onchange = function (event) {
                    scope.$apply(function () {
                        scope.ngFile = event.target.files;
                    });
                };
            }
        }
    })
    .directive("ngEnter", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                elem[0].onkeypress = function (event) {
                    if (event.keyCode === 13) {
                        scope.$apply(function () {
                            scope.$eval(attr.ngEnter);
                        });
                    }
                };
            }
        }
    })
    .directive("ngNumeric", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                elem[0].onkeypress = function (event) {
                    if (attr.ngNumeric.toLowerCase() === "decimal") {
                        return (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 46) ? true : false;
                    } else {
                        return (event.keyCode >= 48 && event.keyCode <= 57) ? true : false;
                    }
                };
            }
        }
    })
    .directive("ngRequired", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                setTimeout(function () {
                    elem[0].setAttribute('required', '');
                }, 500);
                if (attr.ngRequired.toLowerCase() === "focus") {
                    elem[0].focus();
                    elem[0].onblur = function (event) {
                        var input = event.target;
                        if (input.value.trim() === "") {
                            input.focus();
                            setTimeout(function () {
                                elem[0].setAttribute('required', '');
                            }, 300);
                        }
                    };
                } else {
                    if (attr.ngRequired.trim() !== "") {
                        elem[0].onblur = function (event) {
                            var input = event.target;
                            if (input.value.trim() === "") {
                                eval(attr.ngRequired);
                                input.focus();
                                setTimeout(function () {
                                    elem[0].setAttribute('required', '');
                                }, 300);
                            }
                        };
                    } else {
                        elem[0].onblur = function (event) {
                            var input = event.target;
                            if (input.value.trim() === "") {
                                input.focus();
                                setTimeout(function () {
                                    elem[0].setAttribute('required', '');
                                }, 300);
                            }
                        };
                    }
                }
            }
        }
    })
    .directive("ngEnglishkey", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                var checKey = /^[A-Za-z]+$/;
                elem[0].onblur = function (event) {
                    if (!checKey.test(this.value) && this.value !== "") {
                        this.pattern = "^[A-Za-z]+$";
                        if (attr.ngEnglishkey.trim() !== "") {
                            eval(attr.ngEnglishkey);
                        }
                        this.focus();
                    }
                }
            }
        }
    })
    .directive("ngPasswordkey", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                var passKey = /^[A-Za-z0-9_@]+$/;
                elem[0].onblur = function (event) {
                    var input = event.target;
                    if (!passKey.test(input.value.trim()) && input.value.trim() !== "") {
                        if (attr.ngPasswordkey.trim() !== "") {
                            eval(attr.ngPasswordkey);
                        }
                        input.pattern = "^[@_A-Za-z0-9]+$";
                        input.focus();
                    }
                };
            }
        }
    })
    .directive("ngEmail", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                var emailCheck = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
                elem[0].onblur = function (event) {
                    var input = event.target.value;
                    if (!emailCheck.test(input.trim()) && this.value.trim() !== "") {
                        if (attr.ngEmail.trim() !== "") {
                            eval(attr.ngEmail);
                            this.focus();
                        } else {
                            event.target.value = "";
                        }
                        elem[0].type = "email";
                        setTimeout(function () {
                            elem[0].required = "required";
                        }, 300);
                    } else {
                        elem[0].removeAttribute('required');
                    }
                };
            }
        }
    })
    .directive("ngHref", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                elem[0].style.cursor = "pointer";
                elem[0].onclick = function () {
                    location.href = attr.ngHref;
                };
            }
        }
    })
    .directive("ngRefresh", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                var time = (attr.time) ? attr.time : 2;
                time = parseFloat(time) * 1000;
                time = parseInt(time);
                var event = (attr.event) ? attr.event : "load";
                if (event === "click") {
                    elem[0].style.cursor = "pointer";
                }
                if (event === "load") {
                    setTimeout(function () {
                        location.href = attr.ngRefresh;
                    }, time);
                } else {
                    elem[0].addEventListener(attr.event, function () {
                        setTimeout(function () {
                            location.href = attr.ngRefresh;
                        }, time);
                    });
                }
            }
        }
    })
    .directive("directiveEnter", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                elem[0].onkeypress = function (event) {
                    if (event.keyCode === 13) {
                        eval(attr.directiveEnter);
                    }
                };
            }
        }
    })
    .factory("request", ["$http", function ($http) {
        var request = {};
        request.get = function (url, fn) {
            var ajax = null;
            ajax = $http.get(url);
            ajax.success(fn);
            return ajax;
        };
        request.post = function (url, data, fn) {
            var ajax = null;
            ajax = $http({
                method: "POST",
                url: url,
                data:data,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
            ajax.success(fn);
            return ajax;
        };
        request.getData = function (url, data, fn) {
            var ajax = null;
            ajax = $http({
                method: "GET",
                url: url,
                params: data
            });
            ajax.success(fn);
            return ajax;
        };
        return request;
    }]);
