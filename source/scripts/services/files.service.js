(function()
{
  angular
    .module('mainApp')
    .factory('FilesService',service);

    function service($http, $sessionStorage)
    {
      return {
        reset: reset,
        push: push,
        pop: pop,
        getFiles: getFiles,
        getFolderName: getFolderName,
        getPath: getPath
      };

    function getFolderName()
    {
      return $sessionStorage.FilesService.paths[$sessionStorage.FilesService.paths.length-1];
    }

    function reset()
    {
      $sessionStorage.FilesService = {};
      $sessionStorage.FilesService.paths = ['resources','videos'];
    }

    function getPath()
    {
      let list = './';

      for (let e of $sessionStorage.FilesService.paths)
      {
        list += e+'/';
      }

      return list;

    }

    function push(element)
    {
      $sessionStorage.FilesService.paths.push(element)
    }

    function pop()
    {
      if ($sessionStorage.FilesService.paths.length > 2)
      {
        $sessionStorage.FilesService.paths.pop()
      }
    }

    function getFiles(cb)
    {
      let list = '';

      if($sessionStorage.FilesService.paths.length > 0)
      {
        for (let e of $sessionStorage.FilesService.paths)
        {
          list += e+'/';
        }
      }
      else
      {
        list = '/';
      }

      $http.get('./backend/commons/dir.php?dir='+list)
      .then(
        function(res)
        {
          cb(res.data)
        },
        function (err)
        {
          cb(false)
        }
      );
    }
  }
})();
