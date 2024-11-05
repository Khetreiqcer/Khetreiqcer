// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;

import {Test} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Mock Aggregator for testing
contract MockV3Aggregator is AggregatorV3Interface {
    function version() external pure override returns (uint256) {
        return 1;
    }

    function getRoundData(
        uint80
    )
        external
        pure
        override
        returns (uint80, int256, uint256, uint256, uint80)
    {
        return (0, 2000 * 10 ** 8, 0, 0, 0); // Mock price of $2000 (with 8 decimals)
    }

    function latestRoundData()
        external
        pure
        override
        returns (uint80, int256, uint256, uint256, uint80)
    {
        return (0, 2000 * 10 ** 8, 0, 0, 0); // Mock price of $2000 (with 8 decimals)
    }

    // Implementação das funções necessárias
    function decimals() external pure override returns (uint8) {
        return 8; // Normalmente, o feed da Chainlink usa 8 decimais
    }

    function description() external pure override returns (string memory) {
        return "Mock V3 Aggregator";
    }
}

contract FundMeTest is Test {
    FundMe fundMe;
    MockV3Aggregator mockV3Aggregator;

    function setUp() external {
        // Deploy mock price feed
        mockV3Aggregator = new MockV3Aggregator();

        // Pass the mock price feed address to the FundMe constructor
        fundMe = new FundMe(address(mockV3Aggregator));
    }

    function testMinimumDollarIsFive() public {
        assertEq(fundMe.MINIMUM_USD(), 5e18);
    }

    function testOwnerIsMsgSender() public {
        assertEq(fundMe.i_owner(), address(this));
    }
}
