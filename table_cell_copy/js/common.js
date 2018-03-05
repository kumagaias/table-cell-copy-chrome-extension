$(function(){
  setup();

  $('th, td').click(function(event){
    if (event.ctrlKey || (event.metaKey && event.which === 1)) {
      event.stopPropagation();
      switchCellSelect($(this));
    }
  });

  $('body').click(function(){
    if (!event.ctrlKey){
      removeAllSelect();
    }
  });

  $('body').keydown(function(event){
    if (event.which === 27) {
      removeAllSelect();
    }
    if (((event.ctrlKey && event.which === 67) || (event.metaKey && event.which === 67))
        && $('.on_mouse').length) {
      execCopyByElement(getClipBoardTempElement());
    }
  });

  function setup() {
    $('body').append('<div id="clipboard_temp" style="position: absolute; top: -9999px;"></div>');
  }

  function switchCellSelect(target) {
    if (target.hasClass('on_mouse')) {
      target.removeClass('on_mouse');
    } else {
      $('.on_mouse').closest('table').attr('id', 'on_mouse_table');
      target.addClass('on_mouse');
    }
  }

  function removeAllSelect() {
    $('.on_mouse').removeClass('on_mouse');
    $('.on_mouse_tr').removeClass('on_mouse_tr');
    $('#on_mouse_table').removeAttr('id', 'on_mouse_table')
  }

  function getClipBoardTempElement() {
      var clipText = getActiveCellText();
      $('#clipboard_temp').text('');
      $('#clipboard_temp').append(clipText);
      return $('#clipboard_temp').get(0);
  }

  function getActiveCellText() {
    $('.on_mouse').closest('tr').addClass('on_mouse_tr');
    var text = $('.on_mouse_tr').map(function() {
      return $(this).find('.on_mouse').map(function() {
        return $(this).text();
      }).get().join("&#009;"); // tab
    }).get().join("<br>");
    return text;
  }

  function execCopyByElement(element) {
    var range = document.createRange();
    range.selectNode(element);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    result = document.execCommand('copy');
    console.log('VV');
  }
});
