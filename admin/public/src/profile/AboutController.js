(function () {
    angular
        .module('about')
        .controller('AboutController', ['$rootScope', 'httpService', '$mdDialog', '$scope', '$location', AboutController]);


    function AboutController($rootScope, httpService, $mdDialog, $scope, $location) {
        var ac = this
        ac.aboutUsDetails = [];
        ac.dialog = {};
        ac.showAlert = function (type, detail) {
            ac.dialog = {
                type: type,
                detail: detail
            }
            ac.profiletext = detail.text;
            $mdDialog.show({
                contentElement: '#' + type + '_Dialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };
        ac.addNewTab = function () {
            ac.aboutUsDetails.push({
                IsActive: true
            });
        };
        ac.removeTab = function (detail) {
            detail.IsActive = false;
        };
        ac.cancel = function () {
            window.location.reload();
        };
        ac.save = function () {
            console.log(ac.aboutUsDetails);
            var request = {
                method: "post",
                url: GLOBALCONFIG.ServiceManager.getUrls('getAboutDetails'),
                data: ac.aboutUsDetails,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            httpService.makeRequest(request, function (data) {
                alert(data);
                $location.path("/");
            }, function (err) {
                alert(err);
            });
        };
        ac.getAboutUs = function () {
            var request = {
                method: "get",
                url: GLOBALCONFIG.ServiceManager.getUrls('getAboutDetails')
            };
            httpService.makeRequest(request, function (data) {
                ac.aboutUsDetails = data;
            }, function (err) {
                alert(err);
            });
        }
        ac.saveText = function (text) {
            ac.dialog.detail.type = 'text';
            ac.dialog.detail.text = text;
            $mdDialog.hide();
        }

        ac.upload = function () {
            $rootScope.$emit("isLoading", true);
            $mdDialog.hide();
            var formData = new FormData();
            angular.forEach($scope[ac.dialog.type + 'files'], function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });

            var request = {
                method: "post",
                url: GLOBALCONFIG.ServiceManager.getUrls('uploadProfile'),
                data: formData,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };
            httpService.makeRequest(request, function (data) {
                ac.dialog.detail.type = ac.dialog.type;
                alert(data.msg);
                ac.dialog.detail.url = data.url;
                $scope[ac.dialog.type + 'files'] = [];
                $rootScope.$emit("isLoading");
            }, function (err) {
                console.log(err);
                $rootScope.$emit("isLoading");
            });
        };
        return ac;
    }
})();