const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        const BASE_FEE = ethers.utils.parseEther("0.25")
        const GAS_PRICE_LINK = 1e9 //calculated value based on the gas price of the chain
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: [BASE_FEE, GAS_PRICE_LINK],
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        log("Mocks deployed!")
        log("----------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
