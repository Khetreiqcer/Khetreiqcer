// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import {Test} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Mock Aggregator for testing
contract MockV3Aggregator is AggregatorV3Interface {
    // Mock functions and state variables
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
}
