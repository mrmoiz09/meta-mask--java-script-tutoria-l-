const connect = document.getElementById("btn");

connect.addEventListener("click", async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== "undefined") {
    // Create a new Web3 object with MetaMask as the provider
    const web3 = new Web3(window.ethereum);

    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the current account address from MetaMask
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Display the account address in the HTML
      const walletAddress = document.getElementById("wallet_address");
      walletAddress.innerHTML = account;

      // Get the current account balance from MetaMask
      const balanceWei = await web3.eth.getBalance(account);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      // Display the account balance in the HTML
      const walletBalance = document.getElementById("wallet_balance");
      walletBalance.innerHTML = balanceEth;
      document.getElementById("myInput").value = account;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("MetaMask is not installed");
  }
});


const sendFaucet = document.getElementById("send_faucet");

sendFaucet.addEventListener("click", async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== "undefined") {
    // Create a new Web3 object with MetaMask as the provider
    const web3 = new Web3(window.ethereum);

    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the current account address from MetaMask
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];

      // Prompt the user to enter the recipient's address and the amount to send
      const recipient = prompt("Enter the recipient's address:");
      const amountToSend = prompt("Enter the amount to send (in ETH):");

      // Create a new transaction object
      const transactionObject = {
        from: sender,
        to: recipient,
        value: web3.utils.toWei(amountToSend, "ether"),
      };

      // Send the transaction using MetaMask
      await web3.eth.sendTransaction(transactionObject);

      // Display a success message to the user
      alert(`Successfully sent ${amountToSend} ETH to ${recipient}`);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("MetaMask is not installed");
  }
});
