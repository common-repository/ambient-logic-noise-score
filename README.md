# Ambient Logic for WordPress

Plugin to customize where and how to embed a sound map from [Ambient Logic](http://www.ambient-logic.com/) into your WordPress site.

## Installation

Upload the [zip file](https://github.com/asommer70/ambient-logic-wordpress/releases) to your WordPress site in the Plugins Admin page and install the plugin.

Go to the [Ambient Logic Settings](/wp-admin/options-general.php?page=ambient-logic&tab=settings) page and enter your key.


## Settings

* **Map Element ID**: ID attribute of the div you'd like to embed the map into.
* **Text On**: This is a Boolean argument that determines if the legend text will be included to the left of the color bar. Default is “true”. E.g. “text = true”.
* **Show Arrow:** This is an argument that determines if you show an arrow on the right side of the legend identifying where your Ambient Noise Score lies.
* **Show Score:** This is an argument that determines if numerical Ambient Noise Score will be shown on the marker on the map.
* **Show Scale Line:** This is an argument that determines if you show the scale line on the map.
* **Black & White Map:** This is an argument that determines if a simplified black and white map is used in place of the Open Street Map as a background layer. This type of map is sometimes better in areas where the Open Street Map layer has too many elements on it and becomes confusing.
* **Horizontal**: This option places the score, arrow, and text Horizontally below the map. This is good for small screens.
* **Zoom**: This is a number that allows you to set the zoom level of the map. Valid values are 10 (zoomed out to the county level) to 16 (zoomed into the address level). E.g. "zoom = 12"
* **Alpha**: This is a number between 0 and 1 that sets how transparent the map will be. E.g. "apha = 0.5"

## Shortcode

Place the shortcode on a page where you'd like the Ambient Logic map to appear.

For example:

<pre>
[ambient_logic lat='36.2088' lon='-81.6628' bwmap="true" zoom="12"]
</pre>


## Action Hook

Ambient Logic maps can also be integrated into themes, plugins, etc using the **ambient_logic_map** action hook. In the *functions.php*, or plugin file, add:

Ambient Logic maps can also be integrated into themes, plugins, etc using the ambient_logic_map action hook. In the functions.php, plugin file, or template add:


<pre>
&lt;php?
  $options = [
   'address' => '1 Hacker Way Menlo Park, California 9402'
  ];

  do_action( 'ambient_logic_map', $options );
?&gt;
</pre>

For more information on do_action see the [WordPress Documentation](https://developer.wordpress.org/reference/functions/do_action/).
