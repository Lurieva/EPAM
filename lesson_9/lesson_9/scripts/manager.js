app.Manager = (function (_, document, app) {

    function Manager(el, options) {
        options = options || {};
        this.storage = new app.Storage(options.type);
        this.storage.load();
        this.el = el;

        this.flagSort = true;
        this.MAX_ROWS = 20;

        return this;
    }

    Manager.prototype = {

        initialize: function () {
            this.initTemplate();
            this.findNodes();
            this.render();
            this.addHandlers();
        },

        findNodes: function () {
            this.nodes = {
                lastName: document.querySelector('#lName'),
                firstName: document.querySelector('#fName'),
                age: document.querySelector('#age'),
                searchInput: document.querySelector('#search'),
                table: document.querySelector('table'),
                addEditBtn: document.querySelector('#add-btn')
            };
        },

        addHandlers: function () {
            this.nodes.addEditBtn.addEventListener('click', this.addEdit.bind(this));
            document.querySelector('#save-btn').addEventListener('click', this.saveItems.bind(this));
            document.querySelector('#clear-btn').addEventListener('click', this.clearItems.bind(this));
            document.querySelector('#cancel-btn').addEventListener('click', this.cancel.bind(this));
            document.querySelector('#search-btn').addEventListener('click', this.search.bind(this));
            this.nodes.table.addEventListener('click', this.sortTable.bind(this));
            this.nodes.table.addEventListener('click', this.updateTable.bind(this));
        },

        addEdit: function () {
            if (hasClass(this.nodes.addEditBtn, 'edit')) {
                this.nodes.addEditBtn.classList.remove('edit');
                this.nodes.addEditBtn.innerHTML = 'add';
                this.insertUpdatingData();
            } else {
                this.addPerson();
            }
        },

        cancel: function () {
            this.storage.load();
            this.render();
        },

        updateTable: function (event) {
            var index,
                target = event.target;

            if (event.target.tagName === 'TH') return;

            while (target !== 'TR')  {
                if (target.tagName === 'TD' && target.className === 'removeItem') {
                    index = target.parentNode.rowIndex;
                    deleteRowTable(this.nodes.table, index);
                    this.storage.remove(index);                   
                } else if (target.tagName === 'TD' && target.className === 'editItem') {
                    this.nodes.addEditBtn.classList.add('edit');
                    this.nodes.addEditBtn.innerHTML = 'edit';
                    this.editItem(this.nodes.table, target.parentNode.rowIndex);
                }
                return 
                target = target.parentNode;
            }
        },

        sortTable: function (event) {
            var target = event.target;

            if (target.tagName !== 'TH') return;
            sortColumn(table, target.cellIndex, target.getAttribute('data-type'), this.flagSort);
            this.flagSort = !this.flagSort;
        },


        editItem: function (parentNode, rowIndex) {
            this.list = parentNode.rows[rowIndex].querySelectorAll('td');
            
            this.id = this.list[0].innerHTML;
            this.nodes.lastName.value = this.list[1].innerHTML;
            this.nodes.firstName.value = this.list[2].innerHTML;
            this.nodes.age.value = this.list[3].innerHTML;
        },

        insertUpdatingData: function () {
            this.list[1].innerHTML = this.nodes.lastName.value;
            this.list[2].innerHTML = this.nodes.firstName.value;
            this.list[3].innerHTML = this.nodes.age.value;

            this.updateItem();
            this.resetPersonData();
        },

        updateItem: function () {
            var person = {
                lastName: this.nodes.lastName.value,
                firstName: this.nodes.firstName.value,
                age: this.nodes.age.value,
                id: this.list[0].innerHTML
            }

            return extend(this.storage.getById(person.id), person);
            this.saveItems();
        },

        search: function () {
            var result,
                input = this.nodes.searchInput.value,
                regExp = /(?:(.*):)?(.*)/i;

            if (input.length === 0) {
            	this.render();
            }

            result = input.match(regExp);
            filter(result[2], this.nodes.table, result[1]);

            this.resetInputValue();
        },

        resetInputValue: function () {
            this.nodes.searchInput.value = '';
        },

        clearItems: function () {
            removeChildren(this.el);
            this.storage.clear();
        },

        initTemplate: function () {
            var templateContent = document.getElementById('item');

            this.template = _.template(templateContent.innerHTML);
        },

        render: function () {
            var result = this.storage.getData().reduce(function (sum, el) {
                return this.renderItem(el) + sum;
            }.bind(this), '');

            this.el.innerHTML = result;
        },

        renderItem: function (data) {
            return this.template(data);
        },

        getAttributePerson: function () {
            return {
                lastName: this.nodes.lastName.value,
                firstName: this.nodes.firstName.value,
                age: this.nodes.age.value,
                id: generateId('person')
            };
        },

        addPerson: function () {
            var person = this.getAttributePerson();

            this.setItems(person);
            this.resetPersonData();
            this.render();
            this.countRows();            
        },

        countRows: function () {
            if (this.el.rows.length > this.MAX_ROWS) {
                forEach(slice(this.el.rows, this.MAX_ROWS), function (item) {
                    this.el.removeChild(item);
                }.bind(this));
            }   
        },

        resetPersonData: function () {
            this.nodes.lastName.value = '';
            this.nodes.firstName.value = '';
            this.nodes.age.value = '';
        },

        saveItems: function () {
            this.storage.save();
        },

        setItems: function (data) {
            this.storage.set(data);
        }

    };

    return Manager;

}(_, document, app));
