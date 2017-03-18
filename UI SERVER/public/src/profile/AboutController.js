(function () {
    angular
        .module('about')
        .controller('AboutController', ['$rootScope', 'httpService', AboutController]);


    function AboutController($rootScope, httpService) {
        var ac = this
        ac.aboutUsDetails = [];
        ac.getAboutUs = function () {
            var request = {
                method: "get",
                url: GLOBALCONFIG.ServiceManager.getUrls('getAboutDetails')
            };
            httpService.makeRequest(request, function (data) {
                ac.aboutUsDetails = data[0];
            }, function (err) {
                alert(err);
            });
        }
        return ac;
    }
})();