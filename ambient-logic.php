<?php
/*
Plugin Name: Ambient Logic Noise Score
Plugin URI: http://www.ambient-logic.com/developers
Description: Customize where and how to embed a noise score map from Ambient Logic into your site.
Version: 0.0.4
Author: Adam Sommer
Author URI: https://thehoick.com/
License: MIT
*/


//
// Add settings link on plugin page.
//
function abmient_logic_settings_link($links) {
  $settings_link = '<a href="options-general.php?page=ambient-logic">Settings</a>';
  array_unshift($links, $settings_link);
  return $links;
}
$plugin = plugin_basename(__FILE__);
add_filter("plugin_action_links_$plugin", 'abmient_logic_settings_link' );


//
// Admin page with a form for entering the API key and documentation for using the shortcode.
//
function ambient_logic_menu() {
  add_options_page(
    'Ambient Logic Noise Score',
    'Ambient Logic Noise Score',
    'edit_pages',
    'ambient-logic',
    'ambient_logic_options_page'
  );
}
add_action('admin_menu', 'ambient_logic_menu');


function ambient_logic_options_page() {
  if (!current_user_can('edit_pages')) {
    wp_die('You do not have sufficient permission to access this page.');
  }

  $flash = '';
  $ambient_logic_api_key = get_option('ambient_logic_api_key');
  $ambient_logic_map_options = json_decode(get_option('ambient_logic_map_options'));

  // Handle saving the API key.
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['save_ambient_logic_api_key'])) {
      check_admin_referer('save-ambient-logic-noise-score-key');
      
      $new_key = filter_input(INPUT_POST, 'api_key', FILTER_SANITIZE_SPECIAL_CHARS);

      if (isset($ambient_logic_api_key)) {
        update_option( 'ambient_logic_api_key', $new_key );
      } else {
        add_option( 'ambient_logic_api_key', $new_key, '', 'no' );
      }

      $ambient_logic_api_key = $new_key;
      $flash = 'Ambient Logic API Key saved!';

    } else if (isset($_POST['save_ambient_logic_map_settings'])) {
      check_admin_referer('save-ambient-logic-noise-score-settings');

      $new_map_options = [
        'address' => filter_input(INPUT_POST, 'address', FILTER_SANITIZE_SPECIAL_CHARS),
        'mapID' => filter_input(INPUT_POST, 'mapID', FILTER_SANITIZE_SPECIAL_CHARS),
        'height' => filter_input(INPUT_POST, 'height', FILTER_SANITIZE_SPECIAL_CHARS),
        'width' => filter_input(INPUT_POST, 'width', FILTER_SANITIZE_SPECIAL_CHARS),
        'textOn' => filter_input(INPUT_POST, 'textOn', FILTER_SANITIZE_SPECIAL_CHARS),
        'showArrow' => filter_input(INPUT_POST, 'showArrow', FILTER_SANITIZE_SPECIAL_CHARS),
        'showScore' => filter_input(INPUT_POST, 'showScore', FILTER_SANITIZE_SPECIAL_CHARS),
        'showScaleline' => filter_input(INPUT_POST, 'showScaleline', FILTER_SANITIZE_SPECIAL_CHARS),
        'bwMap' => filter_input(INPUT_POST, 'bwMap', FILTER_SANITIZE_SPECIAL_CHARS),
        'horizontal' => filter_input(INPUT_POST, 'horizontal', FILTER_SANITIZE_SPECIAL_CHARS),
        'zoom' => filter_input(INPUT_POST, 'zoom', FILTER_SANITIZE_SPECIAL_CHARS),
        'alpha' => filter_input(INPUT_POST, 'alpha', FILTER_SANITIZE_SPECIAL_CHARS)
      ];

      if (isset($ambient_logic_map_options)) {
        update_option( 'ambient_logic_map_options', json_encode($new_map_options));
      } else {
        add_option( 'ambient_logic_map_options', json_encode($new_map_options), '', 'no' );
      }

      // Get the saved options to match the decoded JSON from a GET request.
      $ambient_logic_map_options = json_decode(get_option('ambient_logic_map_options'));
      $flash = 'Ambient Logic Map Settings saved!';
    }
  }

  require(__DIR__ .'/admin/index.php');
}


//
// Add admin CSS and JavaScripts.
//
function ambient_logic_admin_css_and_js() {
  wp_enqueue_style('admin_css', plugins_url('/assets/css/admin.css', __FILE__));

  wp_enqueue_script('admin_js', plugins_url('/assets/js/admin.js', __FILE__), ['jquery'], '', true);
}
add_action('admin_head', 'ambient_logic_admin_css_and_js');


//
// Handle shortcode for embedding the HTML on a page.
//
function ambient_logic_shortcode($atts, $content = null) {
  extract(shortcode_atts([
    'lat' => '',
    'lon' => '',
    'address' => ''
  ],  $atts));

  $ambient_logic_api_key = get_option('ambient_logic_api_key');
  $ambient_logic_map_options = json_decode(get_option('ambient_logic_map_options'));

  $map_id = (isset($ambient_logic_map_options->mapID) && !empty($ambient_logic_map_options->mapID) ? $ambient_logic_map_options->mapID : 'ambientLogic-89178');
  $height = (isset($ambient_logic_map_options->height) && !empty($ambient_logic_map_options->height) ? $ambient_logic_map_options->height : 400);
  $width =  (isset($ambient_logic_map_options->width) && !empty($ambient_logic_map_options->width) ? $ambient_logic_map_options->width: 400);
  $text_on = (isset($ambient_logic_map_options->textOn) ? 'true' : 'false');
  $show_arrow = (isset($ambient_logic_map_options->showArrow) ? 'true' : 'false');
  $show_score = (isset($ambient_logic_map_options->showScore) ? 'true' : 'false');
  $show_scale_line = (isset($ambient_logic_map_options->showScaleline) ? 'true' : 'false');
  $bw_map = (isset($ambient_logic_map_options->bwMap) ? 'true' : 'false');
  $zoom = (isset($ambient_logic_map_options->zoom) && !empty($ambient_logic_map_options->zoom) ? $ambient_logic_map_options->zoom : 14);
  $horizontal = (isset($ambient_logic_map_options->horizontal) && !empty($ambient_logic_map_options->horizontal) ? $ambient_logic_map_options->horizontal : 'false');
  $alpha = (isset($ambient_logic_map_options->alpha) && !empty($ambient_logic_map_options->alpha) ? $ambient_logic_map_options->alpha : 0.5);

  ob_start();
  require(__DIR__ .'/template.php');
  $content = ob_get_clean();

  return $content;
}
add_shortcode('ambient_logic', 'ambient_logic_shortcode');


//
// Allow do_action for embedding a map into a template.
//
function ambient_logic_add_map($options) {
  // Get address from $options array.
  $address = (isset($options['address']) ? $options['address'] : null);

  // Get key and additional options from wp_options table.
  $ambient_logic_api_key = get_option('ambient_logic_api_key');
  $ambient_logic_map_options = json_decode(get_option('ambient_logic_map_options'));

  // Set options for the template.
  $map_id = (isset($ambient_logic_map_options->mapID) && !empty($ambient_logic_map_options->mapID) ? $ambient_logic_map_options->mapID : 'ambientLogic-89178');
  $height = (isset($ambient_logic_map_options->height) && !empty($ambient_logic_map_options->height) ? $ambient_logic_map_options->height : 400);
  $width =  (isset($ambient_logic_map_options->width) && !empty($ambient_logic_map_options->width) ? $ambient_logic_map_options->width: 400);
  $text_on = (isset($ambient_logic_map_options->textOn) ? 'true' : 'false');
  $show_arrow = (isset($ambient_logic_map_options->showArrow) ? 'true' : 'false');
  $show_score = (isset($ambient_logic_map_options->showScore) ? 'true' : 'false');
  $show_scale_line = (isset($ambient_logic_map_options->showScaleline) ? 'true' : 'false');
  $bw_map = (isset($ambient_logic_map_options->bwMap) ? 'true' : 'false');
  $zoom = (isset($ambient_logic_map_options->zoom) && !empty($ambient_logic_map_options->zoom) ? $ambient_logic_map_options->zoom : 14);
  $horizontal = (isset($ambient_logic_map_options->horizontal) && !empty($ambient_logic_map_options->horizontal) ? $ambient_logic_map_options->horizontal : 'false');
  $alpha = (isset($ambient_logic_map_options->alpha) && !empty($ambient_logic_map_options->alpha) ? $ambient_logic_map_options->alpha : 0.5);

  // Include the template.
  include(__DIR__ .'/template.php');
}
add_action( 'ambient_logic_map', 'ambient_logic_add_map', 10, 1 );

//
// Include the JavaScript for Ambient Logic.
//
function ambient_logic_enqueus_js() {
  wp_enqueue_script(
    'ambient_logic_map',
    plugins_url('/assets/js/Ambient-Logic-Map.js', __FILE__),
		array(),
    '0.0.1',
    false
	);
}
add_action('wp_enqueue_scripts', 'ambient_logic_enqueus_js');




