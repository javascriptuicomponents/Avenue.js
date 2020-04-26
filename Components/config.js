import { Menu } from './Menu/menu.js';
import { DataTable } from './DataTable/dataTable.js';
import { FormElement } from './Forms/forms.js';
import { Button } from './Buttons/buttons.js';
/*
 * method initMenu()
 * @params
 * call menu creation
 */
export function initMenu(instance, data, view) {
	instance = new Menu(data);
	instance.__initMenu(view);
};

/*
 * method initButton()
 * @params
 * call button creation
 */
export function initButton(instance, data, view) {
	instance = new Button(data);
	instance.__initButton(view);
};

/*
 * method initForm()
 * @params
 * call form creation
 */
export function initForm(instance, data, view) {
	instance = new FormElement(data);
	instance.__initForm(view);
};

/*
 * method initTable()
 * @params
 * call table creation
 */
export function initTable(instance, data, view, tableid) {
	var type = instance;
	instance = new DataTable(data);
	instance.__initTable(type, view, tableid);
	//register methods here
	window.deleteCheckedRows = function deleteCheckedRows(tableid) {
	     instance.__deleteCheckedRows(tableid);
	}
	window.checkAllRows = function checkAllRows(tableid) {
	    instance.__checkAllRows(tableid);
	}
	window.nextPage = function nextPage(page) {
	    instance.__nextPage(page);
	}
	window.sortTable = function sortTable(n, s) {
	    instance.__sortTable(n, s);
	}
};