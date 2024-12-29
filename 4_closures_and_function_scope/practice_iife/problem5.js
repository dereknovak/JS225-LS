/* 
Is the named function in this IIFE accessible in the global scope?
*/

(function foo() {
  console.log('Bar');
})();

foo() // ?

/* 
No. Because `foo` is defined and invoked as a function expression, it is not
added as a property of the global object and therefore cannot be invoked in the
global scope.
*/