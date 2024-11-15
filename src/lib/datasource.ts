import { DataSource } from "typeorm";

export default  new DataSource({
    type: "sqlite",
    database: "the-good-corner-orm.sqlite",
    entities: [],
    synchronize: true, // pas à utiliser en prod (faire des migrations pour la prod);
    logging: ["error", "query"] // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal

})