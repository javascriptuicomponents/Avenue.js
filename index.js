//Top Nav Menu
var dataMenu = {
	type: 'topnav',
	isSPA: true, //true or false
	classes: {
		1: 'topnav',
		2: 'classhere'
	},
	parents: {
		1: {
			name: 'menu1',
			link: 'linkhere',
			icon: 'fa fa-search',
			child: false,
		},
		2: {
			name: 'menu2',
			link: 'linkhere2',
			icon:  false,
			child: false
		},
		3: {
			name: 'menu3',
			link: 'linkhere3',
			icon: false,
			child: {
				1: {
					name: 'menu1',
					link: 'linkhere1',
					child: false
				}
			}
		}
		
	}
};
var nav = new Menu(dataMenu);
nav.__initMenu('nav');
//Buttons
var data = {
	type: 'button',
	value: 'delete rows',
	classes:  {
		1: 'button',
		2: 'button-blue-outline',
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
data['classes'][2] = 'button-red-outline';
button.__initButton('button');
data['classes'][2] = 'button-gray';
data['classes'][3] = 'button-large';
button.__initButton('button');
data['value'] = 'test button';
data['classes'][2] = 'button-yellow-outline';
data['classes'][3] = 'button-medium';
button.__initButton('button');
data['classes'][2] = 'button-green';
button.__initButton('button');

//DataTable
var obj = [
	{ 
		fieldname: 'module', 
		fieldlabel: 'Module', 
		sortable: true,
		editable: true
	},
	{ 
		fieldname: 'from', 
		fieldlabel: 'From', 
		sortable: true,
		editable: false
	},
	{ 
		fieldname: 'to', 
		fieldlabel: 'To', 
		sortable: true,
		editable: false
	},
	{ 
		fieldname: 'date', 
		fieldlabel: 'Date', 
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
			pagination: false,
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
	type: 'date',
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