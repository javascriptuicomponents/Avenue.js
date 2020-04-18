class TableStriped {

	constructor(obj) {
		this.type = ''; //type of table design
		this.view = ''; //id where to see table
		this.header = '';
		this.tableid = '';
		this.obj = obj;
		this.tableInstance = 'table';
		this.classInstance = 'class';
	}
	
	__parseObject = () => {
		for(var i=0; i<this.obj.length;i++) {
			if (this.obj[i].custom) {
				var custom = this.obj[i].custom;
				this.orderBy = custom.orderBy;
				this.limitPerPage = custom.limitPerPage;
				this.pagination = custom.pagination;
				this.search = custom.search;
			}
		}		
	}

	__initTable = (type, id, tableid) => {
		this.type = type.toLowerCase();
		this.view = id;
		this.tableid = tableid;
		this.__parseObject();
		if (this.type == 'striped') {
			this.__createTable();
		}
	}

	__createTable = () => {
		this.header = this.__headerStriped();
		this.__getBodyStriped(); //get all data
		document.getElementById(this.view).appendChild(this.header);
	}

	__headerStriped = () => {
		var table = document.createElement(this.tableInstance);
		table.setAttribute(this.classInstance, 'table-striped table-header');
		table.setAttribute('id', this.tableid);
		var row = table.insertRow(0);
		for(var i=0; i<this.obj.length;i++) {
			if (this.obj[i].fieldlabel) {
				var value = row.insertCell(i);
				value.setAttribute('id', this.tableid+"_"+i);
				if (this.obj[i].sortable) {
					value.innerHTML = '<span class="table-header-cursour">'+this.obj[i].fieldlabel+'</span>';
					value.setAttribute('onclick', 'striped.__sortTable('+i+', this.id)');
				} else {
					value.innerHTML = this.obj[i].fieldlabel;
				}
			}
		}
		return table;
	}

	__getBodyStriped = () => {
		for(var i=0; i<this.obj.length;i++) {
			if (this.obj[i].api) {
				var api = this.obj[i].api;
			}
		}
		this.__dataRequest(api, 'body');
	}

	__bodyStriped = (response) => {
		var rows = {};
		for(var i=0; i<response.length;i++) {
			var value = {};
			for (var j = 0; j < this.obj.length; j++) {
				if (this.obj[j].fieldname) {
					value[j] = [this.obj[j].fieldname, response[i][j]];
				}
			}
			rows[i] = value;
		}
		var header = this.header;
		var singleRow = [];
		var singleCell = [];
		Object.keys(rows).forEach(function (item) {
		 	singleRow[item] = header.insertRow(-1);
		 	singleRow[item].setAttribute('data-tr-id', item); 
		 	Object.keys(rows[item]).forEach(function (index) {
		 		var obj = rows[item][index];
		 		var fieldname = obj[0];
		 		var fieldvalue = obj[1];
		 		singleCell[index] = singleRow[item].insertCell(index);
		 		singleCell[index].setAttribute('data-td-name', fieldname);
		 		singleCell[index].innerHTML = fieldvalue;
		 	});
		});
	}

	__dataRequest = (api, type = false) => {
		const url = api.url;
		const method = api.method;
		const data = api.data;

		(async () => {
		  	const response = await fetch(url, {
		    	method: method,
		    	body: JSON.stringify(data),
		    	headers: {
		     		"Content-type": "application/json; charset=UTF-8"
		    	}
		  	});
		  	let json = await response.json();
		  	if (type == 'body') {
		  		//call table body method
		  		this.__bodyStriped(json);
		  	}
		})();
	}

	__sortTable = (n, tableid) => {
		var tid = tableid.split('_');
	  	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	  	table = document.getElementById(tid[0]);
	  	switching = true;
	  	dir = "asc"; 
	  	while (switching) {
	    	switching = false;
	    	rows = table.rows;
	    	for (i = 1; i < (rows.length - 1); i++) {
	      		shouldSwitch = false;
	      		x = rows[i].getElementsByTagName("td")[n];
	      		y = rows[i + 1].getElementsByTagName("td")[n];
	      		if (dir == "asc") {
	        		if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	          			shouldSwitch= true;
	          			break;
	        		}
	      		} else if (dir == "desc") {
	        		if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
	          			shouldSwitch = true;
	          			break;
	        		}
	      		}
	    	}
	    	if (shouldSwitch) {
	      		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      		switching = true;
	      		switchcount ++;      
	    	} else {
	      		if (switchcount == 0 && dir == "asc") {
	        		dir = "desc";
	        		switching = true;
	      		}
	    	}
	  	}
	}
}