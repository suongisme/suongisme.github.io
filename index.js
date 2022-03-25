const API = 'https://sg-springboot.herokuapp.com/users'

var app = angular.module('appManagement', [])

app.controller('employeeController', function ($scope, $http) {

    $scope.user = {
        id: '',
        username: '',
        password: '',
    }

    $scope.status = 'add'

    $scope.userArray = []

    $http.get(API)
        .then(resp => $scope.userArray = resp.data)
    

    $scope.add = function () {

        $http.post(API, JSON.stringify($scope.user))
        .then(resp => {
            $scope.userArray.push(resp.data)
            resetForm()
        })

        
    }

    $scope.delete = function (id) {

        if (!confirm('Are you sure?')) return

        if (isSelected(id)) return

        $http.delete(API+'/'+id).
            then(resp => {
                $scope.userArray = $scope.userArray.filter(x => x.id !== id)
            })

        
    }

    $scope.update = function () {

        $http.put(API+'/'+$scope.user.id, JSON.stringify($scope.user))
            .then(resp => {

                $scope.userArray = $scope.userArray.map(value => {
                    if (value.id === $scope.user.id) {
                        return $scope.user
                    }
                    return value
                })
                resetForm()
                $scope.status = 'add'
            })
    }

    $scope.fillForm = function (id) {
        $scope.userArray.forEach(x => {
            if (id === x.id) {
                for (i in $scope.user) {
                    $scope.user[i] = x[i]
                }
            }
        })

        $scope.status = 'update'
    }

    const resetForm = function () {
       $scope.user = {
            id: '',
            username: '',
            password: '',
       }
    }

    const isSelected = function(id) {
        if (id === $scope.user.id) {
            alert('this employee is being chosen!')
            return true
        }

        return false
    }
})
