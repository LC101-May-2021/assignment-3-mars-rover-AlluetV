class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
    }
    receiveMessage(message){
      let response = {
        message: message.name,
        results:[]
      }
      for(let command of message.commands){
        if(command.commandType === "STATUS_CHECK" ){
          let result = {
           completed: true,
           roverStatus: {
             mode: this.mode, 
             generatorWatts:this.generatorWatts, 
             position: this.position
             }
           }
          response.results.push(result);
        }else if(command.commandType === "MODE_CHANGE"){
          this.mode = command.value;
          let result = {
           completed: true
           }
          response.results.push(result);
        }else if (command.commandType === "MOVE"){
          if(this.mode === "LOW_POWER"){
            let result = {
             completed: false
           }
           response.results.push(result);
          }else{
            let result = {
             completed: true
           }
           this.position = command.value;
           response.results.push(result);
          }
        }
      }
      return response;
    }
}

module.exports = Rover;