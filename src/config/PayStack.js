const PUBLIC_KEY = "pk_test_189c3685d98a1b3d9fc10c49803c09f566e2c4d3";
//  process.env.PAYSTACK_PUBLIC_KEY SHOULD BE CALLED HERE
var myWindow = window;
class CustomPaystack {
  public_key;
  constructor(key) {
    this.public_key = key;
  }
  pay(data, onSuccess, onClose) {
    if (!data.email) {
      throw new Error("Email is required");
    } else if (!data.amount) {
      throw new Error("Amount is required");
    }
    if (!data.reference) {
      data.reference = "" + Math.floor(Math.random() * 1000000000 + 1);
    }
    console.log("my reference ", data.reference);
    if (myWindow.PaystackPop) {
      //console.log("paystack", data)
      let handler = myWindow.PaystackPop.setup({
        key: this.public_key,
        // Replace with your public key
        email: data.email,
        amount: data.amount,
        reference: data.reference,
        callback: onSuccess,
        onClose: onClose,
        channels: ["card"],
      });
      handler.openIframe();
    }
  }
}
export default new CustomPaystack(PUBLIC_KEY);
