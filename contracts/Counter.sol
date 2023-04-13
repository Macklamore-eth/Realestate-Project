//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Counter {
    // Store a numerical value
    //increase the count
    //decrease the count
    //store a name/ set name

    //crud

    uint public count;
    string public name;

    constructor(string memory _name, uint _initialCount) {
        count = _initialCount;
        name = _name;
    }

    function increment() public returns (uint newCount) {
        return count++;
    }

    function decrement() public returns (uint newCount) {
        return count--;
    }

    function getCount() public view returns (uint) {
        return count;
    }

    function getName() public view returns (string memory currentName) {
        return name;
    }

    function setName(string memory _newName) public returns (string memory) {
        name = _newName;
        return name;
    }
}
