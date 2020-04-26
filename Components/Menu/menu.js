class Menu {

	constructor(data) {
		this.view = '';
		this.data = data;		
	}

	__parseObject() {
		var Menu = [];
		var size = Object.keys(this.data).length;
		for (var i = 0; i < size; i++) {
			Menu['type'] = this.data.type;
			Menu['isSPA'] = this.data.isSPA;
			Menu['classes'] = this.data.classes;
			Menu['parents'] = this.data.parents;
		}
		return Menu;
	};

	__initMenu = (view) => {
		var Menu = this.__parseObject();
		this.view = view;
		this.__createMenu(Menu);
	};

	__createMenu = (Menu) => {
		var newMenu = document.createElement('div');
		/* start classes */
		var sizeClasses = Object.keys(Menu['classes']).length;
		var Classes = [];
		for (var i = 1; i <= sizeClasses; i++) {
			Classes[i] = Menu['classes'][i];
		}
		var cls = Classes.join(" ");
		newMenu.setAttribute('class', cls);
		newMenu.setAttribute('id', this.view+'-id');
		/* end classes */
		document.getElementById(this.view).appendChild(newMenu);

		var _DIV = document.getElementById(this.view+'-id');
		var sizeMenu = Object.keys(Menu['parents']).length;
		for(var p in Menu['parents']) {
			var link = document.createElement('a');
			if (Menu['child']) {
				//to do
			} else {
				if(Menu['isSPA']) {
					link.setAttribute('href', '#'+Menu['parents'][p].link);
				} else {
					link.setAttribute('href', Menu['parents'][p].link);
				}
			}
			if(Menu['parents'][p].icon) {
				link.innerHTML = '<i class="'+Menu['parents'][p].icon+'"></i> ' + Menu['parents'][p].name;
			} else {
				link.innerHTML = Menu['parents'][p].name;
			}
			_DIV.appendChild(link);			
		}
		var handleMenu = document.createElement('a');
		handleMenu.setAttribute(
			'href', 'javascript:void(0);'
		);
		handleMenu.setAttribute(
			'class', 'icon'
		);
		handleMenu.setAttribute(
			'onclick', this.view+'.__menuHandler()'
		);
		handleMenu.innerHTML = 'Menu';
		_DIV.appendChild(handleMenu);
	};

	__menuHandler = () => {
	  	var x = document.getElementById(this.view);
	  	if (x.className === "topnav") {
	    	x.className += " responsive";
	  	} else {
	    	x.className = "topnav";
	  	}
	};
}