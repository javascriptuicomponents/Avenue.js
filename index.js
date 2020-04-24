//Buttons
var data = {
	type: 'button',
	value: 'delete rows',
	classes:  {
		1: 'button',
		2: 'button-blue',
		3: 'button-small',
		4: 'button-radius',
	},
	function: {
		onclick: 'striped.__deleteCheckedRows("tableid")',
	},
	attributes: {
		'data-name': 2
	}
};
var button = new Button(data);
button.__initButton('button');
data['value'] = 'test';
data['classes'][2] = 'button-red';
button.__initButton('button');
data['classes'][2] = 'button-gray';
data['classes'][3] = 'button-large';
button.__initButton('button');
data['value'] = 'test button';
data['classes'][2] = 'button-yellow';
data['classes'][3] = 'button-medium';
button.__initButton('button');
data['classes'][2] = 'button-green';
button.__initButton('button');

//DataTable
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
			limitPerPage: 6,
			pagination: true,
			paginationAlign: 'right',
			search: false,
			checkbox: true,
			dragable: true,
			rowsHeight: 10 // 7 tp 16 max
		}
	}
];
var striped = new DataTable(obj); //variable name will have the same name with type of table
striped.__initTable('striped', 'divid', 'tableid');//DataTable

//Forms
var input = {
	type: 'text',
	name: 'inputname',
	id: 'inputid',
	defaultvalue: 'val',
	placeholder: 'input',
	classes:  {
		1: 'input'
	},
	function: {
		onclick: '',
	},
	attributes: {
		'data-name': 2
	}
};

var newInput = new FormElement(input);
newInput.__initForm('inputid');

//radio
//checkbox
var radio = {
	type: 'radio',
	name: 'inputname',
	input:{
		1: {
			id: 'inputid',
			defaultvalue: 'val',
			function: {
				onclick: '__tes()',
			},
			attributes: {
				'data-name': 2
			}
		},
		2: {
			id: 'inputid',
			defaultvalue: 'val',
			function: {
				onclick: '',
			},
			attributes: {
				'data-name': 2
			}		
		}
	}
};
var newInput = new FormElement(radio);
newInput.__initForm('inputid');