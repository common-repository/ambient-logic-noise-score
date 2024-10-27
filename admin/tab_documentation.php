<h2>Documentation</h2>

<h3>Settings</h3>

<p>
  <strong>Map Element ID: </strong> ID attribute of the <em>div</em> you'd like to embed the map into.
</p>

<p>
  <strong>Text On:</strong> This is a Boolean argument that determines if the legend text will be
  included to the left of the color bar. Default is “true”. E.g. “text = true”.
</p>

<p>
  <strong>Show Arrow:</strong> This is an argument that determines if you show an arrow on
  the right side of the legend identifying where your Ambient Noise Score lies.
</p>

<p>
  <strong>Show Score:</strong> This is an argument that determines if numerical Ambient Noise
  Score will be shown on the marker on the map.
</p>

<p>
  <strong>Show Scale Line:</strong> This is an argument that determines if you show the scale line on the map.
</p>

<p>
  <strong>Black &amp; White Map:</strong> This is an argument that determines if a simplified black and white map
  is used in place of the Open Street Map as a background layer. This type of map is sometimes better
  in areas where the Open Street Map layer has too many elements on it and becomes confusing.
</p>

<p>
  <strong>Horizontal:</strong> This option places the score, arrow, and text Horizontally below the map.
  This is good for small screens.
</p>

<p>
  <strong>Zoom:</strong> This is a number that allows you to set the zoom level of the map.
  Valid values are 10 (zoomed out to the county level) to 16 (zoomed into the address level).
  E.g. "zoom = 12"
</p>

<p>
  <strong>Alpha:</strong> This is a number between 0 and 1 that sets how transparent the map will be. E.g. "apha = 0.5"
</p>

<br />
<hr/>
<br />

<h3>Shortcode</h3>

<pre style="tab-size: 2;">
  [ambient_logic address=[YOUR_ADDRESS]]
</pre>

<p>For example:</p>

<pre style="tab-size: 2;">[ambient_logic address="1 Hacker Way Menlo Park, California 94025"]</pre>


<br/>
<hr/>
<br/>

<h3>Action Hook</h3>

<p>
  Ambient Logic maps can also be integrated into themes, plugins, etc
  using the <strong>ambient_logic_map</strong> action hook.  In the <em>functions.php</em>, plugin
  file, or template add:
</p>

<pre style="tab-size: 2;">
&lt;?php
  $options = [
   'address' => '1 Hacker Way Menlo Park, California 9402'
  ];

  do_action( 'ambient_logic_map', $options );
?&gt;
</pre>

<p>
  For more information on <strong>do_action</strong> see the
  <a href="https://developer.wordpress.org/reference/functions/do_action/">WordPress Documentation</a>.
</p>
