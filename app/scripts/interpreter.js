function Interpreter(validations, onSuccess) {
  return function() {
    for (var i = 0; i < validations.length; ++i) {
      if (!validations[i].test(arguments[i]))
        throw new Error('Argument ' + (i + 1) + ' is invalid');
    }

    onSuccess(arguments.toArray());
  }
}

module.exports = Interpreter;
