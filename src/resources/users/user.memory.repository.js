export class UserMemoryRepository {
  getAll = async () => {
    const users = [
      {
        id: "1234",
        name: "gollum",
        login: "abyrwalg",
        password: 'passw0rd',
      }
    ];
    // TODO: mock implementation. should be replaced during task development
    return users;
  };
}
