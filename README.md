### <img src="https://avatars1.githubusercontent.com/u/63910722?s=460&u=d96e8f0f5cbe93dd6384260f0c2f7b8f14fb7220&v=4" width='60px' />
### Avenue.js
Avenue.js is a powerful components design for building mobile and desktop applications. Check it out.
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
