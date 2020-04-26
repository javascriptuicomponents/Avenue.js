import { initMenu, initButton, initForm, initTable } from './Components/config.js';
// import { Menu } from './Components/Menu/menu.js';
// import { FormElement } from './Components/Forms/forms.js';
// import { Button } from './Components/Buttons/buttons.js';
// import { DataTable } from './Components/DataTable/dataTable.js';

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

initMenu('menu', dataMenu, 'nav');
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
		onclick: 'deleteCheckedRows("tableid")',
	},
	attributes: {
		'data-name': 2
	}
};
initButton('newButton', data,'button');
data['value'] = 'test';
data['classes'][2] = 'button-red';
initButton('newButton', data,'button');
data['classes'][2] = 'button-red-outline';
initButton('newButton', data,'button');
data['classes'][2] = 'button-gray';
data['classes'][3] = 'button-large';
initButton('newButton', data,'button');
data['value'] = 'test button';
data['classes'][2] = 'button-yellow-outline';
data['classes'][3] = 'button-medium';
initButton('newButton', data,'button');
data['classes'][2] = 'button-green';
initButton('newButton', data,'button');

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
			pagination: true,
			paginationAlign: 'right',
			search: false,
			checkbox: true,
			dragable: true,
			rowsHeight: 10 // 7 tp 16 max
		}
	}
];

initTable('striped', obj, 'divid', 'tableid');
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

initForm('newInput', input, 'inputid');

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
initForm('newInput', radio, 'inputid');