
<script type="text/javascript">
  var mapOptions = {
    address: <?php echo (isset($address) && !empty($address) ? '"'. $address .'"' : "\"89 Saint Dunstan's Rd, Asheville NC\""); ?>,
    mapID: <?php echo (isset($map_id) && !empty($map_id) ? '"'. $map_id .'"' : '"ambientLogic-89178"'); ?>,
    h: <?php echo (isset($height) && !empty($height) ? $height : 400); ?>,
    w: <?php echo (isset($width) && !empty($width) ? $width: 400); ?>,
    textOn: <?php echo $text_on; ?>,
    showArrow: <?php echo $show_arrow; ?>,
    showScore: <?php echo $show_score; ?>,
    showScaleline: <?php echo $show_scale_line; ?>,
    bwMap: <?php echo $bw_map; ?>,
    zoom: <?php echo (isset($zoom) && !empty($zoom) ? $zoom : 14); ?> ,
    horizontal: <?php echo  $horizontal; ?>,
    key: "<?php echo $ambient_logic_api_key; ?>",
    alpha: "<?php echo $alpha; ?>"
  };

 AmbientLogic(mapOptions).build(function(error, data) {
    if (error) {
      console.log('front-end error:', error, 'data:', data);
    }
 });
</script>

<div id="<?php echo $map_id; ?>"></div>
