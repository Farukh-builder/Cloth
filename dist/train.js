"use strict";
console.log(" Training js is going ");
// TASK ZI
// Shundan function yozing, bu function 3 soniydan so'ng
// "Hello World!" so'zini qaytarsin.
// MASALAN: delayHelloWorld("Hello World"); return "Hello World";
function delayHelloWorld(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, 3000); // 
    });
}
// Ishlatish:
delayHelloWorld("Hello World!").then((result) => {
    console.log(result);
});
/* Project Standarts:
  - Login standards
  - Naming standarts
    function, method, variable => Camel case
    class => PASCAL
    folder, file =>KEBAB
    css class => SNAKE
 -Error handling

*/
/* Request
 
   Traditionla API (form POST)
   REST API;
   GraphQl API;

*/
/* Frontend Development:
     Traditional FD  => SSR   =>  EJS
      Modern FD   =>  SPA  =>  REACT
*/
/*
  request join
  self-destroy
*/
/*   Validation:
      Frontend validation
      Backend validation
      Database validation
 */
