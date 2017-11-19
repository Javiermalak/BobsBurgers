(function()
{
  angular
    .module('mainApp')
    .controller('fileTree.controller',foo);

    function foo($scope,$sessionStorage,FilesService)
    {
      function init()
      {
        FilesService.reset();
        $scope.folderName = '';
        $scope.selected = {};
        $scope.selected.src = '#';
        getFilePath();
        getFolderName();
      }

      function getFilePath()
      {
        FilesService.getFiles(function(res)
        {
          if(res != false)
          {
            res.directories = res.directories.map( e => {
              if(!e.dir)
              {
                let data = e.name.split('{')[0];
                let episode = data.split('}')[0];
                let name = data.split('}')[1];
                e.episodeName = name;
                e.episode = parseInt(episode)
              }
              return e;
            });
            $scope.filePath = res;
          }
        });
      }

      function getFolderName()
      {
        $scope.folderName = FilesService.getFolderName();
      }

      $scope.back = function ()
      {
        FilesService.pop();
        getFilePath();
        getFolderName();
      }

      $scope.open = function(dir)
      {
        FilesService.push(dir.name);
        getFilePath();
        getFolderName();
      }

      $scope.put = function(dir)
      {
          $scope.selected = dir;
          $scope.selected.src = FilesService.getPath()+dir.name;
      }

      $scope.set = function(dir)
      {
        dir.hovered = true;
      }

      $scope.unset = function(dir)
      {
        console.log('000');
        dir.hovered = false;
      }

      init();
    }
})();
