import React, { useState } from 'react';
import web3 from './web3';

const NFTMarketplaceContractAddress = '00x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Replace with the actual contract address

function App() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleMintNFT = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      const NFTMarketplace = new web3.eth.Contract(NFTMarketplaceContractABI, NFTMarketplaceContractAddress);

      setMessage('Minting NFT...');

      await NFTMarketplace.methods.mintNFT(recipient).send({ from: accounts[0] });

      setMessage('NFT successfully minted!');
    } catch (error) {
      setMessage('Error while minting NFT: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Mint NFT</h1>
      <form onSubmit={handleMintNFT}>
        <label>Recipient Address:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        <button type="submit">Mint NFT</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
