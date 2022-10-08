paypal.Buttons({
  // Sets up the transaction when a payment button is clicked
  createOrder: function (data, actions) {
    return fetch("/api/orders", {
      method: "post",
      // use the "body" param to optionally pass additional order information
      // like product ids or amount
    })
      .then((response) => response.json())
      .then((order) => order.id);
  },
  // Finalize the transaction after payer approval
  onApprove: function (data, actions) {
    return fetch(`/api/orders/${data.orderID}/capture`, {
      method: "post",
    })
      .then((response) => response.json())
      .then((orderData) => {
        // Successful capture! For dev/demo purposes:
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        var transaction =
          orderData.purchase_units[0].payments.captures[0];
        alert(
          "Transaction " +
            transaction.status +
            ": " +
            transaction.id +
            "\n\nSee console for all available details"
        );
        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
  },
})
.render("#paypal-button-container");
