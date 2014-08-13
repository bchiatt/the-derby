(function(){
  'use strict';

  $(document).ready(function(){
    $('.assetName a').click(sellAsset);
  });

  function sellAsset(e){
    var asset = $(this).text(),
        id    = $(this).closest('.gambler').attr('data-gambler-id'),
        type  = 'delete',
        url   = '/gamblers/' + id + '/assets/' + asset;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      console.log(data);
    }});
  }

})();

