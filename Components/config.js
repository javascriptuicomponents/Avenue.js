import { Menu } from './Menu/menu.js';
import { DataTable } from './DataTable/dataTable.js';
import { FormElement } from './Forms/forms.js';
import { Button } from './Buttons/buttons.js';
/*
 * method initMenu()
 * @params
 * call menu creation
 */
function initMenu(instance, data, view) {
	instance = new Menu(data);
	instance.__initMenu(view);
};

export { initMenu };

/*
 * method initButton()
 * @params
 * call button creation
 */
function initButton(instance, data, view) {
	instance = new Button(data);
	instance.__initButton(view);
};

export { initButton };

/*
 * method initForm()
 * @params
 * call form creation
 */
function initForm(instance, data, view) {
	instance = new FormElement(data);
	instance.__initForm(view);
};

export { initForm };

/*
 * method initTable()
 * @params
 * call table creation
 */
function initTable(instance, data, view, tableid) {
	var type = instance;
	instance = new DataTable(data);
	instance.__initTable(type, view, tableid);
};

export { initTable };