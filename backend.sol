// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract assignment2 {
    struct Character {
        uint id;
        string name;
        string image;
        uint256 price;
        address currentOwner;
    }

    struct Purchase {
        uint256 timestamp;
        string characterName;
        address buyer;
    }

    Character[] public characters;
    Purchase[] public purchaseHistory;

    constructor() {
        // สร้างตัวละครเริ่มต้น 6 ตัว
        characters.push(Character(0, "Eleven", "https://i.pinimg.com/originals/db/f3/0d/dbf30d8a094d6e5ad9b7e435c8f5d0e6.jpg", 0.01 ether, address(0)));
        characters.push(Character(1, "Mike", "https://pbs.twimg.com/media/Ep7q74yVEAEDDel.jpg:large", 0.03 ether, address(0)));
        characters.push(Character(2, "Dustin", "https://i.pinimg.com/736x/25/28/00/252800cf03de2e91fc5ce01257a124d8.jpg", 0.05 ether, address(0)));
        characters.push(Character(3, "Steve", "https://i.pinimg.com/originals/7a/77/cc/7a77cc5f6c22aa2809ed9ea260d4aadc.jpg", 0.02 ether, address(0)));
        characters.push(Character(4, "Nancy", "https://media.karousell.com/media/photos/products/2023/2/11/stranger_things_nancy_wheeler__1676122824_9444a52a_progressive.jpg", 0.01 ether, address(0)));
        characters.push(Character(5, "Will", "https://tse1.mm.bing.net/th/id/OIP.vq38c6S08BDdaKZeUYbyIQHaG6?w=792&h=740&rs=1&pid=ImgDetMain&o=7&rm=3", 0.04 ether, address(0)));
        characters.push(Character(6, "lucas", "https://cdn.costumewall.com/wp-content/uploads/2017/01/lucas-sinclair.jpg", 0.02 ether, address(0)));
        characters.push(Character(7, "Max", "https://i.pinimg.com/originals/25/c9/ee/25c9ee5358c8932dfc618fa01dabc4f7.jpg", 0.02 ether, address(0)));
        characters.push(Character(8, "Jonathan", "https://i.pinimg.com/736x/f9/96/1d/f9961df5b70ada3faad6fd1241990006.jpg", 0.02 ether, address(0)));
    }

    // ฟังก์ชันสั่งซื้อตัวละคร
    function buyCharacter(uint _id) public payable {
        require(_id < characters.length, "Invalid ID");
        require(characters[_id].currentOwner == address(0), "Already sold");

        characters[_id].currentOwner = msg.sender;

        // บันทึกประวัติการซื้อ
        purchaseHistory.push(
            Purchase(block.timestamp, characters[_id].name, msg.sender)
        );
    }

    function getAllCharacters() public view returns (Character[] memory) {
        return characters;
    }

    function getHistory() public view returns (Purchase[] memory) {
        return purchaseHistory;
    }
}
