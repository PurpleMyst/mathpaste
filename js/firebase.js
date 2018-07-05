/*
select "Database" at left in Firebase, go to the "Rules" tab
these are the rules i use:

{
  "rules": {
    "maths": {
      "$math": {
        // only maths from the last 30 days can be read
        // exercise for you:  30 days = 2592000000 milliseconds
        ".read": "data.child('timestamp').val() > (now - 2592000000)",

        // new maths must have a string content and a number timestamp
        ".validate": "newData.hasChildren(['content', 'timestamp']) && newData.child('content').isString() && newData.child('timestamp').isNumber()",

        // the docs don't seem to mention this, but nothing works without this
        // it still validates before writing
        ".write": true
      }
    }
  }
}

TODO: delete old maths regularly?
*/

// 'await post("asd")' puts "asd" to firebase and returns an ID string
async function post(math) {
    // ref represents the object that represents the math in firebase
    const ref = await firebase.database().ref("maths").push();
    ref.set({ content: math, timestamp: (new Date()).valueOf() });
    return ref.key;
}

// 'await get(an ID from post)' returns a math string
// TODO: handle errors
async function get(pasteId) {
    const value = await firebase.database().ref(`maths/${pasteId}`).once("value");
    console.log(value.val());
    return value.val().content;
}

// for require.js
define({
    post: post,
    get: get
});
