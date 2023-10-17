window.onload = function() {
    var selectedElement = "";
    var playerList = [];

    $("#player-input").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            addPlayer();
        }
    });
    $("#add-player-button").on("click", addPlayer);

    function addPlayer() {
        if ($("#player-input").text != null && $("#player-input").text != "" && $("#player-input").val() != "") {
            addPlayerListItem($("#player-input").val());
            
            if (playerList.length < 6) {
                playerList.unshift($("#player-input").val());
            } else if (playerList.length < 12) {
                playerList.push($("#player-input").val());
                addPlayerBenchItem($("#player-input").val());
            } else { 
                alert("Team is full! Cannot add any more players.");
                return;
            }

            $("#player-input").val("");

            updatePlayers();
        }
    }
    function removePlayer(playerName) {
        if (playerName == null || playerName == "")
            return;

        document.getElementById(("playerList-item-" + playerName)).remove();
        if (playerList.length > 6) {
            let array = document.getElementsByClassName("player");
            let maxObject = array[0];
            let maxValue = array[0].id;

            for (let i = 1; i < array.length; i++) {
                if (array[i].id > maxValue) {
                    maxObject = array[i];
                    maxValue = array[i].id;
                }
            }

            maxObject.remove();
        }

        let index = playerList.indexOf(playerName);
        playerList.splice(index, 1);
        updatePlayers();
    }

    $("#rotate-forwards").click(function() {
        let last = playerList.pop();
        playerList.unshift(last);
        updatePlayers();
    });
    $("#rotate-backwards").click(function() {
        let first = playerList.shift();
        playerList.push(first);
        updatePlayers();
    });

    document.addEventListener("mousedown", function(e) {
        if (e.target.className == "player" || e.target.className == "player-list-item") {
            selectedElement = e.target;
            e.target.classList.add("selected");
        }
    });
    document.addEventListener("mouseup", function(e) {
        let selected = document.getElementsByClassName("selected");
        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove("selected");
            e.target.style.border = "";
        };

        if (e.target.className == "player") {
            if (selectedElement.className == "player-list-item") {
                let i = playerList.indexOf(e.target.innerText);
                playerList[i] = selectedElement.innerText;
            }
            if (e.target.innerText != selectedElement.innerText) {
                swapPlayers(selectedElement.innerText, e.target.innerText);
            }

            updatePlayers();
        }
        
        selectedElement = "";
    });
    document.addEventListener("mouseover", function(e) {
        if (selectedElement == "")
            return;

        if (e.target.className == "player") {
            e.target.style.border = "5px solid yellow";
        }
    });
    document.addEventListener("mouseout", function(e) {
        if (selectedElement == "")
            return;

        if (e.target.className == "player") {
            e.target.style.border = "";
        }
    });

    function updatePlayers() {
        for (let i = 0; i < playerList.length; i++) {
            let s = "player-" + (i+1);
            document.getElementById(s).innerText = playerList[i];
        }

        if (playerList.length < 6) {
            for (let i = playerList.length; i < 6; i++) {
                let s = "player-" + (i+1);
                document.getElementById(s).innerText = "";
            }
        }
    }

    function swapPlayers(player1, player2) {
        if (player1 === player2) {
          return;
        }

        let index1 = -1, index2 = -1;
        for (let i = 0; i < playerList.length; i++) {
            if (playerList[i] === player1) {
                index1 = i;
            }

            if (playerList[i] === player2) {
                index2 = i;
            }

            if (index1 !== -1 && index2 !== -1) {
                break;
            }
        }

        if (index1 !== -1 && index2 !== -1) {
            let temp = playerList[index1];
            playerList[index1] = playerList[index2];
            playerList[index2] = temp;
        }
    }

    function addPlayerBenchItem(playerName) {
        let benchItem = document.createElement("div");
        benchItem.classList.add("player");
        benchItem.id = "player-" + playerList.length;
        benchItem.innerText = playerName;

        document.getElementById("bench").appendChild(benchItem);
    }
    function addPlayerListItem(playerName) {
        let listItem = document.createElement("div");
        listItem.classList.add("player-list-item");
        listItem.id = "playerList-item-" + playerName;
        
        let nameElement = document.createElement("div");
        nameElement.innerText = playerName;
        listItem.appendChild(nameElement);

        let icon = document.createElement("span");
        icon.classList.add("glyphicon");
        icon.classList.add("glyphicon-trash");
        let removeButton = document.createElement("button");
        removeButton.addEventListener("click", function() {
            removePlayer(playerName);
        });
        removeButton.classList.add("btn");
        removeButton.classList.add("btn-sm");
        removeButton.classList.add("btn-danger");
        removeButton.classList.add("remove-button");
        removeButton.appendChild(icon);

        listItem.appendChild(removeButton);

        document.getElementById("player-list").appendChild(listItem); 
    }
}

