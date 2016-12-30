(function () {

  angular
    .module('bitacora')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location','authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Create a new Bitacora account'
    };

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
     alert("nombre "+vm.credentials.name)
     //alert("imag"+vm.credentials.image)
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password ) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };

  }

})();