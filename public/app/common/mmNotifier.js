angular.module('app').value('mmToastr', toastr);

angular.module('app').factory('mmNotifier', function (mmToastr) {
    return {
        notify: function (msg) {
            mmToastr.success(msg);
            console.log(msg);
        }
    }
});

