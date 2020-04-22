### Avenue.js
Avenue.js is a powerful components design for building mobile and desktop applications.
### Installation
Using npm
```sh
$ npm i componentsuijs
```
In index.html

var data = [
{ 
	fieldname: 'accountid', 
	fieldlabel: 'AccountID', 
	sortable: true,
	editable: true
},
	{ 
	fieldname: 'accountno', 
	fieldlabel: 'accountno', 
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
var striped = new DataTable(data);
striped.__initTable(
       'striped', 
       'divid', 
       'tableid'
);

### License 
This software is licensed under the <a href="https://github.com/avvictech/TableUIjs/blob/master/LICENSE">GNU</a>
