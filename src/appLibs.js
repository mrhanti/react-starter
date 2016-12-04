//3rd party libs go here

/**
 * This functions forces babel-runtime to be included in the vendor lib instead of the main lib
 */
async function forceRuntimeIntoVendor() {
  console.log(await  new Promise((r)=> r('App lib loaded') ));
}
forceRuntimeIntoVendor();
