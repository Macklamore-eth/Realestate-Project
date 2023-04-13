//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    //Transfer ownership of property

    address public nftAddress;
    uint public nftID;
    address payable public seller;
    address payable public buyer;

    constructor(
        address _nftAddress,
        uint256 _nftID,
        address payable _seller,
        address payable _buyer
    ) {
        nftAddress = _nftAddress;
        nftID = _nftID;
        seller = _seller;
        buyer = _buyer;
    }

    function finaliseSale() public {
        IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }
}
