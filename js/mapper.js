window.onload = function() {
    var keyInput = this.document.getElementById('keyInput');
    var valueInput = this.document.getElementById('valueInput');

    var addButton = this.document.getElementById('addItem');
    addButton.onclick = addItem;

    var message = this.document.getElementById('message');

    function addItem() {
        message.textContent = "New item added";
    }
}