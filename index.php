<!DOCTYPE html>
<html>
<head>
	<title>TableUIJs</title>
	<link rel="stylesheet" type="text/css" href="TableUIJs/Striped/striped.css">
	<script src="TableUIJs/Striped/striped.js"></script>
	<script src="TableUIJs/table.js"></script>
</head>
<body>
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
		{ 
			fieldname: 'accountname', 
			fieldlabel: 'accountname', 
			sortable: true,
			editable: false
		},
		{ 
			fieldname: 'account_type', 
			fieldlabel: 'account_type', 
			sortable: false,
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
				limitPerPage: 10,
				pagination: true,
				search: false,
			}
		}
	];
	var striped = new TableStriped(obj);
	striped.__initTable('striped', 'divid', 'tableid');
</script>
</body>
</html>