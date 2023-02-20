/** SPL Token creation script + trasnfer tokens to different accounts on Phantom Wallet */
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { 
    createMint, 
    getMint, 
    getAccount, 
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer 
} from '@solana/spl-token';
import fs from "fs";

/** Reads json file and generate/retrieve a keypair from it */
function loadWalletKey(keypairFile) {
    let seed = Uint8Array.from(fs.readFileSync(keypairFile).toString().replace('[', '').replace(']', '').split(','));
    const keyPair = Keypair.fromSecretKey(seed);
    console.log(keyPair.publicKey.toBase58());
    return keyPair;
}

/** Create different keypairs for the parameter of createMint of SPL Token */
const fromWallet = loadWalletKey('id.json');


/** Accounts to transfer newly created SPL tokens to */

//Account 5
const toWallet_1 = new PublicKey("37cumQqEaK5FVd8ZtirQZxa2PCFMBQQK6MpYHPVUKXk5");

//Account 6
const toWallet_2 = new PublicKey("3Sv3UZFoiYgAenbX6m7dkmXnfb7Lk61yySCTAyNNkY81");

/** Connect to the Devnet */
const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);

console.log("Airdropping of 2 SOL to the fromWallet Wallet Address:", fromWallet.publicKey.toBase58());

/** Airdrops 2 SOL to the fromWallet wallet */
const airdropSignature = await connection.requestAirdrop(
  fromWallet.publicKey,
  2 * LAMPORTS_PER_SOL,
);

await connection.confirmTransaction(airdropSignature);

console.log("-------------------------------------------------------------------------------------------------");
console.log(`\x1b[32mAirdropping of 2 SOL to ${fromWallet.publicKey.toBase58()} Succeeded!`, '\x1b[0m');
console.log("-------------------------------------------------------------------------------------------------");
console.log(`Creating SPL Token Mint...`);

/** Create an SPL Token */
const mint = await createMint(
    connection,
    fromWallet,
    fromWallet.publicKey, //mint authority
    fromWallet.publicKey, //freeze authority
    9 
);

console.log("Token Mint Address: ", mint.toBase58());

/** Checks for mint token info */
const getTokenSupply = async () =>  {
    const mintInfo = await getMint(
        connection,
        mint
      )
    
    // Check and display token supply 
    console.log("Token Supply:",mintInfo.supply.toString() / 1000000000);
}

await getTokenSupply();

console.log("-------------------------------------------------------------------------------------------------");  
console.log("Creating Token Account...");

/** Create Token Account to hold the token balance of the minted tokens */
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  )


console.log("Token Account Address:",tokenAccount.address.toBase58());

/** Checks for token account info */
const getTokenBalance = async () => {
    const tokenAccountInfo = await getAccount(
        connection,
        tokenAccount.address
      )
    
    //Check and display for token balance 
    console.log("Token Balance:",tokenAccountInfo.amount.toString() / 1000000000);
}

await getTokenBalance();
console.log("-------------------------------------------------------------------------------------------------");
console.log("Minting SPL Tokens...");

/** Mint 1,000 tokens */
try{
    const signature = await mintTo(
        connection,
        fromWallet,
        mint,
        tokenAccount.address,
        fromWallet,
        1000000000000 // Decimals for the mint are set to 9 
    )
    
    console.log("\x1b[32mMinted SPL Tokens successfully!\x1b[0m");
    console.log("Mint Transaction: ", signature);
}catch(err){
    console.err(err);
}

/** Checks for mint token supply, and token account balance */
await getTokenSupply();
await getTokenBalance();
console.log("-------------------------------------------------------------------------------------------------");

/** Get token account of the toWallet addresses, and if it does not exist, create it*/
const toTokenAccount_1 = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet_1);
const toTokenAccount_2 = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet_2);

// console.log("Trying to transfer SPL to Token Account 1.....");

/** Transfer the new SPL Tokens to the Token Accounts we created */
try{
    const transferSignature_1 = await transfer(
        connection,
        fromWallet,
        tokenAccount.address,
        toTokenAccount_1.address,
        fromWallet.publicKey,
        300000000000,
    );

    console.log("\x1b[32mTransferred to Token Account 1 successfully!\x1b[0m");
    console.log("Transaction ID:",transferSignature_1);
}catch(err){
    console.error(err);
}

console.log("-------------------------------------------------------------------------------------------------");
console.log("Trying to transfer SPL to Token Account 2.....");

/** Transfer the new SPL Tokens to the Token Accounts we created */
try{
    const transferSignature_2 = await transfer(
        connection,
        fromWallet,
        tokenAccount.address,
        toTokenAccount_2.address,
        fromWallet.publicKey,
        300000000000,
    );

    console.log("\x1b[32mTransferred to Token Account 2 successfully!\x1b[0m");
    console.log("Transaction ID:",transferSignature_2);
}catch(err){
    console.error(err);
}



