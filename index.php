<!DOCTYPE html>
<html>
<head>
	<title>Table grid</title>
	<link rel="stylesheet" type="text/css" href="TableUIJs/Striped/striped.css">
	<script src="TableUIJs/Striped/striped.js"></script>
</head>
<body>
<div id="table"></div>
<script>
	//json type
	const obj = [
		{ fieldname: 'accountid', fieldlabel: 'AccountID', sortable: true },
		{ fieldname: 'account_no', fieldlabel: 'account_no', sortable: true },
		{ fieldname: 'accountname', fieldlabel: 'accountname', sortable: true },
		{ fieldname: 'account_type', fieldlabel: 'account_type', sortable: false },
		{ api: {
				url: 'test.php',
				method: 'post',
				data: null
			}
		}
	];
	var striped = new TableStriped(obj);
	striped.__initTable('striped', 'table');
</script>
</body>
</html>