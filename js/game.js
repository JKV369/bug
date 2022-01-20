    class Game {
      constructor() {
        
      }
    
      getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
      start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        box1 = createSprite(width / 2 - 50, height/2);
        box1.addImage("box1", red);
        
      box1.scale = 1;
  
      box2 = createSprite(width / 2 + 100, height/2);
      box2.addImage("box2", blue);
      box2.scale = 1;
  
      boxes = [box1, box2];
      
      platformGroup = new Group();
      spikeGroup = new Group();

    var platformGroupPositions = [
      { x: width / 2 + 250, y: height - 800, image: platformimg },
      { x: width / 2 - 180, y: height - 2300, image: platformimg },
      { x: width / 2, y: height - 2800, image: platformimg },
     
      { x: width / 2 + 180, y: height - 3300, image: platformimg },
      { x: width / 2 + 250, y: height - 3800, image: platformimg },
      { x: width / 2 + 250, y: height - 4800, image: platformimg },
      { x: width / 2 - 180, y: height - 5500, image: platformimg }
    ];
    

    var spikePositions = [
      { x: width / 2 + 250, y: height - 880, image: spikeimg },
      { x: width / 2, y: height - 2880, image: spikeimg },
     
      { x: width / 2 + 180, y: height - 3380, image: spikeimg },
      { x: width / 2 + 250, y: height - 4880, image: spikeimg }
    ];
    

    this.addSprites(
      platformGroup,
      platformGroupPositions.length,
      platformimg,
      1.00,
      platformGroupPositions
    );

    this.addSprites(
      spikeGroup,
      spikePositions.length,
      spikeimg,
      1.5,
      spikePositions
    );
    
  }

  // C38 TA
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  
      }
    
 
    
      handleElements() {
        form.hide();
      }
    
      play() {
        this.handleElements();
    
        Player.getPlayersInfo();
    
        if (allPlayers !== undefined) {
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
            var v = allPlayers[plr].velocityY;

            boxes[index - 1].position.x = x;
            boxes[index - 1].position.y = y;
            boxes[index - 1].velocity.y = v;
            
        
    
            // C38  SA
            if (index === player.index) {
              stroke(10);
              fill("green");
              ellipse(x, y, 60, 60);
    
              this.addSprites();
    
              camera.position.x = width/2;
              camera.position.y = boxes[index - 1].position.y;
            }
          }
          
      
    
          drawSprites();
        }


        this.handlePlayerControls();
      }
    
      handlePlayerControls() {
        if (keyIsDown(UP_ARROW)) {
         // this.playerMoving = true; //C40 //SA
      
          player.velocityY = -10;
          player.update();
        }
      
        if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          player.positionX -= 5;
        //  this.leftKey = true;
          player.update();
        }
      
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
          player.positionX += 5;
       //   this.leftKey = false;
          player.update();
        }
      }


     
    }
    
     