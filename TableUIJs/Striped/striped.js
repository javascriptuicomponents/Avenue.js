class TableStriped {

	constructor(obj) {
		this.type = ''; //type of table design
		this.view = ''; //id where to see table
		this.obj = obj;
		this.tableInstance = 'table';
		this.classInstance = 'class';
		this.header = '';
	}
	
	__initTable = (type, id) => {
		this.type = type.toLowerCase();
		this.view = id;
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
		var row = table.insertRow(0);
		for(var i=0; i<this.obj.length;i++) {
			if (this.obj[i].fieldlabel) {
				var value = row.insertCell(i);
				value.innerHTML = this.obj[i].fieldlabel;
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
		var data = this.__dataRequest(api, 'body');
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
		 	Object.keys(rows[item]).forEach(function (index) {
		 		var obj = rows[item][index];
		 		var fieldname = obj[0];
		 		var fieldvalue = obj[1];
		 		singleCell[index] = singleRow[item].insertCell(index);
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
		  	})
		  	const json = await response.json();
		  	if (type == 'body') {
		  		//call table body method
		  		this.__bodyStriped(json);
		  	}
		})();
	}
}