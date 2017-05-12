(function () {
    angular
        .module('about')
        .controller('AboutController', ['$rootScope', 'httpService', '$sce', AboutController]);


    function AboutController($rootScope, httpService, $sce) {
        var ac = this
        ac.aboutUsDetails = [];
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
        ac.getSafeHtml = function (text) {
            return $sce.trustAsHtml(text)
        }
        return ac;
    }
})();