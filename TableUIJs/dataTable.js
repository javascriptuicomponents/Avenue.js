/*!
 * Data Table UI Js
 * @version 1.0.2 | Sun Apr 19 2020
 * @author Avvictech Group
 * @license GNU
 */
class DataTable {

	constructor(data) {
		this.type = '';
		this.view = '';
		this.header = '';
		this.tableid = '';
		this.shadow; //dragable
		this.dataTable = data;
		this.tableInstance = 'table';
		this.classInstance = 'class';

		this.Config = this.__config();
	}

	__config = () => {
		const data = {
			'orderBy': 'orderBy',
			'limitPerPage': 'limitPerPage',
			'pagination': 'pagination',
			'search': 'search',
			'checkbox': 'checkbox',
			'dragable': 'dragable',
			'tableStriped': 'table-striped',
			'tableBordered': 'table-bordered',
			'tableHeader': 'table-header',
			'idAttr': 'id',
			'onclick': 'onclick',
			'draggable': 'draggable',
			'checkbox': 'checkbox',
			'input': 'input',
			'type': 'type',
			'name': 'name',
			'paginationAlign': 'paginationAlign',
			'border': 'border',
		};
		return data;
	};

	__parseObject = () => {
		var Table = [];
		for (var i = 0; i < this.dataTable.length; i++) {
			if (this.dataTable[i].custom) {
				var custom = this.dataTable[i].custom;
				Table[this.Config.orderBy] = custom.orderBy;
				Table[this.Config.limitPerPage] = custom.limitPerPage;
				Table[this.Config.pagination] = custom.pagination;
				Table[this.Config.search] = custom.search;
				Table[this.Config.checkbox] = custom.checkbox;
				Table[this.Config.dragable] = custom.dragable;
				Table[this.Config.paginationAlign] = custom.paginationAlign;
				Table[this.Config.rowsHeight] = custom.rowsHeight;
			}
		}
		return Table;
	};

	/*
	 * method __initTable()
	 * @params
	 * start table creation
	 */
	__initTable = (type, id, tableid) => {
		this.type = type.toLowerCase();
		this.view = id;
		this.tableid = tableid;
		this.__createTable(this.type);
	};

	__createTable = () => {
		this.header = this.__tableHeader();
		this.__getTableBody(); //get all data
		document.getElementById(this.view).appendChild(this.header);
	};

	/*
	 * method __tableHeader()
	 * @params
	 * create header ot table
	 */
	__tableHeader = () => {
		var Table = this.__parseObject();
		var table = document.createElement(this.tableInstance);
		if (this.type == 'striped') {	
			table.setAttribute(
				this.classInstance, 
				this.Config.tableStriped+' '+this.Config.tableHeader
			);
		}
		if (this.type == 'bordered') {
			table.setAttribute(
				this.classInstance, 
				this.Config.tableBordered+' '+this.Config.tableHeader
			);
			table.setAttribute(
				this.Config.border,
				'1px'
			);
		}
		table.setAttribute(
			this.Config.idAttr, 
			this.tableid
		);
		var row = table.insertRow(0);
		var rowsHeight = 'rowsHeight16';
		if (this.Config.rowsHeight) {
			rowsHeight = 'rowsHeight'+this.Config.rowsHeight;
		}
		row.setAttribute('class', rowsHeight);
		if (Table.checkbox == true) {
			var checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('id', 'all-checked-for-' + this.tableid);
			checkbox.setAttribute(
				this.Config.onclick,
				'striped.__checkAllRows(' + this.tableid + ')'
			);
			var checkboxCell = row.insertCell(0);
			checkboxCell.appendChild(checkbox);
		}
		for (var i = 0; i < this.dataTable.length; i++) {
			if (this.dataTable[i].fieldlabel) {
				var value = row.insertCell(i);
				value.setAttribute('id', this.tableid + '_' + i);
				if (this.dataTable[i].sortable) {
					value.innerHTML =
						'<span class="table-header-cursour">' +
						this.dataTable[i].fieldlabel +
						'</span>';
					value.setAttribute(
						this.Config.onclick,
						'striped.__sortTable(' + i + ', this.id)'
					);
				} else {
					value.innerHTML = this.dataTable[i].fieldlabel;
				}
			}
		}
		return table;
	};

	/*
	 * method __getTableBody()
	 * @params
	 * get all data to create rows for table
	 */
	__getTableBody = () => {
		for (var i = 0; i < this.dataTable.length; i++) {
			if (this.dataTable[i].api) {
				var api = this.dataTable[i].api;
			}
		}
		this.__dataRequest(api, 'body');
	};

	__tableBody = (response) => {
		var Table = this.__parseObject();
		var rows = {};
		for (var i = 0; i < response.length; i++) {
			var value = {};
			for (var j = 0; j < this.dataTable.length; j++) {
				if (this.dataTable[j].fieldname) {
					value[j] = [this.dataTable[j].fieldname, response[i][j]];
				}
			}
			rows[i] = value;
		}
		var header = this.header;
		var tableid = this.tableid;
		var singleRow = [];
		var singleCell = [];
		Object.keys(rows).forEach(function (item) {
			singleRow[item] = header.insertRow(-1);
			singleRow[item].setAttribute('id', item);
			if (Table.dragable) {
				singleRow[item].setAttribute('draggable', true);
				singleRow[item].setAttribute(
					'ondragstart',
					'striped.__dragRows(event)'
				);
				singleRow[item].setAttribute(
					'ondragover',
					'striped.__dragRowsOver(event)'
				);
			}
			if (Table.checkbox == true) {
				var checkbox = document.createElement('input');
				checkbox.setAttribute('type', 'checkbox');
				checkbox.setAttribute('id', 'checked-for-' + tableid + '-' + item);
				checkbox.setAttribute('name', 'check-' + tableid);
				singleCell[0] = singleRow[item].insertCell(0);
				singleCell[0].appendChild(checkbox);
			}
			Object.keys(rows[item]).forEach(function (index) {
				var obj = rows[item][index];
				var fieldname = obj[0];
				var fieldvalue = obj[1];
				singleCell[index] = singleRow[item].insertCell(index);
				singleCell[index].setAttribute('data-td-name', fieldname);
				singleCell[index].innerHTML = fieldvalue;
			});
		});
		//create Pagination element
		this.__paginationElement();
	};

	__dataRequest = (api, type = false) => {
		var Table = this.__parseObject();
		const url = api.url;
		const method = api.method;
		const data = api.data;

		(async () => {
			const response = await fetch(url, {
				method: method,
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			let json = await response.json();
			if (type == 'body') {
				var dataPagination = this.__pagination(
					json, 
					Table.limitPerPage,
					1
				);
				//call table body method
				this.__tableBody(dataPagination);
			}
		})();
	};

	__checkAllRows = (table) => {
		var allCheckboxes = document.getElementsByName('check-' + table.id);
		for (var i = 0; i < allCheckboxes.length; i++) {
			if (allCheckboxes[i].checked == true) {
				allCheckboxes[i].checked = false;
			} else {
				allCheckboxes[i].checked = true;
			}
		}
	};

	/*
	 * method __getCheckedRows('tabledid')
	 * @params tableid
	 */
	__getCheckedRows = (tableid) => {
		var checkboxes = document.getElementsByName('check-' + tableid);
		var checkboxesChecked = [];
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				checkboxesChecked.push(checkboxes[i].id);
			}
		}
		return checkboxesChecked;
	};

	/*
	 * method __deleteCheckedRows('tabledid')
	 * @params tableid
	 */
	__deleteCheckedRows = (tableid) => {
		const checkedRows = this.__getCheckedRows(tableid);
		for (var i = 0; i < checkedRows.length; i++) {
			var rowID = checkedRows[i].split('-');
			var row = document.getElementById(rowID[3]);
			row.parentNode.removeChild(row);
		}
		//api here
	};
	//method
	__apendRows = () => {};

	/*
	 * method __deleteCheckedRows('tabledid')
	 * @params [n] index of row
	 * @params [tableid] id of the table
	 */
	__sortTable = (n, tableid) => {
		var tid = tableid.split('_');
		var table,
			rows,
			switching,
			i,
			x,
			y,
			shouldSwitch,
			dir,
			switchcount = 0;
		table = document.getElementById(tid[0]);
		switching = true;
		dir = 'asc';
		while (switching) {
			switching = false;
			rows = table.rows;
			for (i = 1; i < rows.length - 1; i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName('td')[n];
				y = rows[i + 1].getElementsByTagName('td')[n];
				if (dir == 'asc') {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir == 'desc') {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount == 0 && dir == 'asc') {
					dir = 'desc';
					switching = true;
				}
			}
		}
	};

	__dragRows = (event) => {
		this.shadow = event.target;
	};

	__dragRowsOver = (e) => {
		let children = Array.from(e.target.parentNode.parentNode.children);
		if (children.indexOf(e.target.parentNode) > children.indexOf(this.shadow)) {
			e.target.parentNode.after(this.shadow);
		} else {
			e.target.parentNode.before(this.shadow);
		}
	};

	__pagination = (data, pageSize, pageNumber) => {
 	 	return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
	};

	__paginationElement = () => {
		var Table = this.__parseObject();
		var div = document.createElement('div');
		div.setAttribute('id', 'pagination-'+this.tableid);
		div.setAttribute('class', 'pagination');
		//create href
		if (Table.paginationAlign) {
			div.setAttribute('class', 'pagination '+Table.paginationAlign);
		}
		document.body.appendChild(div);
		var link = [];
		for (var i = 0; i < 6; i++) {
			if (i == 0) {
				link[i] = document.createElement('a');
				link[i].setAttribute('href',"#");
				link[i].innerText = '<<';
			} else if(i >= 1 && i <= 4) {
				link[i] = document.createElement('a');
				link[i].setAttribute('href',"#");
				link[i].innerText = i;
			} else {
				link[i] = document.createElement('a');
				link[i].setAttribute('href',"#");
				link[i].innerText = '>>';
			}
			document.getElementById('pagination-'+this.tableid).appendChild(link[i]);
		}
	};
}
