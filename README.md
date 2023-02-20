# Candy Machine V3 Solana

Here is a list of what's on this repository: 
- Creating SPL Tokens 
- Assigning on-chain metadata to the SPL Tokens
- Creating NFT Collection using Sugar / Candy Machine V3 from Metaplex
- Integrating UI to mint NFT collections.

## Getting Started

If you want to use this repository as a guide, clone the whole repository, or just copy a specific part of the repository that you need.

---
### SPL Token Creation

- Located at ```SPL-TOKEN``` folder
- Copy/clone the folder
- Put your ```secretKey``` on ```id.json```
- Change necessary addresses on ```index.js```
- Download dependencies using ```npm install``` on the directory then run the script using ```node index.js```
---
### Adding SPL Token Metadata

- Located at ```METADATA_ACCOUNT```
- Copy/clone the folder
- Put your ```secretKey``` on ```id.json```
- Change the information of ```tokenData``` to your liking as well as the address of the ```mint``` to your Token Mint Address
- Download dependencies using ```npm install``` on the directory then run the script using ```ts-node main.ts```
---
### Deploying NFT Collection

- Located at ```CANDY-MACHINE-V3```
- Install and set-up [Sugar Candy Machine CLI](https://docs.metaplex.com/developer-tools/sugar/overview/installation)
- Then follow this [guide](https://docs.metaplex.com/programs/candy-machine/how-to-guides/my-first-candy-machine-part1) on how to upload your NFT collection
---
### CandyMachine V3 UI

- Located at ```CANDY-MACHINE-V3/mint-ui-example/```
- Copy/clone the ```mint-ui-example``` folder
- Create an .env file using ```cp .env.example``` and put the CandyMachine ID
- Download dependencies using ```npm install```on the directory then run the server using ```npm run dev```
---

## Happy Minting! :)
