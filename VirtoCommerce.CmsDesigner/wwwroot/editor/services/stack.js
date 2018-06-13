myapp.factory('stack', Stack);

  function Stack() {
    var obj = {}, stack = [];

    obj.push = function(item) {
      var copy = JSON.parse(JSON.stringify(item));
      stack.push(copy);
      console.log(stack);
    }

    obj.pop = function() {
      if (stack.length > 0) {
        return stack.pop();
      }

      console.log(stack);
    };

    obj.length = function() {
      return stack.length;
    };

    obj.isLast = function() {
      return stack.length === 1;
    };

    obj.get = function() {
      if (stack.length > 0) {
        return JSON.parse(JSON.stringify(stack[stack.length - 1]));
      } else {
        return stack;
      }
    };

    obj.getFirst = function() {
      return JSON.parse(JSON.stringify(stack[0]));
    };

    obj.clear = function() {
      return stack = [];
    };

    return obj;
  }
