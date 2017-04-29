(function () {
    angular
        .module('about')
        .controller('AboutController', ['$rootScope', 'httpService', '$mdDialog', '$scope', AboutController]);


    function AboutController($rootScope, httpService, $mdDialog, $scope) {
        var ac = this
        ac.aboutUsDetails = [];
        ac.dialog = {};
        ac.showAlert = function (type, index) {
            ac.dialog = {
                type: type,
                index: index
            }
            ac.profiletext = ac.aboutUsDetails[ac.dialog.index].text;
            $mdDialog.show({
                contentElement: '#' + type + '_Dialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };
        ac.addNewTab = function () {
            ac.aboutUsDetails.push({});
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
            ac.aboutUsDetails[ac.dialog.index].type = 'text';
            ac.aboutUsDetails[ac.dialog.index].text = text;
        }

        ac.upload = function () {
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
                ac.aboutUsDetails[ac.dialog.index].type = ac.dialog.type;
                alert(data.msg);
                ac.aboutUsDetails[ac.dialog.index].url = data.url;
                $scope[ac.dialog.type + 'files'] = [];
            }, function (err) {
                console.log(err);
            });
        };
        return ac;
    }
})();