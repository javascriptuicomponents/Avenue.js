<!DOCTYPE html>
<html>
<head>
	<title>TableUIJs</title>
	<link rel="stylesheet" type="text/css" href="TableUIJs/dataTable.css">
	<script src="TableUIJs/dataTable.js"></script>
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
	striped.__initTable('bordered', 'divid', 'tableid');
</script>
</body>
</html>