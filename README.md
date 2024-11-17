# Run Instructions

### Pre-requisities
For front-end <br />
**Vite** <br />
**React** <br />
**Node.js** <br /> 
**web3 module** (npm i web3) <br /> <br />
For smart contract(development only) <br />
**Rust** <br />
**Move** <br />
**Aptos-lab tools**

### Run Commands
```
cd TrustBook
npm install
npm run dev
```
## Video Link-

https://drive.google.com/file/d/1l0m0gOfgHMa8rpzClOETOSNSr4oT3YWM/view?usp=sharing

# Main Idea-

Our product is a SocialFi system. Basic. Well, we have used a lot of Social Media apps, but their main problems were encryption/security and bots-spammers. So why not make everything public; our app would be aimed towards people who want to opiniate their view, but on their real identity.

For example; you have want to get opinions from a certain community, but the responses should be real, so that can be possible if people are logging on and replying from their Government registered identity proof; Aadhar. 

This ensures that both the parties are aware of their true identity and this helps establish a trust through the internet. This also prevents any spammers or malicious messages, as the person’s true identity is at stake. This creates a dynamic and honest environment for people to communicate on.

We have further expanded this idea by including a marketplace, where people can post their products or services, insured by their true identities. We will be explaining the features in further depth below.


# Features-

### Identity-
A person’s account on the platform is entirely defined by their Aadhar. Their username will consist of their true name followed by an identity number. Their public identity number is also visible. Other details such as- Mobile Number, Email ID, Age, Address, E-Mail ID can be made visible or be hidden.

### Wallet-
The user would be required to connect their crypto wallet to the platform to access it. This will be linked with your Aadhar to reduce login hassles. 

### Organisations-
For organisations, we have included a simple sign up method, one just needs to enter their GSTIN number and connect to a crypto wallet, and then they can add all their employees.

### Marketplace-
User-to-user marketplace connect; product listing and auctioning and dynamic pricing. Buyer and seller can directly connect with each other through chatting and conduct instantaneous transactions.

### Social Causes-
To promote social causes, we will be hosting and promoting specific products create by a certain community on our platform at a discounted price. 

### Security-
Our platform stands by its security, as our users will be communicating with their official details and hence, there is almost no chance of any malicious content. Even if that’s the case, our teams will immediately rectify and handle such situations through the built-in grievance portal.

# Future Plans-

### Tokenization-
We plan to include tokens such as NFTs as proof of transaction to make the user experience more interactive.

### 2FA-
To further encrypt and secure a user account, a 2-Factor Authentication system will be applicable, which will retrieve the user’s mobile number and e-mail id (whichever applicable) and push an SMS to it, which will be required to authenticate the registration process.

This number will be pulled from Anon Aadhar itself, by writing and deploying and entirely new circom  circuit.

### Profile Photo-
The users will be able to customize their profile photo by uploading a new photo………….but this photo will be matched with their aadhar photo, through a thoroughly trained AI, which will identify if the person is the same.

### Aadhar Scanning-
To further improve ease-of-access, users will only need to upload an image or pdf of their aadhar and an AI will pull all required details; Aadhar Number, QR from it on the chain itself.

### Tagging-
Message tagging, with color sorting. Will be expanded to marketplace posts as well.

### Rewards programme-
A reward system based on Aptos which grants users rewards based on the amount of tokens hold. This will be implemented in the form of a pre-booking service on the marketplace wherein users will be gaining some rewards if they hold a certain amount for pre-booking a product or even when supporting a local product.

### Transactional Holds-
As a failsafe, we plan to create an uphold between transactions; the buyer can pay an amount for the product which will be withheld by our platform till they receive their desired services/ product. This will also be useful in situations wherein the seller sends a faulty product, then the amount will be reverted back to the user. Or if the user, doesn’t comply to a certain regulation, the money will be safe for the seller.

### Data Indexing-
We also plan to integrate an indexing programme to secure and encrypt data using ‘The Graph’ blockchain system to ensure that the user’s data is secured and available at all times.

# Tech Stack-

### Anon Aadhar-
An incredible EVM based system to fetch aadhar details using zk Proofs. Using this as of now due to stability. Planned to shift to Aptos by emulating a similar version favoring better reliability and speed.

### Aptos-
Used to interact with majority of components in the project. Aptos is very fast, with dynamic allocations and can support functions of a speed-requiring software such as a marketplace with ease.

### Vite+React-
Components used to build the front-end.  

### Petra Wallet
A fast and easy to use wallet supporting Aptos chain.

# Additions-

## BlockEstate RWA-
An RWA fractionalization and marketplace system that was originally deployed on MANTRA L1 with multi-chain support. Planned to create an entirely different pipeline based on Aptos.

## EcoZap-
A carbon-credit marketplace built on Ethereum that promoted the use of carbon credit trading to save up on emissions and promote a greener and safer environment. Planned to shift ecosystem to faster transactional speeds and handle additional traffic.


# Team Members-

## Shresth Shroff
## Aditya Jha
## Aditya Anjana
