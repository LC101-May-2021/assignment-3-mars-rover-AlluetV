const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //test 7
  it("constructor sets position and default values for mode and generatorWatts",function(){
    let position = 98382;
    let expectedMode = "NORMAL";
    let expectedGeneratorWatts = 110;
    let rover = new Rover(position);
    expect(rover.position).toEqual(position);
    expect(rover.mode).toEqual(expectedMode);
    expect(rover.generatorWatts).toEqual(expectedGeneratorWatts);
  })

//test 8
  it("response returned by receiveMessage contains name of message", function(){
    let position = 98382;
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(position);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  })

//test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let position = 98382;
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(position);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  })

//test 10
  it("responds correctly to status check command", function(){
    let position = 98382;
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(position);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(position);
  })

//test 11
  it("responds correctly to mode change command", function(){
    let position = 98382;
    let expectedMode = 'LOW_POWER';
    let commands = [new Command('MODE_CHANGE', expectedMode)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(position);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.mode).toEqual(expectedMode);
  })

//test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let position = 98382;
    let expectedMode = 'LOW_POWER';
    let move = 87382098;
    let commands = [new Command('MODE_CHANGE', expectedMode) , new Command('MOVE', move)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(position);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[1].completed).toEqual(false);
  })

  //test 13
  it("responds with position for move command",  function(){
    let position = 98382;
    let expectedMode = 'NORMAL';
    let move = 87382098;
    let commands = [new Command('MOVE', move)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(position);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.position).toEqual(move);
  })
});
