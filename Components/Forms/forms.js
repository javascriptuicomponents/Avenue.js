/*!
 * Avenue FormElement
 * @version 1.0.2 | Sun Apr 19 2020
 * @author Denald Hushi
 * @license GNU
 */
class FormElement {

	constructor(data) {
		this.view = '';
		this.data = data;
		this.Config = this.__config();
	}

	__config = () => {
		const data = {
			'type': 'type',
			'name': 'name',
			'input': 'input',
			'id': 'id',
			'defaultvalue': 'defaultvalue',
			'placeholder': 'placeholder',
			'classes': 'classes',
			'function': 'function',
			'attributes': 'attributes',
		};
		return data;
	};

	__parseObject() {
		var Input = [];
		var size = Object.keys(this.data).length;
		for (var i = 0; i < size; i++) {
			if(this.data.type == 'radio' || this.data.type == 'checkbox') {
				Input[this.Config.type] = this.data.type;
				Input[this.Config.name] = this.data.name;
				Input[this.Config.input] = this.data.input;
			} else {
				Input[this.Config.type] = this.data.type;
				Input[this.Config.name] = this.data.name;
				Input[this.Config.id] = this.data.id;
				Input[this.Config.defaultvalue] = this.data.defaultvalue;
				Input[this.Config.placeholder] = this.data.placeholder;
				Input[this.Config.classes] = this.data.classes;
				Input[this.Config.function] = this.data.function;
				Input[this.Config.attributes] = this.data.attributes;
			}
		}
		return Input;
	};

	__initForm = (view) => {
		var Input = this.__parseObject();
		this.view = view;
		if (Input.type == 'text' || Input.type == 'number' || Input.type == 'date') {
			this.__createInput(Input);
		}
		if (Input.type == 'picklist') {
			this.__createPicklist(Input);
		}
		if (Input.type == 'radio') {
			this.__createRadio(Input);
		}
		if (Input.type == 'checkbox') {
			this.__createCheckbox(Input);
		}
	};

	__createInput = (Input) => {
		var newInput = document.createElement('input');
		newInput.setAttribute(
			'type', Input.type
		);
		newInput.setAttribute(
			'name', Input.name
		);
		newInput.setAttribute(
			'id', Input.id
		);
		newInput.setAttribute(
			'value', Input.defaultvalue
		);
		newInput.setAttribute(
			'placeholder', Input.placeholder
		);
		/* start classes */
		var sizeClasses = Object.keys(Input['classes']).length;
		var Classes = [];
		for (var i = 1; i <= sizeClasses; i++) {
			Classes[i] = Input['classes'][i];
		}
		var cls = Classes.join(" ");
		newInput.setAttribute('class', cls);
		/* end classes */
		/* start functions */
		for (var f in Input['function']) {
			newInput.setAttribute(f, Input['function'][f]);
		}
		/* end functions */

		/* start attributes */
		for (var a in Input['attributes']) {
			newInput.setAttribute(a, Input['attributes'][a]);
		}
		/* end attributes */
		document.getElementById(this.view).appendChild(newInput);
	};


	__createRadio = (Input) => {
		var size = Object.keys(Input.input).length;
		var newInput = [];
		var newLabel = [];
		for(var i = 1; i <= size; i++) {
			newInput[i] = document.createElement('input');
			newInput[i].setAttribute(
				'type', Input.type
			);
			newInput[i].setAttribute(
				'name', Input.name
			);
			newInput[i].setAttribute(
				'id', Input.input[i].id
			);
			for (var f in Input.input[i].function) {
				newInput[i].setAttribute(
					f, Input.input[i].function[f]
				);	
			}
			for (var a in Input.input[i].attributes) {
				newInput[i].setAttribute(
					a, Input.input[i].attributes[a]
				);	
			}
		 	newLabel[i] = document.createElement('label');
			newLabel[i].innerHTML = Input.input[i].defaultvalue;
			document.getElementById(this.view).appendChild(newLabel[i]);
			document.getElementById(this.view).appendChild(newInput[i]);

		}
	};

	__createCheckbox = (Input) => {
		var size = Object.keys(Input.input).length;
		var newInput = [];
		var newLabel = [];
		for(var i = 1; i <= size; i++) {
			newInput[i] = document.createElement('input');
			newInput[i].setAttribute(
				'type', Input.type
			);
			newInput[i].setAttribute(
				'name', Input.name
			);
			newInput[i].setAttribute(
				'id', Input.input[i].id
			);
			for (var f in Input.input[i].function) {
				newInput[i].setAttribute(
					f, Input.input[i].function[f]
				);	
			}
			for (var a in Input.input[i].attributes) {
				newInput[i].setAttribute(
					a, Input.input[i].attributes[a]
				);	
			}
		 	newLabel[i] = document.createElement('label');
			newLabel[i].innerHTML = Input.input[i].defaultvalue;
			document.getElementById(this.view).appendChild(newLabel[i]);
			document.getElementById(this.view).appendChild(newInput[i]);

		}
	};

	__validForm = () => {

	};

}

export { FormElement };