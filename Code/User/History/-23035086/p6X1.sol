//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MockV3Aggregator {
    function latestRoundData() public view virtual override returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        roundId = 1;
        answer = 1;
        startedAt = 1;
        updatedAt = 1;
        answeredInRound = 1;
    }
}