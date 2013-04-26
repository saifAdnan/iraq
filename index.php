<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<html xmlns="http://www.w3.org/1999/html">
	<head>
		<title>Title</title>
		<meta charset="UTF-8">

		<!-- CSS -->
		<link rel="stylesheet" href="css/style.css" type="text/css">
		<link rel="stylesheet" href="css/pShow.css" type="text/css">
		<link rel="stylesheet" href="css/search.css" type="text/css">
		<link rel="stylesheet" href="css/font-awesome.css" type="text/css">
		<!--[if IE 7]>
		<link rel="stylesheet" href="css/font-awesome-ie7.min.css">
		<![endif]-->
		<!--[if lt IE 9]>
		<link rel="stylesheet" type="text/css" href="css/ie.css" />
		<![endif]-->
 		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
 		<script type="text/javascript" src="js/jquery.tinyscrollbar.min.js"></script>
 		<script type="text/javascript" src="js/main.js"></script>
 		<script type="text/javascript" src="js/preload.js"></script>
 		<script type="text/javascript" src="js/popup.js"></script>
	</head>	
	<body>
		<div class="wrapper">
			<div class="container">
				<div class="header">
					<div class="logo_wrapper"></div>
					<div class="navigation">
						<div class="search">
							<form action="search.php">
								<button class="search-icon" tabindex="2">
									<i class="icon-search"></i>
								</button>
								<input type="text" name="searchValue" id="searchValue" class="search-input" placeholder="Enter to search" tabindex="1">
							</form>
						</div>
					</div>
				</div>
				<div class="content">
					<div class="menu">
						<?php 
							require_once("config.php");
							$categories = new category();
							$categories->show_cat();
						?>
					</div>
					<div class="ads">
						<?php
							$ads = new ads();
							$ads->ads_show();
						?>
					</div>
				</div>
				<div class="footer">

				</div>
			</div>
		</div>
		<!-- pShow -->
		<div class="pShow-loader">
			<div class="pSHow">
				<!-- fade -->
				<div class="pShow-fade"></div>
				<!-- /fade -->
				<div class="pShow-wrapper">
					<!-- close -->
					<div class="pShow-close"></div>
					<!-- /close -->

					<!-- image -->
					<div class="pShow-img_container">
						<!-- pagination -->
						<div class="pShow-pagination">
							<div class="pShow-pagination-next"></div>
							<div class="pShow-pagination-prev"></div>
						</div>
						<!-- /pagination -->
						<img src="" alt="" class="pShow-img">
						<h1 class='pShow-h1'></h1>

					</div>
					<!-- /image -->

					<div id="pShow-thumbs_container">
				        <div class="scrollbar" style="height: 200px;"><div class="track" style="height: 200px;"><div class="thumb" style="top: 0px; height: 39.3701px;"><div class="end"></div></div></div></div>
						<div class="viewport">
							<div class="overview">
								<ul class="pShow-thumbs">
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /pShow -->
	</body>
</html>