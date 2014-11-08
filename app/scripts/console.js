var a = {
    value: 'asdf'
}

rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function (el) {
        el.addEventListener('input', this.publish);
    },
    unbind: function (el) {
        el.removeEventListener('input', this.publish);
    }
};

rivets.bind(document.getElementById("console"), {
    scope: a
});

watch(a, function () {
    console.log(arguments);
});
