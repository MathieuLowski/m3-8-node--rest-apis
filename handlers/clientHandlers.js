const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...
const handleClientList = (req, res) => {
  res.status(200).json(clients);
};

const handleClientId = (req, res) => {
  console.log(req.params);
  console.log("hello");
  console.log(clients);
  const clientId = req.params.id;
  console.log(clientId);
  const client = clients.find((client) => {
    if (client.id === clientId) {
      return res.status(200).json(client);
    } else return res.status(404).json("There is no such client in our list");
  });
};

const handleAddClient = (req, res) => {
  //let data = req.body;
  //console.log(data);
  const checkExisting = (newClient) => {
    let clientExists = false;
    clients.forEach((client) => {
      if (client.email === newClient.email) clientExists = true;
    });
    return clientExists;
  };
  const newClient = req.body;
  if (checkExisting(newClient)) {
    res.status(400).json("Client is already in database");
  } else {
    newClient.id = uuidv4();
    clients.push(newClient);
    res.status(201).json(newClient);
  }
};

const hadleDeleteClient = (req, res) => {
  const clientId = req.params.id;
  const clientInfo = clients.find((client) => client.id === clientId);
  const clientIndex = clients.indexOf(clientInfo);
  clients.splice(clientIndex, 1);
  res.status(200);
  res.send(clients);
};

module.exports = {
  handleClientList,
  handleClientId,
  handleAddClient,
  hadleDeleteClient,
};
