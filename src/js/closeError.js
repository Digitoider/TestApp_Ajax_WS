export default class CloseError{
  constructor(){

  }
  update(){
    $('[name=closeErrorBtn]').click(function(){
      var duration = 500;
      $(this).parent().slideUp('fast', function(){
        $(this).remove();
      });
    });

    $('[name=closeErrorBtn]').on('mouseenter',
      function(){
        $(this).css({
          'cursor': 'pointer',
        });
      }
    ).on('mouseleave',
      function(){
        $(this).css({
          'border': 'none',
          'cursor': 'default',
        });
      }
    );
  }
}
