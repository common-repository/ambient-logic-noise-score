<h2>Ambient Logic API Key</h2>

<form action="#" method="post">

  <input
    type="text"
    name="api_key"
    id="api_key"
    placeholder="API Key"
    value="<?php echo $ambient_logic_api_key; ?>"
  />

  <br><br>
  <input class="button-secondary"
    type="submit"
    name="save_ambient_logic_api_key"
    value="Save API Key"
  />
  <?php wp_nonce_field( 'save-ambient-logic-noise-score-key' ); ?>
</form>

<br><br>

<hr/>
<br/>

<h2>Settings for Map</h2>

<p>These options are passed into the embedded JavaScript.  Placeholders contain default values.</p>

<form action="#" method="post">
  <!-- <label for="address">Address</label><br/>
  <input type="text" name="address" id="address"
    value="<?php //echo $ambient_logic_map_options->address; ?>" placeholder="89 Saint Dunstan's Rd, Asheville NC"/>
  <br/><br/> -->

  <label for="mapID">Map Element ID</label><br/>
  <input type="text" name="mapID" id="mapID"
    value="<?php echo $ambient_logic_map_options->mapID; ?>" placeholder="ambientLogic-89178"/>
  <br/><br/>

  <label for="height">Hieght</label><br/>
  <input type="number" name="height" id="height"
    value="<?php echo $ambient_logic_map_options->height; ?>" placeholder="500"/>
  <br/><br/>

  <label for="width">Width</label><br/>
  <input type="number" name="width" id="width"
    value="<?php echo $ambient_logic_map_options->width; ?>" placeholder="500"/>
  <br/><br/>

  <input type="checkbox" class="ambient-logic-checkbox" name="textOn" id="textOn"
    value="<?php echo $ambient_logic_map_options->textOn; ?>"
    <?php echo ($ambient_logic_map_options->textOn == 'true' ? 'checked="true"' : ''); ?> />
  <label for="textOn">Text On</label>
  <br/><br/>

  <input type="checkbox" class="ambient-logic-checkbox" name="showArrow" id="showArrow"
    value="<?php echo $ambient_logic_map_options->showArrow; ?>"
    <?php echo ($ambient_logic_map_options->showArrow == 'true' ? 'checked="true"' : ''); ?> />
  <label for="showArrow">Show Arrow</label>
  <br/><br/>

  <input type="checkbox" class="ambient-logic-checkbox" name="showScore" id="showScore"
    value="<?php echo $ambient_logic_map_options->showScore; ?>"
    <?php echo ($ambient_logic_map_options->showScore == 'true' ? 'checked="true"' : ''); ?> />
  <label for="showScore">Show Score</label>
  <br/><br/>

  <input type="checkbox" class="ambient-logic-checkbox" name="showScaleline" id="showScaleline"
    value="<?php echo $ambient_logic_map_options->showScaleline; ?>"
    <?php echo ($ambient_logic_map_options->showScaleline == 'true' ? 'checked="true"' : ''); ?> />
  <label for="showScaleline">Show Scale Line</label>
  <br/><br/>

  <input type="checkbox" class="ambient-logic-checkbox" name="bwMap" id="bwMap"
    value="<?php echo ($ambient_logic_map_options->bwMap == 'true' ? 'true' : 'false') ?>"
    <?php echo ($ambient_logic_map_options->bwMap == 'true' ? 'checked="true"' : ''); ?> />
  <label for="bwMap">Black &amp; White Map</label>
  <br/><br/>

  <input type="checkbox" class="ambient-logic-checkbox" name="horizontal" id="horizontal"
    value="<?php echo $ambient_logic_map_options->horizontal; ?>"
    <?php echo ($ambient_logic_map_options->horizontal == 'true' ? 'checked="true"' : ''); ?> />
  <label for="horizontal">Horizontal</label>
  <br/><br/>

  <label for="zoom">Zoom</label><br/>
  <input type="number" name="zoom" id="zoom"
    value="<?php echo $ambient_logic_map_options->zoom; ?>" placeholder="14"/>
  <br/><br/>

  <label for="zoom">Alpha</label><br/>
  <input type="float" name="alpha" id="alpha"
    value="<?php echo $ambient_logic_map_options->alpha; ?>" placeholder="0.5"/>
  <br/><br/>

  <br><br>
  <input class="button-secondary"
    type="submit"
    name="save_ambient_logic_map_settings"
    value="Save Map Settings"
  />

  <?php wp_nonce_field( 'save-ambient-logic-noise-score-settings' ); ?>
</form>

<br/>
