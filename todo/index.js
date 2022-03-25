const api = 'https://sg-todo-list.herokuapp.com/items'
const textInput = document.querySelector('.text-input')

angular.module('my-todo-list', [])
.controller('todo-controller', function($scope, $http) {
    $scope.item = {
        id: '',
        name: '',
        complete: false
    }

    $scope.items = []

    $http.get(api)
        .then(resp => $scope.items = resp.data)
        .catch(console.log);

    
    $scope.addItem = function() {
        $http.post(api, JSON.stringify($scope.item))
            .then(resp => {
                $scope.items.push(resp.data)
                reset()
            })
            .catch(console.log)
    }

    $scope.deleteItem = function(id) {
        $http.delete(api+"/"+id)
            .then(console.log)
            .catch(console.log)
            $scope.items = $scope.items.filter(value => {
                return value.id != id
            })
    }

    const reset = function() {
        $scope.item.name = ''
    }

    $scope.change = function(item) {
        $http.put(api+"/"+item.id, JSON.stringify(item))
            .then(console.log)
            .catch(console.log)
        
    }

        
}) 