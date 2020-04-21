<!DOCTYPE html>
<html>
<head>
	<title>DataTable UI Javascript</title>
	<link rel="stylesheet" type="text/css" href="Components/DataTable/dataTable.css">
	<script src="Components/DataTable/dataTable.js"></script>
</head>
<body>
<a class="button button-gray" onclick="striped.__deleteCheckedRows('tableid')">deleterow</a>
<div id="divid"></div>
<script>
	//json type
	var obj = [
		{ 
			fieldname: 'accountid', 
			fieldlabel: 'AccountID', 
			sortable: true,
			editable: true
		},
		{ 
			fieldname: 'account_no', 
			fieldlabel: 'account_no', 
			sortable: true,
			editable: false
		},
		{ api: {
				url: 'test.php',
				method: 'post',
				data: null
			}
		},
		{ custom: {
				orderBy: 'desc',
				limitPerPage: 4,
				pagination: true,
				paginationAlign: 'right',
				search: false,
				checkbox: true,
				dragable: true,
				rowsHeight: 7 // 7 tp 16 max
			}
		}
	];
	var striped = new DataTable(obj);
	striped.__initTable('striped', 'divid', 'tableid');
</script>
</body>
</html>