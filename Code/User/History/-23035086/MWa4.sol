//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MockV3Aggregator {
    uint256 public constant version = 0;

    uint8 public decimals;
    int256 public latestAnswer;
    uint256 public latestTimestamp;
    uint256 public latestRound;

    mapping (uint256 => int256) public getAnswer;
    mapping (uint256 => uint256) public getTimestamp;
    mapping(uint256 => uint256) private getStartedAt;

    constructor(uint8 _decimals, int256 _initalAnswer) {
        decimals = _decimals;
        updateAnswer(_initalAnswer);
    }
}