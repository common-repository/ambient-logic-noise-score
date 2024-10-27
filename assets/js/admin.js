jQuery(document).ready(function($) {
  //
  // Toggle the value of the checkbox between true/false.
  //
  $('.ambient-logic-checkbox').on('click', function(e) {
    var $this = $(this);

    if ($this.is(':checked')) {
      $this.val('true');
    } else {
      $this.val('false');
    }
  });
});
