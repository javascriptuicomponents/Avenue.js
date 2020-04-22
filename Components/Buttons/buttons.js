class Button {

	constructor(data) {
		this.view = '';
		this.data = data;
	}

	__initButton = (view) => {
		this.view = view;
		this.__createButton();
	};

	__parseObject() {
		var Button = [];
		var size = Object.keys(this.data).length;
		for (var i = 0; i < size; i++) {
			Button['type'] = this.data.type;
			Button['value'] = this.data.value;
			Button['classes'] = this.data.classes;
			Button['function'] = this.data.function;
			Button['attributes'] = this.data.attributes;
		}
		return Button;
	};

	__createButton = () => {
		var Button = this.__parseObject();
		if (Button['type'] == 'button') {
			var newButton = document.createElement('button');
		} else {
			var newButton = document.createElement('a');
		}
		newButton.innerHTML = Button['value'];
		/* start classes */
		var sizeClasses = Object.keys(Button['classes']).length;
		var Classes = [];
		for (var i = 1; i <= sizeClasses; i++) {
			Classes[i] = Button['classes'][i];
		}
		var cls = Classes.join(" ");
		newButton.setAttribute('class', cls);
		/* end classes */

		/* start functions */
		for (var f in Button['function']) {
			newButton.setAttribute(f, Button['function'][f]);
		}
		/* end functions */

		/* start attributes */
		for (var a in Button['attributes']) {
			newButton.setAttribute(a, Button['attributes'][a]);
		}
		/* end attributes */
		document.getElementById(this.view).appendChild(newButton);
	};
}