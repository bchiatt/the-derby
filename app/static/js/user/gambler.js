(function(){
  'use strict';

  $(document).ready(function(){
    $('.assetName a').click(sellAsset);
  });

  function sellAsset(e){
    var asset = $(this).text(),
        id    = $(this).closest('.gambler').attr('data-gambler-id');
    console.log(asset, id);
  }

})();

