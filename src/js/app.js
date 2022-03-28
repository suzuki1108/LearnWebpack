import "js/sub";
// import "regenerator-runtime";
// import "core-js";
// import jQuery from "jquery";

const init = async () => {
  console.log("this is a main js file");
  await asyncFn();
  jQuery();
  utils.log("utils!");
};

async function asyncFn() {
  console.log([1, 2, 3].includes(0));
}

init();
