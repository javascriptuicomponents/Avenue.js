/*!
 * Avenue Menu
 * @version 1.0.2 | Sun Apr 19 2020
 * @author Denald Hushi
 * @license GNU
 */
class Menu {

	constructor(data) {
		this.view = '';
		this.data = data;
		this.Config = this.__config();	
	}

	__config = () => {
		const data = {
			'type': 'type',
			'isSPA': 'isSPA',
			'classes': 'classes',
			'parents': 'parents',
			'href': 'href',
			'class': 'class',
		};
		return data;
	};

	__parseObject() {
		var Menu = [];
		var size = Object.keys(this.data).length;
		for (var i = 0; i < size; i++) {
			Menu[this.Config.type] = this.data.type;
			Menu[this.Config.isSPA] = this.data.isSPA;
			Menu[this.Config.classes] = this.data.classes;
			Menu[this.Config.parents] = this.data.parents;
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
		var sizeClasses = Object.keys(Menu[this.Config.classes]).length;
		var Classes = [];
		for (var i = 1; i <= sizeClasses; i++) {
			Classes[i] = Menu[this.Config.classes][i];
		}
		var cls = Classes.join(" ");
		newMenu.setAttribute(
			this.Config.class, 
			cls
		);
		newMenu.setAttribute(
			'id', 
			this.view+'-id'
		);
		/* end classes */
		document.getElementById(this.view).appendChild(newMenu);

		var _DIV = document.getElementById(this.view+'-id');
		var sizeMenu = Object.keys(Menu[this.Config.parents]).length;
		for(var p in Menu[this.Config.parents]) {
			var link = document.createElement('a');
			if (Menu['child']) {
				//to do
			} else {
				if(Menu[this.Config.isSPA]) {
					link.setAttribute(
						this.Config.href, 
						'#'+Menu[this.Config.parents][p].link
					);
				} else {
					link.setAttribute(
						this.Config.href, 
						Menu[this.Config.parents][p].link
					);
				}
			}
			if(Menu[this.Config.parents][p].icon) {
				link.innerHTML = '<i class="'+Menu[this.Config.parents][p].icon+'"></i> ' + Menu['parents'][p].name;
			} else {
				link.innerHTML = Menu[this.Config.parents][p].name;
			}
			_DIV.appendChild(link);			
		}
		var handleMenu = document.createElement('a');
		handleMenu.setAttribute(
			this.Config.href, 'javascript:void(0);'
		);
		handleMenu.setAttribute(
			this.Config.class, 'icon'
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

export { Menu };