(function (stringFormatter) {

    stringFormatter.format = function (plainText) {
        var args = Array.prototype.slice.call(arguments, 1);
        return plainText.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };

})(module.exports);
