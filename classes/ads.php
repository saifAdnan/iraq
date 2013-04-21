<?php
	class ads {
		public function ads_query() {
			global $db;
			global $table_ads;
			$query = "SELECT * FROM ".$table_ads;
			return $db->q($query, true);
		}
		/*
		* Show Ads
		*/
		public function ads_show() {
			global $db;
			global $table_ads_img;
			$result = $this->ads_query();
			echo "<div class='ads'>";
			foreach($result as $key) {
				$id = $key['id'];
				$date = $key['date'];
				$datetime = strtotime($date);

				echo "<div class='ads-name'>".$key['name']."</div>".
				 	"<div class='ads-description'>".$key['description']."</div>".
					"<div class='ads-price'>".$key['price']."</div>".
				 	"<div class='ads-date'>".
						"<div class='ads-date-ymd'>".date("Y/m/d", $datetime)."</div>".
						"<div class='ads-date-time'>".date("H:i:s", $datetime)."</div>".
					"</div>";

				$thumb = $db->q("SELECT thumb, url FROM ".$table_ads_img." WHERE ads_id=".$id) ;
				if (count($thumb) > 0) {
					echo "<div class='ads-img'>";
					foreach ($thumb as $key) {
						echo "<a href='".$key['url']."'>".
							"<img src='/".$key['thumb']."'>".
							"</a>";
					}
					echo "</div>";
				}
			}
			echo "</div>";
		}

	}
?>