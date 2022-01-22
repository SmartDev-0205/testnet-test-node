const ethers = require('ethers');
const ERC20ABI =
    require("./JSON/ERC20.json").abi;
const PresaleABI =
    require("./JSON/Presale.json").abi;
const ownerAddress = "0x9b35FBDad2559aeD3D2180f37911fbbecd4dF2E8";
const randomAddress = "0xb50953CF447e1639c029868A43a85266aD5ef2f6";
var url = 'https://speedy-nodes-nyc.moralis.io/e7993bf596807059c3a1319a/bsc/testnet';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
async function main() {
    let result = await customHttpProvider.getBlockNumber();
    console.log(result);

    let ownerPrivateKey = '0cba3c125bf0a07264f510f6d6df6eda7fe3c4edae347b8cffb0a1851d8caa6c';
    let randomPrivateKey = 'eb949573bceca6ba8396adc9932773353d289c9c8600ffefa4c9057f59998ec2';
    let wallet = new ethers.Wallet(randomPrivateKey, customHttpProvider);
    const PresaleAddress = "0xc265F862818B4Ff83A4b23f61f7972B008348A06";
    const TokenAddress = "0xcb7CB8f019b108D9E3d926b86A4d389230FA4957";
    let presaleContract = new ethers.Contract(PresaleAddress, PresaleABI, customHttpProvider);
    let signedPresaleContract = presaleContract.connect(wallet);

    let tokenContract = new ethers.Contract(TokenAddress, ERC20ABI, customHttpProvider);
    let signedTokenContract = tokenContract.connect(wallet);

    let value = { value: ethers.utils.parseEther("0.5"), gasLimit: 50000, gasPrice: 10000000000 };
    // await signedPresaleContract.buy(value);

    let ownerTokenBalace = await tokenContract.balanceOf(ownerAddress);
    let randomTokenBalace = await tokenContract.balanceOf(randomAddress);
    console.log("owner Balance", ownerTokenBalace);
    console.log("random Balance", randomTokenBalace);

}
const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();