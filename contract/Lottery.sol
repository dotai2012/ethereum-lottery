pragma solidity ^0.4.20;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;
    uint[] consolationPrizeIndexes;
    
    function Lottery() public {
        manager = msg.sender;
    }
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    function compareByte(string _a, string _b) returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string _a, string _b) returns (bool) {
        return compareByte(_a, _b) == 0;
    }
    function enter(string message) public payable {
        require(msg.value == .05 ether && equal(message, "lotto") == true);
        players.push(msg.sender);
    }
    function random() private restricted view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    // Due to cost a lot of gas, Consolation Prize random numbers will be done on server side
    function setConsolationPrizePlayerIndexes(uint[] value) public restricted {
        consolationPrizeIndexes = value;
    }
    function pickWinner() public restricted {
        uint consolationLength = consolationPrizeIndexes.length;
        require(consolationLength != 0);
        uint indexWinner = random() % players.length;
        uint authorPrize = this.balance / 100 * 10;
        uint winnerPrize = this.balance / 100 * 70;
        uint consolationPrize = this.balance - authorPrize - winnerPrize;
        uint eachConsolationPrize = consolationPrize / consolationLength;
        uint consolationPrizeIndex;

        winner = players[indexWinner];

        manager.transfer(authorPrize);
        players[indexWinner].transfer(winnerPrize);
        for (uint index = 0; index < consolationLength; index++) {
            consolationPrizeIndex = consolationPrizeIndexes[index];
            players[consolationPrizeIndex].transfer(eachConsolationPrize);
        }
        players = new address[](0);
        consolationPrizeIndexes = new uint[](0);
    }
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
}