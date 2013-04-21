<?php
	class category {
		public $query 	= "";
		/*
		* Query
		*/
		public function cat_query() {
			global $db;
			global $table_cat;
			$query = "SELECT * FROM ".$table_cat;
			return $db->q($query, true);
		}
		/*
		* Show categires and its children
		*/
		public function show_cat () {
			global $db;
			global $table_sub_cat;
			$result = $this->cat_query();
			echo "<ul class='cat'>";
			foreach ($result as $key) {
				echo "<li class='cat-li'><a href='show.php?cat_id=".$key['id']."'>".$key['name'];
				$id = $key['id'];
				$childQuery = "SELECT * FROM ".$table_sub_cat." WHERE cat_id =".$id;
				$sub_categories = $db->q($childQuery, true);
				if (count($sub_categories) > 0){
					echo "<ul class='cat-sub_cat'>";
					foreach ($sub_categories as $key1) {
						echo "<li style='margin-left: 15px;'><a href='show.php?sub_cat_id=".$key1['id']."'>".$key1['name']."</a></li>";
					}
					echo "</ul>";
				}
				echo "</a></li>";
			}
			echo "</ul>";
		}
	}
?>