<div class="wrap">

	<h1>Ambient Logic Noise Score</h1>

  <div class="flash">
    <?php echo $flash; ?>
  </div>

	<div id="poststuff">

		<h2 class="nav-tab-wrapper">
			<a href="/wp-admin/options-general.php?page=ambient-logic&tab=settings"
				class="nav-tab <?php echo (!isset($_GET['tab']) || $_GET['tab'] == 'settings' ? 'nav-tab-active' : ''); ?>">
				Settings
			</a>
			<a href="/wp-admin/options-general.php?page=ambient-logic&tab=documentation"
				class="nav-tab <?php echo ($_GET['tab'] == 'documentation' ? 'nav-tab-active' : ''); ?>">
				Documentation
			</a>
		</h2>

		<div id="post-body" class="metabox-holder">

			<!-- main content -->
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable">
					<div class="postbox">

						<div class="inside">

							<?php
                if (!isset($_GET['tab']) || $_GET['tab'] == 'settings') {
                  include(__DIR__ .'/tab_settings.php');
                } else {
                  include(__DIR__ .'/tab_documentation.php');
                }
              ?>
              
					</div>
				</div>
			</div>

		<br class="clear">
	</div>
</div>
