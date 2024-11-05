//SPDX-License-Identifier: MIT

// 1. Deploy mocks when we are on local anvil chain
// 2. Keep track of contract address across dfifferent chains

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";


contract HelperConfig {
    // If we are on local anvil chain, deploy mocks
    // Otherwise, grab the existing address from the live network

    struct NetworkConfig {
        address priceFeed; // ETH/USD price feed address
    }

    function getSepoliaEthConfig() public pure{
        // price feed address
    }

    function getAnvilEthConfig() public pure{
        // price feed address
    }
}

