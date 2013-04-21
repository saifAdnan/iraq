<?php
	$db_host = "localhost";
	$db_user = "root";
	$db_pass = "0000";
	$db_name = "iraq";
	$saif = "saif";

	/* tables */
	$table_cat = "categories";
	$table_sub_cat = "sub_categories";
	$table_ads = "ads";
	$table_ads_img = "ads_img";

	require_once("classes/mysql.php");
	require_once("classes/categories.php");
	require_once("classes/ads.php");
	$db = new edb($db_host, $db_user, $db_pass, $db_name);
?>