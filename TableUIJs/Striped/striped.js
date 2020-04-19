/*!
 * Data Table UI Js
 * @version 1.0.2 | Sun Apr 19 2020
 * @author Avvictech Group
 * @license GNU
 */
class TableStriped {
	constructor(data) {
		this.type = '';
		this.view = '';
		this.header = '';
		this.tableid = '';
		this.shadow; //dragable
		this.dataStriped = data;
		this.tableInstance = 'table';
		this.classInstance = 'class';
	}

	__parseObject = () => {
		var Striped = [];
		for (var i = 0; i < this.dataStriped.length; i++) {
			if (this.dataStriped[i].custom) {
				var custom = this.dataStriped[i].custom;
				Striped['orderBy'] = custom.orderBy;
				Striped['limitPerPage'] = custom.limitPerPage;
				Striped['pagination'] = custom.pagination;
				Striped['search'] = custom.search;
				Striped['checkbox'] = custom.checkbox;
				Striped['dragable'] = custom.dragable;
			}
		}
		return Striped;
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
		if (this.type == 'striped') {
			this.__createTable();
		}
	};

	__createTable = () => {
		this.header = this.__headerStriped();
		this.__getBodyStriped(); //get all data
		document.getElementById(this.view).appendChild(this.header);
	};

	/*
	 * method __headerStriped()
	 * @params
	 * create header ot table
	 */
	__headerStriped = () => {
		var Striped = this.__parseObject();
		var table = document.createElement(this.tableInstance);
		table.setAttribute(this.classInstance, 'table-striped table-header');
		table.setAttribute('id', this.tableid);
		var row = table.insertRow(0);
		if (Striped.checkbox == true) {
			var checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('id', 'all-checked-for-' + this.tableid);
			checkbox.setAttribute(
				'onclick',
				'striped.__checkAllRows(' + this.tableid + ')'
			);
			var checkboxCell = row.insertCell(0);
			checkboxCell.appendChild(checkbox);
		}
		for (var i = 0; i < this.dataStriped.length; i++) {
			if (this.dataStriped[i].fieldlabel) {
				var value = row.insertCell(i);
				value.setAttribute('id', this.tableid + '_' + i);
				if (this.dataStriped[i].sortable) {
					value.innerHTML =
						'<span class="table-header-cursour">' +
						this.dataStriped[i].fieldlabel +
						'</span>';
					value.setAttribute(
						'onclick',
						'striped.__sortTable(' + i + ', this.id)'
					);
				} else {
					value.innerHTML = this.dataStriped[i].fieldlabel;
				}
			}
		}
		return table;
	};

	/*
	 * method __getBodyStriped()
	 * @params
	 * get all data to create rows for table
	 */
	__getBodyStriped = () => {
		for (var i = 0; i < this.dataStriped.length; i++) {
			if (this.dataStriped[i].api) {
				var api = this.dataStriped[i].api;
			}
		}
		this.__dataRequest(api, 'body');
	};

	__bodyStriped = (response) => {
		var Striped = this.__parseObject();
		var rows = {};
		for (var i = 0; i < response.length; i++) {
			var value = {};
			for (var j = 0; j < this.dataStriped.length; j++) {
				if (this.dataStriped[j].fieldname) {
					value[j] = [this.dataStriped[j].fieldname, response[i][j]];
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
			if (Striped.dragable) {
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
			if (Striped.checkbox == true) {
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
	};

	__dataRequest = (api, type = false) => {
		var Striped = this.__parseObject();
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
					Striped.limitPerPage,
					1
				);
				//call table body method
				this.__bodyStriped(dataPagination);
			}
		})();
	};

	__pagination = (data, pageSize, pageNumber) => {
 	 	return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
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
}
