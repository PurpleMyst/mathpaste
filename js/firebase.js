// 'await post("asd")' puts "asd" to firebase and returns an ID string
async function post(math) {
    // ref represents the object that represents the math in firebase
    const ref = await firebase.database().ref("maths").push();
    ref.set({ math: math });
    return ref.key;
}

// 'await get(an ID from post)' returns a math string
async function get(pasteId) {
    const value = await firebase.database().ref(`maths/${pasteId}`).once("value");
    console.log(value.val());
    return value.val().math;
}

// for require.js
define({
    post: post,
    get: get
});
