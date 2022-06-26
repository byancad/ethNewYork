type Mappings = { [key: number]: string };
export const Providers: Mappings = {
  4: "https://eth-rinkeby.alchemyapi.io/v2/eEIXghDPGnkdu47qmRRLP4eZzCkic57r",
  80001:
    "https://polygon-mumbai.g.alchemy.com/v2/rgHYYn5mu6VczK5MnJs1KlDsBBdvfXxH",
  69: "https://opt-kovan.g.alchemy.com/v2/vdehzc2xCgs4Nb3OU0Xmyk5-cN0HArJO",
  5: "https://eth-goerli.alchemyapi.io/v2/vquOZIRyqOKfUpCpVFwPbp4KTgU0jYJR",
  100: "https://gno.getblock.io/mainnet/?api_key=dde440b6-d9af-4de8-a5bc-6381a9bc65dc",
};

export const Subgraphs: Mappings = {
  4: "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-rinkeby",
  80001:
    "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-mumbai",
  69: "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-kovan",
  5: "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-goerli",
  100: "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-xdai",
};

export const Resolvers: Mappings = {
  4: "0x659635Fab0A0cef1293f7eb3c7934542B6A6B31A",
  80001: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3",
  69: "0x851d3dd9dc97c1df1DA73467449B3893fc76D85B",
  5: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
  100: "0xD2009765189164b495c110D61e4D301729079911",
};

export const Tokens: Mappings = {
  4: "ETHx", //0xa623b2DD931C5162b7a0B25852f4024Db48bb1A0
  80001: "MATICx", //0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3
  69: "ETHx", //0xdd5462a7db7856c9128bc77bd65c2919ee23c6e1
  5: "ETHx", //0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947
  100: "xDAIx", //0x59988e47A3503AaFaA0368b9deF095c818Fdca01
};

export const Networks: Mappings = {
  4: "Rinkeby",
  80001: "Polygon Mumbai",
  69: "Optimism Kovan",
  5: "Goerli",
  100: "Gnosis Chain",
};

export const SuggestedRate: Mappings = {
  4: "385802",
  80001: "Polygon Mumbai",
  69: "385802",
  5: "385802",
  100: "192901234567890",
};
