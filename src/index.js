async function perrito() {
  console.log("start");

  await wait4Seconds();

  console.log("end");
}

function wait4Seconds() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, 4000);
  });
}
