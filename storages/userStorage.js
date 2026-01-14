class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }
  getByNameOREmail(name, email){
    const users = Object.values(this.storage)
    let userFound = null

    users.forEach(user => {
      
      if(name){
        if(user.firstName.toLowerCase() === name.toLowerCase()){
          
        userFound = user;
        };
      };
      if(email){
        if(user.email.toLowerCase() === email.toLowerCase()){
          userFound =user;
        };
      };

    });
    return userFound;
  }
  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

module.exports = new UsersStorage();